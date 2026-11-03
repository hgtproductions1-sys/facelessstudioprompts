import {RESOURCE_NOTES} from '@/data/creatorResources';
export default function ResourceNotes({path}:{path:string}){
 return <section className="section prose resource-notes" aria-label="Practical guidance">{RESOURCE_NOTES[path]?.map(section=><section key={section.title}><h2>{section.title}</h2>{section.body.map(p=><p key={p}>{p}</p>)}{section.links&&<ul>{section.links.map(link=><li key={link.href}><a href={link.href}>{link.label} ↗</a></li>)}</ul>}</section>)}</section>;
}
