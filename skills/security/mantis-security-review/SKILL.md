---
name: mantis-security-review
description: "Automated end-to-end security review toolkit based on Google's Mantis framework. Performs threat modeling, vulnerability discovery (OWASP Top 10, auth bypass, data leaks, logic flaws), false-positive filtering against real code, and safe patch generation. Triggers: 'mantis review', 'security review', 'vulnerability audit', 'pentest review', 'threat model'."
---

# Mantis Security Review (/mantis-security-review)

Based on Google Mantis (Modular Toolkit for Building Security Review Harnesses for AI Coding Agents).

## Core Review Pipeline

When conducting a Mantis security review on a codebase or feature, execute the following four stages:

### Stage 1: Threat Modeling & Attack Surface (`/mantis-threat-model`)
1. **Identify Entry Points:**
   - Public HTTP endpoints, webhooks, edge functions, server actions, and URL parameters.
   - Client-side inputs, file uploads, WebSocket messages, and third-party callback URLs.
2. **Data Flow & Trust Boundaries:**
   - Trace sensitive data (auth tokens, PII, API secrets, payment tokens) across client, backend, and external APIs.
   - Verify where authentication and authorization checks take place.

### Stage 2: Deep Vulnerability Discovery (`/mantis-scan`)
Examine the code systematically against key vulnerability classes:
- **Broken Access Control & IDOR:** Can User A access or mutate User B's resources by guessing IDs? Are tenant boundaries enforced?
- **Row Level Security (RLS) & Query Authorization:** Are database tables protected by RLS? Are server functions bypassing RLS without explicit permission checks?
- **Injection & Deserialization:** SQL injection, command execution, SSRF (Server-Side Request Forgery) in webhooks or image proxies.
- **Secret Sprawl:** Hardcoded tokens, service role keys in client builds, exposed `.env` variables (`VITE_`, `NEXT_PUBLIC_`).
- **Cryptographic & Auth Flaws:** Weak session handling, missing CSRF tokens, missing rate limiting on auth endpoints.

### Stage 3: False-Positive Validation (`/mantis-review`)
Before reporting any finding:
1. **Inspect Active Code:** Verify that the vulnerable code path is actually reachable from an attacker-controlled entry point.
2. **Verify Mitigations:** Check if upstream middleware, framework sanitization, or database constraints already neutralize the threat.
3. **Classify Severity:** Assign CVSS-based severity:
   - **CRITICAL:** Remote code execution, unauthenticated database takeover, exposed service keys.
   - **HIGH:** Tenant isolation bypass, unauthorized privilege escalation, sensitive data leak.
   - **MEDIUM:** Rate-limiting omissions, CSRF, overly permissive RLS policies.
   - **LOW / INFORMATIONAL:** Missing defense-in-depth headers, verbose error messages.

### Stage 4: Patching & Remediation (`/mantis-patch`)
For every confirmed vulnerability:
1. Propose minimal, non-breaking remediation code.
2. Write a regression test or reproduction curl/script demonstrating the fix.
3. Verify that the fix does not introduce secondary vulnerabilities or break existing contracts.
