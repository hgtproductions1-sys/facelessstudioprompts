import { NICHES, getNicheProfile, generatePackage, packageToText } from "../src/lib/generator";
const topics: Record<string,string> = { "Poor vs Rich Animals": "whale vs rat" };
let bad = 0;
for (const n of NICHES) {
  const p = getNicheProfile(n);
  for (const seed of [1, 42, 777]) {
    const topic = topics[n] ?? "the hidden cost of speed";
    const pkg = generatePackage({ niche: n, topic, seed });
    const text = packageToText(pkg).toLowerCase();
    const hits = p.forbiddenVocabulary.filter((w) => new RegExp(`\\b${w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`).test(text));
    const moves = pkg.camera.shots.map((s) => (s.prompt.split(":")[0] ?? "").trim());
    const rep = moves.filter((m,i)=> i>0 && m===moves[i-1]);
    const tone = (pkg.variation.emotionalTone ?? "").toLowerCase();
    const want = p.variationTone.toLowerCase();
    const toneOk = want.split(/[,/]| and /).some((t)=> t.trim() && tone.includes(t.trim().split(" ")[0]));
    if (hits.length || rep.length || !toneOk) {
      bad++;
      console.log(`${n} seed=${seed}`);
      if (hits.length) console.log(`  FORBIDDEN: ${hits.join(", ")}`);
      if (rep.length) console.log(`  REPEAT: ${moves.join(" | ")}`);
      if (!toneOk) console.log(`  TONE: got "${pkg.variation.emotionalTone}" want "${p.variationTone}"`);
    }
  }
}
console.log(bad ? `\n${bad} failing generations` : "\nALL CLEAN");
