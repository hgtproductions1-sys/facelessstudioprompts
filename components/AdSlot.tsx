import type {CSSProperties} from 'react';

type AdSlotProps={
  slot:string;
  format?:'auto'|'fluid'|'rectangle';
  label?:string;
  style?:CSSProperties;
};

// Safe ad placement wrapper. Only renders an AdSense unit inside a dedicated
// container — never fixed/absolute over content, never within 24px of nav or
// buttons. Call this only between content sections or in the footer.
export default function AdSlot({slot,format='auto',label='Advertisement',style}:AdSlotProps){
  return (
    <aside className="ad-slot" style={style} aria-label={label} role="complementary">
      <span className="ad-slot-label" aria-hidden="true">{label}</span>
      <ins className="adsbygoogle"
        style={{display:'block',...style}}
        data-ad-client="ca-pub-3120853344446369"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"/>
    </aside>
  );
}
