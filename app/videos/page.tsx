import {Breadcrumbs,PageIntro} from '@/components/Shared';
import VideoExplorer from '@/components/VideoExplorer';
import {VIDEOS} from '@/data/videos';
import {metadataFor} from '@/lib/site';
export const metadata=metadataFor('/videos','AI Video Tutorials, Voiceovers & YouTube Creator Lessons','Watch curated lessons on image prompts, character references, Google Flow, narration, channel planning, and responsible publishing. Try an original practice exercise.');
export default function Page(){return <div className="container page-content">
  <Breadcrumbs items={[{label:'Watch & learn',href:'/videos'}]}/>
  <PageIntro eyebrow={VIDEOS.length+' lessons · Watch. Try. Create.'} title="AI video tutorials and practice lessons" description="Official tutorials and creator walkthroughs, paired with our own exercises. Find a lesson for your next creative decision, then put it into practice."/>
  <VideoExplorer videos={VIDEOS}/>
  <p className="notice">Videos belong to their original creators. Each lesson links to YouTube and relevant provider guidance. Original publication dates are shown where verified; interfaces and features may have changed.</p>
</div>;}

