import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers(){return [{source:'/preview/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'},{key:'Cache-Control',value:'private, no-store'},{key:'Referrer-Policy',value:'no-referrer'},{key:'Content-Security-Policy',value:"script-src 'self' 'unsafe-inline'; connect-src 'self'"}]},{source:'/admin/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]}];},
};

export default nextConfig;
