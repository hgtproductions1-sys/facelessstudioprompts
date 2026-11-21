# Upgrade operations

## Studio

Instant Blueprint and Master AI Brief are available without service keys. Live AI starts off. To enable it, set NEXT_PUBLIC_STUDIO_AI_ENABLED=true and configure the server-only GLM_API_KEY. AI_MODEL and GLM_API_URL are optional. Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for a shared quota across deployment instances. Without Upstash, the quota is bounded per process. The two local modes remain available if quota lookup or generation fails.

## Media and editorial proof

Use the [sample media checklist](SAMPLE_MEDIA_CHECKLIST.md) and [media limits](MEDIA_SPEC.md) for original outputs. The companion Sanity Studio has an optional Sample Output document type. Deploy that schema when ready to author and set SANITY_SAMPLE_OUTPUTS_ENABLED=true when the published records should be visible. Public pages omit sections with no approved examples.

Record tests as they occur using the [field-test templates](FIELD_TEST_TEMPLATE.md). The founder profile is in lib/authors.ts. Populate the optional headshot and verified social profiles when you have the final URLs. Existing Sanity articles keep their credited authors.

## Email and tracker

Email starts off. Before enabling EMAIL_CAPTURE_ENABLED, set up the weekly workflow sequence, unsubscribe handling, and verified sending identity. The free tracker remains downloadable after signup, including when transactional sending is unavailable.

| EMAIL_PROVIDER | EMAIL_LIST_ID | Confirmation |
| --- | --- | --- |
| resend | Resend segment ID | Signup goes straight to the segment |
| kit | Kit form ID | Enable the form’s incentive email and confirmation in Kit |
| beehiiv | Beehiiv publication ID | The API explicitly enables double opt-in |
| buttondown | Optional Buttondown tag | Buttondown sends its default confirmation |

Set EMAIL_API_KEY for the selected provider. To email Studio summaries and tracker links, configure EMAIL_FROM as a verified Resend sending identity. For a newsletter provider other than Resend, also set STUDIO_EMAIL_RESEND_API_KEY. The Studio's newsletter checkbox is optional. Use Upstash for shared throttling across production instances.

Test signup, delivery, consent, and unsubscribe using your own inbox after setup. The local automated suite uses mocked provider responses.
