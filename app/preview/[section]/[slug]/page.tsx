import {draftMode} from 'next/headers';
import {notFound} from 'next/navigation';
import {defineQuery} from 'next-sanity';
import {editorialClient} from '@/lib/editorial';
import EditorialPost from '@/components/EditorialPost';
import type {PREVIEW_QUERY_RESULT} from '@/sanity.types';

export const dynamic='force-dynamic';
export const metadata={title:'Private article preview',robots:{index:false,follow:false}};
const PREVIEW_QUERY=defineQuery(`*[_type == "editorialPost" && section == $section && slug.current == $slug][0] {
 _id, _updatedAt, title, "slug": slug.current, section, excerpt, publishedAt, authorName, authorType, authorBio, category, takeaways, body, sources, relatedGuideSlugs, seoTitle, seoDescription, youtubeVideo,
 "cover": cover{alt, "url": asset->url, "dimensions": asset->metadata.dimensions}
}`);
export default async function Preview({params}:{params:Promise<{section:string;slug:string}>}){
 if(!(await draftMode()).isEnabled||!process.env.SANITY_API_READ_TOKEN)notFound();
 const {section,slug}=await params;if(!['articles','guides'].includes(section))notFound();
 const post=await editorialClient.fetch<PREVIEW_QUERY_RESULT>(PREVIEW_QUERY,{section,slug},{token:process.env.SANITY_API_READ_TOKEN,perspective:'drafts',cache:'no-store'});
 if(!post)notFound();return <EditorialPost post={post} preview/>;
}
