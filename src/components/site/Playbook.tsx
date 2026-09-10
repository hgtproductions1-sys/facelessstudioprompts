export function Playbook() {
  return (
    <section id="playbook" className="border-line mt-20 border-t">
      <article className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-[11px] tracking-widest text-cyan uppercase">Free guide</p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">
          The <span className="gradient-text">Faceless Creator Playbook</span>
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          How short-form automation actually works, from niche selection to a repeatable daily
          publishing loop.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-dim md:text-base">
          <p>
            A faceless channel is a production line, not a personality. The creators who publish
            every single day are not more talented — they have removed every decision that has to be
            made twice. Their niche is fixed, their character is locked to one description, their
            colour palette never moves, and their shot grammar is a template rather than a choice.
            That is why a blueprint matters more than inspiration: once the archetype, wardrobe,
            palette, and pacing are written down, the only variable left each day is the topic, and
            a topic takes ninety seconds to pick.
          </p>
          <p>
            The workflow itself splits into four stages that map cleanly onto four tools. First,
            script and hook: you need three competing openings for every video, because the first
            two seconds decide whether the algorithm keeps testing your upload. Second, stills: an
            image model such as Midjourney, Leonardo, Flux, or Imagen produces the keyframes, and
            the same seed plus the same character token keeps the face, wardrobe, and lighting from
            drifting between frames. Third, motion: an animator such as Runway, Kling, Luma, or Veo
            turns those keyframes into shots with deliberate camera movement instead of random
            wobble. Fourth, voice: a narration engine such as ElevenLabs reads the script with fixed
            stability and similarity settings so episode twelve sounds exactly like episode one.
          </p>
          <p>
            Consistency is the entire retention strategy. Viewers do not subscribe to a video, they
            subscribe to a pattern they can recognise in a scrolling feed — the same character, the
            same colour grade, the same rhythm of cuts, the same closing line. Practically, that
            means writing your negative prompts once and reusing them forever, keeping a single seed
            value per character, and reusing a shot list of five to seven beats: hook frame, context
            wide, escalation push-in, turn, payoff close-up, and a final hold long enough for a
            comment to form. Retention graphs improve far more from removing dead air at second
            three than from any change in visual quality.
          </p>
          <p>
            Monetisation follows volume, but only if the back end is set up before the traffic
            arrives. Display advertising rewards depth of content, so a channel that also publishes
            written breakdowns and prompt libraries earns from readers who never watch a video.
            Affiliate revenue rewards specificity: recommending the exact image model, animator, and
            voice engine you genuinely used converts far better than a generic tool roundup, because
            the reader is already mid-workflow and needs the next step. Combine the two — ads for
            reach, affiliate links for intent — and a faceless operation can run profitably long
            before it reaches platform payout thresholds.
          </p>
        </div>
      </article>
    </section>
  );
}
