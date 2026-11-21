# Visual proof media specification

Use an actual generated result that can be traced to a prompt, model version, settings and capture date. Review the result for asset rights, disclosures and personal information before publishing. Choose a clear frame that demonstrates the prompt direction at phone size.

| Asset | Format | Dimensions | File budget |
| --- | --- | --- | --- |
| Still | WebP or AVIF | At most 1,200 px wide. Use 16:9, 9:16, 1:1 or 4:5. | Under 120 KB |
| Loop | H.264 MP4 and VP9 or AV1 WebM | Up to 720 × 1,280 portrait or 1,280 × 720 landscape. Square previews can use up to 720 × 720. Match both files. | Under 800 KB each |
| Loop poster | WebP | Same aspect ratio as the loop. | Under 50 KB |

Choose a 3–4 second section with a clear action and remove the audio track. Check both encodings and confirm the poster depicts the same scene. Use the editor’s media inspector or ffprobe to confirm duration, frame size and codecs. Crop before compression to keep the intended subject in view.

Provide alt text describing the visible scene or action. Record the exact generation prompt and the model/version. Use the settings field for relevant controls such as frame ratio, duration, frame rate and camera treatment. Enter the capture date in YYYY-MM-DD format.

## Sanity

In the Studio sidebar, open **Niche and prompt sample outputs** and create one document per asset. Select **Niche playbook** or **Prompt template**, then enter the existing page slug from the checklist. Upload the optimized asset or loop files, complete the provenance fields and publish when ready. Enable SANITY_SAMPLE_OUTPUTS_ENABLED=true in the app environment to read published registrations from the configured Sanity dataset. Allow the five-minute cache to refresh and then check the canonical page.

## Static assets

Place approved files in the repository’s public/samples directory. The public paths start with /samples/. Add the corresponding sampleOutputs entry to the existing niche or prompt record. Include both loop variants, the poster and the measured duration in seconds for a video-loop entry. Check filenames, file budgets, dimensions and playback in the production build before shipping.

The preview reserves frame space during loading. Footage starts when 35% of the frame enters view and pauses outside it. Visitors with reduced motion enabled see the poster and can start playback with the preview button.
