import type {Prompt} from '@/data/promptLibrary';
import {getPromptInfo} from '@/lib/promptFilters';
const outcomes:Record<Prompt['category'],string>={
 'Image Gen':'A still-image brief you can adjust for framing, subject, lighting, and visual consistency.',
 'Video Gen':'A scene direction that describes the action, camera movement, and timing for a generated clip.',
 'Character':'A reusable reference for keeping identity, appearance, or voice consistent between scenes.',
 SEO:'A draft for YouTube planning or packaging. Check it against the actual video before publishing.',
 Niche:'A starting point for a channel concept or repeatable episode format. Choose an original angle before production.'
};
export default function PromptBrief({prompt}:{prompt:Prompt}){
 const info=getPromptInfo(prompt);
 const fields=[...new Set(prompt.prompt.match(/\[[A-Z][A-Z0-9 /_-]{1,70}\]/g)||[])];
 return <section id="brief" className="prompt-brief"><h2>Before using this prompt</h2>
 <p>{outcomes[prompt.category]}</p>
 <dl className="prompt-facts"><div><dt>Planning format</dt><dd>{info.formats.join(' or ')}</dd></div><div><dt>Starting tool</dt><dd>{info.tools[0]}{info.tools.length>1?' or a compatible tool':''}</dd></div><div><dt>Experience</dt><dd>{info.level}</dd></div></dl>
 {fields.length>0&&<><h3>Details to prepare</h3><p>Replace these fields with details from your own project. Keep names and descriptions consistent throughout the prompt.</p><ul className="field-index">{fields.map(field=><li key={field}>{field.slice(1,-1).toLowerCase()}</li>)}</ul></>}
 {prompt.tips&&<p className="notice">{prompt.tips}</p>}
 </section>;
}
