'use client';
import {useEffect,useState} from 'react';
type FundingChoices={callbackQueue:Record<string,()=>void>[];showRevocationMessage?:()=>void};
function fundingChoices(){const w=window as Window&{googlefc?:FundingChoices};w.googlefc=w.googlefc||{callbackQueue:[]};w.googlefc.callbackQueue=w.googlefc.callbackQueue||[];return w.googlefc;}
export default function PrivacyChoices(){
 const [ready,setReady]=useState(false);
 useEffect(()=>{let active=true;fundingChoices().callbackQueue.push({CONSENT_API_READY:()=>{if(active)setReady(typeof fundingChoices().showRevocationMessage==='function');}});return ()=>{active=false;};},[]);
 if(!ready)return <a href="/cookies">Privacy and cookie settings</a>;
 return <button className="footer-privacy-choice" type="button" onClick={()=>fundingChoices().callbackQueue.push({CONSENT_API_READY:()=>fundingChoices().showRevocationMessage?.()})}>Privacy and cookie settings</button>;
}
