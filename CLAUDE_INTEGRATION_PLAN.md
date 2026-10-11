# Proposed Claude-assisted Video Blueprint Generator

11 October 2026. Proposal only: Claude is not enabled, no Anthropic key is added, and no paid request is made as part of this review.

## Existing system to preserve

The Next.js Studio already accepts a topic, niche, duration/format, prompt destination, and visual style. It supports explicit AI and browser-template modes, local creative-brief storage, input import/export, and production-plan downloads. `/api/generate` validates inputs with Zod and calls an existing OpenAI-compatible routing service using a server-only key. The result is a structured blueprint with a hook, continuity description, six to eight shots, thumbnail direction, and editing notes.

The current provider's model is `auto`. Provider routing is not evidence of a direct, tested Claude integration. Do not advertise Claude as connected or imply an Anthropic partnership.

## Proposed boundary

Reuse the existing Studio and route contract. Add an optional server-side provider adapter after approval, rather than rebuild the interface or add accounts and payments. Explicit configuration chooses the adapter; do not silently move users between providers. Keep the existing provider and the browser-template planner available.

The proposed Claude adapter would use the first-party Messages API. Select a supported model from official documentation at implementation time and store the chosen identifier in server configuration. A server-only `ANTHROPIC_API_KEY` would be a Vercel Secret, never a `NEXT_PUBLIC_` value or committed file. The official TypeScript SDK is an optional implementation dependency; direct HTTPS is another supported approach, and neither is installed by this proposal.

## Inputs and outputs

Retain the current validated fields and topic/body limits. Target audience and creative notes are optional future additions and must first be added to the input schema, import validation, and privacy disclosure; they are not current controls.

Map the response to the existing Blueprint type. Require the format's exact shot count, a clear opening hook, stable character identifiers, distinct actions, useful camera directions, narration or explicit no-narration text, sound cues, a thumbnail brief, and editing checks. For factual topics, mark uncertain details for verification rather than invent sources or claim research was conducted.

Claude's structured JSON output can use `output_config.format` with a supported JSON Schema. Confirm model support and schema limitations before coding. Retain application-level Zod validation and semantic checks: structured syntax does not guarantee scene quality, correct narration, or factual accuracy. Handle refusal and output truncation explicitly.

## Spending and abuse controls

- Choose a small evaluation budget and a provider-level spend ceiling before any paid test. Confirm current token prices and credit expiry at activation time.
- Bound output tokens and total request time. Start with one provider request per user action; do not add automatic correction or multi-model fallback loops without an explicit cost decision.
- Limit request concurrency and rate. The current in-memory IP limiter is per instance; it is not a durable global usage quota or spending guarantee.
- Evaluate existing Vercel Firewall controls for the current plan. A persistent quota store is optional and may require a service or recurring cost, so it needs approval before provisioning.
- Record aggregate success, latency, token counts, and cost where the provider supplies them. Exclude creative briefs, credentials, and unnecessary personal information from application logs.
- Provide an owner-controlled disable switch. If spending limits are reached, return a clear unavailable message and let the creator explicitly select template mode.

## Reliability and user experience

Keep AI and template results clearly labeled. Do not switch an AI error into a template result without the user choosing it. Preserve the current topic and draft on errors. Align the browser timeout with the server deadline. The review already fixes the earlier 42-second browser limit and template-selector bug.

Handle 401/403, 429, overload, network failure, schema failure, refusal, and truncation with plain messages. Treat generation as a planning aid and keep copying, downloading, engine reformatting, bookmarks, and creative-brief imports independent of provider availability.

## Privacy and retention

Before enabling Claude, update the public privacy page to describe the first-party Anthropic processing actually chosen and link its relevant terms. Confirm account-specific retention and data-use arrangements before making promises. Keep the existing browser storage keys, do not create a creative-brief database merely for this integration, and do not log full input or output content by default.

## Implementation stages

1. **Design and fixtures:** agree on provider choice, a budget, usage controls, the input/output contract, and privacy wording. Test with deterministic fixtures and no provider calls.
2. **Adapter:** implement a server-only module behind configuration and an explicit enable flag. Preserve current provider behavior and avoid client imports of the server adapter.
3. **Controlled evaluation, only after approval:** test a small set of briefs covering story, factual, and ambient niches. Score topic fidelity, continuity, distinct scenes, audio instructions, exact shot count, completion, latency, and cost. Compare against the current provider without claiming a winner in advance.
4. **Preview review:** test configured and disabled states, authentication errors, quota exhaustion, provider failure, import/export, and local draft persistence.
5. **Production decision:** obtain approval for paid operation and deployment. Add accurate public availability language only after a real end-to-end test succeeds. Keep rollback and disable instructions ready.

## Cost and dependencies

This review introduces no new paid service or recurring subscription. A future Claude integration has usage-based API costs unless covered by valid credits; credits and program benefits are not assumed. Hosting remains on the existing Vercel project. Optional quota storage and additional infrastructure require a separate cost decision. Do not activate them to make the startup application look stronger.

Official implementation references checked for this proposal:

- Messages API: https://platform.claude.com/docs/en/api/messages/create
- Structured outputs: https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- Vercel secrets: https://vercel.com/docs/environment-variables
- Startup program: https://claude.com/programs/startups
