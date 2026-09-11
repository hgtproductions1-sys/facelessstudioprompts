import { NICHES, getNicheProfile, generatePackage } from "../src/lib/generator";
const topics: Record<string,string> = { "Poor vs Rich Animals": "whale vs rat" };
let bad = 0;
for (const n of NICHES) {
  const p = getNicheProfile(n);
  for (const seed of [1, 42, 777, 12345]) {
    const pkg: any = generatePackage({ niche: n, topic: topics[n] ?? "the hidden cost of speed", seed });
    const hits: string[] = [];
    const walk = (o:any, path:string) => {
      if (path.includes("negativePrompt") || path.endsWith(".label")) return;
      if (typeof o === "string") {
        for (const w of p.forbiddenVocabulary) {
          const re = new RegExp(`\\b${w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`, "i");
          if (re.test(o) && !/\bno\s+\w*$/i.test(o.slice(0, o.toLowerCase().indexOf(w.toLowerCase())))) hits.push(`${w} @${path}`);
        }
      } else if (o && typeof o === "object") for (const k of Object.keys(o)) walk(o[k], `${path}.${k}`);
    };
    walk(pkg, "");
    const moves = pkg.camera.shots.map((s:any)=> (s.prompt.split(":")[0] ?? "").trim());
    const rep = moves.some((m:string,i:number)=> i>0 && m===moves[i-1]);
    const tone = String(pkg.variation.emotionalTone ?? "").toLowerCase();
    const toneOk = p.variationTone.toLowerCase().split(/[,/]| and /).some((t)=> t.trim() && tone.includes(t.trim().split(" ")[0]));
    if (hits.length || rep || !toneOk) { bad++; console.log(`${n} seed=${seed}`, hits, rep ? moves : "", toneOk ? "" : `TONE ${tone}`); }
  }
}
console.log(bad ? `${bad} failing` : "ALL 24 NICHES CLEAN");
