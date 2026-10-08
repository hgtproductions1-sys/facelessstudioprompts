import {SITE_URL} from '@/lib/site';
import {VIDEOS} from '@/data/videos';
function escape(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
export function GET(){
  const entries=VIDEOS.map(v=>{
    const published=v.uploaded?'<video:publication_date>'+v.uploaded+'</video:publication_date>':'';
    return '<url><loc>'+SITE_URL+'/videos/'+v.slug+'</loc><video:video><video:thumbnail_loc>https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg</video:thumbnail_loc><video:title>'+escape(v.originalTitle)+'</video:title><video:description>'+escape(v.description)+'</video:description><video:player_loc>https://www.youtube-nocookie.com/embed/'+v.id+'</video:player_loc>'+published+'</video:video></url>';
  }).join('');
  const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'+entries+'</urlset>';
  return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}

