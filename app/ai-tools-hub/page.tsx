import Link from 'next/link';
import ResourceNotes from '@/components/ResourceNotes';
import AuthorByline from '@/components/AuthorByline';
import AffiliateLink, {AffiliateDisclosure} from '@/components/AffiliateLink';
import {ArrowUpRight} from 'lucide-react';
import {Breadcrumbs,PageIntro} from '@/components/Shared';
import {resolveAffiliate, type AffiliateToolId} from '@/lib/affiliates';
import {metadataFor} from '@/lib/site';
export const metadata=metadataFor('/ai-tools-hub','AI Tools for Your Faceless Video Workflow','Find official tools for drafting, images, video motion, narration, and editing. Build a workflow around the decisions your project needs.');
const tools: {id: AffiliateToolId; category: string; copy: string; guide: string}[] = [
  {id: 'google-flow', category: 'Scene creation', copy: 'Explore Google’s AI filmmaking environment. Pair a consistent reference with a focused scene description.', guide: '/videos/creating-in-google-flow'},
  {id: 'runway', category: 'Video generation', copy: 'Explore video creation and editing tools. Use its official prompting guides to adapt your scene instructions.', guide: 'https://academy.runwayml.com/guides/prompting-guide'},
  {id: 'kling', category: 'Video generation', copy: 'Explore the provider’s current video and image offerings. Check the controls supported by the model you select.', guide: '/prompts/video-generation'},
  {id: 'midjourney', category: 'Reference images', copy: 'Develop visual references and scene frames. Use a stable character brief and verify current parameter support.', guide: '/guides/consistent-ai-characters'},
  {id: 'leonardo', category: 'Reference images', copy: 'Explore an image creation workflow for storyboards, characters, and visual concepts.', guide: '/prompts/image-generation'},
  {id: 'elevenlabs', category: 'Narration', copy: 'Explore voice and audio tools for narration. Choose a voice and usage rights appropriate to your project.', guide: '/free-tools#read-time'},
  {id: 'capcut', category: 'Editing', copy: 'Assemble your clips, refine timing, and add readable captions. Check the final story on a phone screen.', guide: '/faceless-youtube-automation'},
  {id: 'davinci-resolve', category: 'Editing', copy: 'Explore a full editing workflow for assembling clips, sound, and color into your final video.', guide: '/faceless-youtube-automation'},
];

export default function Page() {
  const listings = tools.map(tool => ({...tool, link: resolveAffiliate(tool.id)}));
  return <div className="container page-content">
    <Breadcrumbs items={[{label: 'AI tools', href: '/ai-tools-hub'}]}/>
    <PageIntro eyebrow="Build your own workflow" title="AI tools for your faceless video workflow."
      description="Browse tools for drafting, images, motion, narration, and editing. Each listing shows where the tool fits and links to the provider and a related lesson or workflow."/>
    <AuthorByline/>
    <AffiliateDisclosure links={listings.map(tool => tool.link)}/>
    <div className="tools-grid">
      {listings.map(tool => <article className="tool-card" key={tool.id}>
        <span className="pill">{tool.category}</span>
        <h2>{tool.link.name}</h2>
        <p>{tool.copy}</p>
        <AffiliateLink className="text-link" link={tool.link}>
          {tool.link.isAffiliateActive ? 'Visit provider (affiliate link)' : 'Visit official site'} <ArrowUpRight size={15}/>
        </AffiliateLink>
        <a className="tool-related" href={tool.guide}
          {...(tool.guide.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
          Explore the workflow ↗
        </a>
      </article>)}
    </div>
    <ResourceNotes path="/ai-tools-hub"/>
    <Link className="text-link" href="/editorial-policy">How we evaluate and update listed tools ↗</Link>
  </div>;
}

