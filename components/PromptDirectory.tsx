import {PROMPTS} from '@/data/promptLibrary';
import {CATEGORY_LABELS} from '@/lib/categories';

// A compact server-rendered path to every template, including cards behind Show more.
export default function PromptDirectory(){return <section className="section prompt-directory" aria-labelledby="prompt-directory-title"><h2 id="prompt-directory-title">Browse templates by name</h2><p className="muted">Jump straight to a template, or use the filters above to compare options.</p><div>{Object.entries(CATEGORY_LABELS).map(([category,label])=><details key={category}><summary>{label} <span>({PROMPTS.filter(p=>p.category===category).length})</span></summary><ul>{PROMPTS.filter(p=>p.category===category).map(p=><li key={p.id}><a href={'/prompts/'+p.id}>{p.title}</a></li>)}</ul></details>)}</div></section>;}
