import {Breadcrumbs,PageIntro} from '@/components/Shared';
import VideoExplorer from '@/components/VideoExplorer';
import {VIDEOS} from '@/data/videos';
import {metadataFor} from '@/lib/site';
export const metadata=metadataFor('/videos','AI Video Tutorials & Faceless Creator Lessons','Watch credited lessons on AI image prompts, Google Flow, character references, narration, and YouTube publishing. Try a practical exercise with each lesson.');
export default function Page(){return <div className="container page-content">
  <Breadcrumbs items={[{label:'Watch & learn',href:'/videos'}]}/>
  <PageIntro eyebrow={VIDEOS.length+' lessons · Watch. Try. Create.'} title="A new skill. A practical next step." description="Official tutorials and creator walkthroughs, paired with our own exercises. Find a lesson for your next creative decision, then put it into practice."/>
  <VideoExplorer videos={VIDEOS}/>
  <p className="notice">Videos belong to their original creators. Each lesson links to YouTube and relevant provider guidance. Original publication dates are shown where verified; interfaces and features may have changed.</p>
</div>;}

