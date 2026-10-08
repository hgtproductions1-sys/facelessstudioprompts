import FreeTools from '@/components/FreeTools';
import {Breadcrumbs,PageIntro} from '@/components/Shared';
import {metadataFor} from '@/lib/site';
export const metadata=metadataFor('/free-tools','Free Video Hook, Narration Time & Shot Prompt Tools','Build hook ideas, estimate voiceover speaking time, and format a single-shot video prompt with free browser-based creator tools.');
export default function Page(){return <div className="container page-content"><Breadcrumbs items={[{label:'Free tools',href:'/free-tools'}]}/><PageIntro eyebrow="Small tools. Useful shortcuts." title="A little help with the everyday work." description="Shape an opening, check your narration, or build a cleaner shot prompt. These tools run in your browser."/><div className="category-links"><a href="#hooks">Hook ideas ↓</a><a href="#read-time">Narration time ↓</a><a href="#formatter">Shot prompts ↓</a></div><FreeTools/></div>;}

