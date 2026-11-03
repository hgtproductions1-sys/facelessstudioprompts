import {notFound} from 'next/navigation';
import EditorialPost,{editorialMetadata} from '@/components/EditorialPost';
import {getEditorialPost} from '@/lib/editorial';

export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=await getEditorialPost('articles',slug);return post?editorialMetadata(post):{robots:{index:false,follow:false}};}
export default async function Article({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=await getEditorialPost('articles',slug);if(!post)notFound();return <EditorialPost post={post}/>;}
