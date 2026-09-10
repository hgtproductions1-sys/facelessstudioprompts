import { Link } from "@tanstack/react-router";
import consistencyImg from "@/assets/playbook-consistency.jpg";
import nichesImg from "@/assets/playbook-niches.jpg";
import workflowImg from "@/assets/playbook-workflow.jpg";

const figure = "mt-8 overflow-hidden rounded-2xl border border-line bg-surface2";
const img = "h-auto w-full";
const caption = "border-line border-t px-4 py-3 text-xs text-ink-muted";
const link = "text-cyan underline underline-offset-2 hover:text-white";

export function Playbook() {
  return (
    <section id="playbook" className="border-line mt-20 border-t">
      <article className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-[11px] tracking-widest text-cyan uppercase">Free guide</p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">
          The <span className="gradient-text">Faceless Creator Playbook</span>
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          How faceless YouTube automation actually works, from niche selection to a repeatable daily
          publishing loop — and how to use a short-form video prompt generator to run it.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-dim md:text-base">
          <h3 className="text-lg font-semibold text-ink">
            Faceless YouTube Automation: Why a Blueprint Beats Inspiration
          </h3>
          <p>
            A faceless channel is a production line, not a personality. The creators who publish
            every single day are not more talented — they have removed every decision that has to be
            made twice. Their niche is fixed, their character is locked to one description, their
            colour palette never moves, and their shot grammar is a template rather than a choice.
            That is why a blueprint matters more than inspiration: once the archetype, wardrobe,
            palette, and pacing are written down, the only variable left each day is the topic, and
            a topic takes ninety seconds to pick. A short-form video prompt generator turns that
            fixed blueprint into a full YouTube Shorts automation kit — script, stills, motion, and
            narration — in a single pass.
          </p>
          <h3 className="text-lg font-semibold text-ink">
            The Four-Stage Short-Form Video Prompt Generator Workflow
          </h3>
          <p>
            The workflow itself splits into four stages that map cleanly onto four tools. First,
            script and hook: you need three competing openings for every video, because the first
            two seconds decide whether the algorithm keeps testing your upload. Second, stills: an
            image model such as Midjourney, Leonardo, Flux, or Imagen produces the keyframes, and
            the same seed plus the same character token keeps the face, wardrobe, and lighting from
            drifting between frames. Third, motion: an animator such as Runway, Kling, Luma, or Veo
            turns those keyframes into shots with deliberate camera movement instead of random
            wobble. Fourth, voice: a narration engine such as ElevenLabs reads the script with fixed
            stability and similarity settings so episode twelve sounds exactly like episode one. See{" "}
            <Link to="/ai-tools-hub" className={link}>
              which AI image, video and voice engines fit each stage
            </Link>{" "}
            before you commit to a toolchain.
          </p>
          <figure className={figure}>
            <img
              src={workflowImg}
              alt="Four-stage faceless video workflow: script page, AI keyframe, camera motion, then voiceover waveform"
              loading="lazy"
              width={1280}
              height={720}
              className={img}
            />
            <figcaption className={caption}>
              The four-stage faceless workflow: script and hook, still keyframes, camera motion, then
              narration.
            </figcaption>
          </figure>
          <h3 className="text-lg font-semibold text-ink">
            Midjourney Character Consistency Prompts and ElevenLabs Viral Voiceover Scripts
          </h3>
          <p>
            Consistency is the entire retention strategy. Midjourney character consistency prompts —
            one locked seed, one character token, one negative prompt list — keep the same face and
            wardrobe across every frame, while ElevenLabs viral voiceover scripts with fixed
            stability and style settings keep the narration identical from episode one to episode
            fifty. Viewers do not subscribe to a video, they
            subscribe to a pattern they can recognise in a scrolling feed — the same character, the
            same colour grade, the same rhythm of cuts, the same closing line. Practically, that
            means writing your negative prompts once and reusing them forever, keeping a single seed
            value per character, and reusing a shot list of five to seven beats: hook frame, context
            wide, escalation push-in, turn, payoff close-up, and a final hold long enough for a
            comment to form. Retention graphs improve far more from removing dead air at second
            three than from any change in visual quality.
          </p>
          <h3 className="text-lg font-semibold text-ink">
            Monetisation: Ads for Reach, Affiliates for Intent
          </h3>
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
          <h3 className="text-lg font-semibold text-ink">
            Faceless TikTok Niche Ideas and YouTube Short Automation
          </h3>
          <p>
            The faceless TikTok niche ideas that travel best in 2026 are the ones with a repeatable
            visual gimmick: AI pet stories, animal cooking, POV immersive vlogs, ASMR restoration,
            miniature builds, analog horror, and ranking countdowns. Each of those runs as YouTube
            Short automation too — the same blueprint exports one vertical master that you publish to
            Shorts, TikTok, and Reels the same morning. Pick one niche, generate thirty blueprints in
            a sitting, batch the stills, batch the voiceovers, and schedule a week at a time; that
            batching loop, not raw creativity, is what separates channels that survive month three
            from the ones that stall at video nine.
          </p>
        </div>
      </article>
    </section>
  );
}
