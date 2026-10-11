#!/usr/bin/env node
// Validates every skill in this repo. No dependencies; run with `node scripts/validate-skills.mjs`.
// Exits with code 1 when any error is found. Warnings do not fail the run.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BUCKETS = ["engineering", "security", "productivity"];
const ALLOWED_SUBDIRS = new Set(["references", "scripts", "assets"]);
const ALLOWED_KEYS = new Set(["name", "description"]);
const NAME_RE = /^[a-z][a-z0-9-]{0,62}[a-z0-9]$/;
const MAX_DESCRIPTION = 1024;
const MAX_SKILL_LINES = 300;

// Leftovers from the terminal-agent original that do not work inside Lovable.
const FORBIDDEN = [
  [/Call the Skill tool/i, "use 'the `name` skill' phrasing instead of the Skill tool"],
  [/setup-matt-pocock-skills|ask-matt/, "reference to a removed skill"],
  [/\$TMPDIR|xdg-open/, "local temp dir or desktop opener"],
  [/disable-model-invocation/, "frontmatter key Lovable does not use"],
  [/\bclaude (plugin|--bg)|CLAUDE\.md/, "Claude Code specific instruction"],
  [/\bmantis-[a-z]/, "reference to a removed Mantis micro-skill"],
  [/\bgit (add|commit|checkout|merge|rebase|reset|stash|push|pull|worktree)\b/, "stateful git command (Lovable manages git)"],
];

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${relative(ROOT, file)}: ${msg}`);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    if (entry === ".git" || entry === "node_modules") return [];
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n")) {
    err(file, "missing frontmatter (file must start with ---)");
    return null;
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    err(file, "frontmatter is not closed with ---");
    return null;
  }
  const data = {};
  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!m) {
      err(file, `frontmatter line is not 'key: value': ${line.slice(0, 60)}`);
      continue;
    }
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else if (/: | #|^[`"'{\[&*!|>%@,?-]/.test(value)) {
      // Unquoted YAML values cannot contain ": " or " #" or start with an indicator character.
      // Installers silently skip skills whose frontmatter is not valid YAML.
      err(file, `'${m[1]}' is not valid unquoted YAML (contains ": ", " #" or starts with a special character); rephrase or quote it`);
    }
    data[m[1]] = value;
  }
  return data;
}

// 1. Discover skills
const skills = new Map(); // name -> { bucket, dir }
const skillsRoot = join(ROOT, "skills");
for (const bucket of readdirSync(skillsRoot)) {
  const bucketDir = join(skillsRoot, bucket);
  if (!statSync(bucketDir).isDirectory()) {
    if (bucket !== "README.md") err(bucketDir, "unexpected file in skills/");
    continue;
  }
  if (!BUCKETS.includes(bucket)) err(bucketDir, `unknown bucket (allowed: ${BUCKETS.join(", ")})`);
  if (!existsSync(join(bucketDir, "README.md"))) err(bucketDir, "bucket is missing README.md");
  for (const name of readdirSync(bucketDir)) {
    const dir = join(bucketDir, name);
    if (!statSync(dir).isDirectory()) {
      if (name !== "README.md") err(dir, "unexpected file in bucket");
      continue;
    }
    if (skills.has(name)) err(dir, `duplicate skill name (also in ${skills.get(name).bucket})`);
    skills.set(name, { bucket, dir });
  }
}

// 2. Validate each skill
for (const [name, { dir }] of skills) {
  const skillFile = join(dir, "SKILL.md");
  if (!existsSync(skillFile)) {
    err(dir, "missing SKILL.md");
    continue;
  }
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!ALLOWED_SUBDIRS.has(entry)) err(full, `unexpected folder (allowed: ${[...ALLOWED_SUBDIRS].join(", ")})`);
      else for (const nested of readdirSync(full)) {
        if (statSync(join(full, nested)).isDirectory()) err(join(full, nested), "nest references one level deep only");
      }
    } else if (entry !== "SKILL.md") {
      err(full, "put extra files in references/, scripts/ or assets/");
    }
  }
  const text = readFileSync(skillFile, "utf8");
  const fm = parseFrontmatter(text, skillFile);
  if (fm) {
    for (const key of Object.keys(fm)) if (!ALLOWED_KEYS.has(key)) err(skillFile, `unsupported frontmatter key '${key}'`);
    if (fm.name !== name) err(skillFile, `name '${fm.name}' must equal folder name '${name}'`);
    if (!NAME_RE.test(name)) err(skillFile, "name must be lowercase letters, digits and hyphens (max 64)");
    if (!fm.description) err(skillFile, "description is required");
    else if (fm.description.length > MAX_DESCRIPTION) err(skillFile, `description is ${fm.description.length} chars (max ${MAX_DESCRIPTION})`);
    else if (!/\buse\b/i.test(fm.description)) warn(skillFile, "description should say when to use the skill");
  }
  const lines = text.split("\n").length;
  if (lines > MAX_SKILL_LINES) warn(skillFile, `${lines} lines; consider moving detail into references/`);
}

// 3. Checks across every markdown file
const mdFiles = walk(ROOT).filter((f) => f.endsWith(".md"));
for (const file of mdFiles) {
  const text = readFileSync(file, "utf8");
  const isChangelog = file.endsWith("CHANGELOG.md");
  // AGENTS.md and CHANGELOG.md describe the forbidden patterns, so they are exempt from that check.
  const describesRules = isChangelog || relative(ROOT, file) === "AGENTS.md";

  // Relative links resolve
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = resolve(dirname(file), target.split("#")[0]);
    if (!existsSync(path)) err(file, `broken link: ${target}`);
  }

  // References to other skills exist
  if (!isChangelog) {
    for (const m of text.matchAll(/`([a-z][a-z0-9-]+)` skill/g)) {
      if (!skills.has(m[1])) err(file, `references unknown skill '${m[1]}'`);
    }
  }

  // Terminal-agent leftovers
  if (!describesRules) {
    for (const [re, why] of FORBIDDEN) {
      if (re.test(text)) err(file, `forbidden pattern ${re}: ${why}`);
    }
  }
}

// 4. Indexes list every skill
const readme = readFileSync(join(ROOT, "README.md"), "utf8");
for (const [name, { bucket }] of skills) {
  const link = `skills/${bucket}/${name}/SKILL.md`;
  if (!readme.includes(link)) err(join(ROOT, "README.md"), `missing link to ${link}`);
  const bucketReadme = readFileSync(join(skillsRoot, bucket, "README.md"), "utf8");
  if (!bucketReadme.includes(`${name}/SKILL.md`)) err(join(skillsRoot, bucket, "README.md"), `missing entry for ${name}`);
}

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);
console.log(`\n${skills.size} skills checked: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
