export function responsiveImage(src:string,sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'){
 if(!src.endsWith('.webp'))return {};
 return {srcSet:[480,800,1280].map(width=>`${width===1280?src:src.replace('.webp',`-${width}.webp`)} ${width}w`).join(', '),sizes};
}
