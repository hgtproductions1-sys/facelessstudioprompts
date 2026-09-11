import { NICHES, getNicheProfile, generatePackage } from "../src/lib/generator";
const targets: Record<string,string[]> = {
 "Stickman Explainer & Skits":["emotional"],
 "AI ASMR (Cooking, Cleaning, Restoration)":["hook"],
 "Lullaby & Sleep Music":["hook"],
 "AI Car Wash & Restoration":["story"],
 "Miniature ASMR Cooking":["story"],
 "AI Music Videos":["narration"],
 "Cartoon Horror Illustration":["cute","wholesome","cheerful"],
 "Pixel Game POV":["photoreal"],
};
for (const [n,words] of Object.entries(targets)) {
  const pkg:any = generatePackage({ niche:n, topic:"the hidden cost of speed", seed:42 });
  const walk = (o:any, path:string) => {
    if (typeof o === "string") { for(const w of words) if (new RegExp(`\\b${w}`,"i").test(o)) console.log(`${n} [${w}] ${path} = ${o.slice(0,140)}`); }
    else if (o && typeof o==="object") for (const k of Object.keys(o)) walk(o[k], `${path}.${k}`);
  };
  walk(pkg,"");
}
