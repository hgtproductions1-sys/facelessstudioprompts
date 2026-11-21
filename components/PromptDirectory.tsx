import {PROMPTS,type Prompt} from '@/data/promptLibrary';
import {CATEGORY_LABELS} from '@/lib/categories';

export default function PromptDirectory({ prompts = PROMPTS }: { prompts?: readonly Prompt[] }) {
  return <section className="section prompt-directory" aria-labelledby="prompt-directory-title">
    <h2 id="prompt-directory-title">Browse templates by name</h2>
    <p className="muted">Jump straight to a template, or use the filters above to compare options.</p>
    <div>{Object.entries(CATEGORY_LABELS).map(([category, label]) => {
      const entries = prompts.filter(prompt => prompt.category === category);
      return entries.length ? <details key={category}>
        <summary>{label} <span>({entries.length})</span></summary>
        <ul>{entries.map(prompt => <li key={prompt.id}><a href={'/prompts/' + prompt.id}>{prompt.title}</a></li>)}</ul>
      </details> : null;
    })}</div>
  </section>;
}
