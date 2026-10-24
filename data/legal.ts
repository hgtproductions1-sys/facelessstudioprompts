import {CONTACT_EMAIL, FOUNDER_NAME, FOUNDING_YEAR} from '@/lib/site';

export type InfoPage = {
  title: string;
  eyebrow: string;
  description: string;
  updated?: string;
  sections: {title: string; body: string[]; links?: {label: string; href: string}[]}[];
};

export const INFO_PAGES: Record<string, InfoPage> = {
  about: {
    title: 'Helping creators turn ideas into videos, one prompt at a time.',
    eyebrow: 'About The Faceless Prompts',
    description: 'An independent, founder-operated project helping faceless creators organize ideas, prompts, and video production plans.',
    updated: '2026-10-11',
    sections: [
      {title: 'The story behind The Faceless Prompts', body: [
        `The Faceless Prompts was founded in ${FOUNDING_YEAR} by ${FOUNDER_NAME}. It is an independently developed, founder-operated project.`,
        'The goal is practical: give independent creators more structure between a first idea and a finished video. A useful plan makes it easier to decide what to show, what to say, and how each scene fits the story.'
      ]},
      {title: 'What you can do today', body: [
        'Browse and customize 67 prompt templates, explore 24 niche playbooks, and learn from 8 creator guides and credited video tutorials.',
        'In the Video Planning Studio, enter a topic, choose a niche and format, and create a blueprint with an opening hook, scene prompts, narration direction, continuity notes, and an editing checklist. Review the draft, switch the prompt destination, then copy or download the plan for your production tools.',
        'AI drafting uses the connected AI service to write scene details. The optional template planner builds editable directions in your browser without an AI request. You can also save prompts locally and import or export your creative brief.'
      ], links: [
        {label: 'Open the Video Planning Studio', href: '/studio'},
        {label: 'Explore the Prompt Library', href: '/prompts'},
        {label: 'Browse niche playbooks', href: '/niches'},
        {label: 'Read creator guides', href: '/guides'}
      ]},
      {title: 'Made for the creative process', body: [
        'Bring your own references, point of view, and editorial decisions. The Studio produces a planning draft; you use your chosen image, video, voice, and editing tools to make the final media.',
        'Review every draft for accuracy, originality, rights, and continuity. A prompt or production plan cannot guarantee views, audience growth, platform approval, or revenue.'
      ]},
      {title: 'Where the project is going', body: [
        'The focus remains clearer scene planning, more useful creator resources, and better control over the drafting workflow. Additional AI-provider choices, including a possible Claude integration, are future proposals rather than current features. No release dates are promised.'
      ], links: [{label: 'Read product updates', href: '/updates'}]},
      {title: 'Independent operation and attribution', body: [
        'The Faceless Prompts is an independent, unincorporated project. It is not presented as a registered company or as an official partner of the AI tools it discusses.',
        'Planning templates and guide text are published under The Faceless Prompts name. Linked YouTube tutorials belong to their credited creators. Illustrations are AI-generated editorial artwork. Fictional premises and templates are planning aids, not claims of first-hand production results.'
      ], links: [{label: 'Read the editorial policy', href: '/editorial-policy'}]},
      {title: 'Talk to the founder', body: [
        `For questions, support, corrections, or collaboration ideas, contact ${CONTACT_EMAIL}. Practical feedback helps identify what needs a closer look.`
      ], links: [{label: 'Contact the project', href: '/contact'}]}
    ]
  },
  contact: {
    title: 'Let’s make the project more useful.',
    eyebrow: 'Contact',
    description: `Contact the founder at ${CONTACT_EMAIL} for product questions, support, feedback, and collaborations.`,
    updated: '2026-10-11',
    sections: [
      {title: 'General inquiries and collaborations', body: [
        'Have a question about the project or an idea for working together? Send a short introduction and explain what you have in mind. The founder handles project inquiries directly.'
      ]},
      {title: 'Product support and bug reports', body: [
        'Include the page URL, what you were trying to do, and what happened. Your browser or device details and a screenshot can help explain an issue. Keep passwords, API keys, and other sensitive information out of your message.'
      ]},
      {title: 'Content corrections and feedback', body: [
        'Share the page URL and the specific sentence, example, or link you want reviewed. If you have a primary source or a reproducible example, include its link.'
      ]},
      {title: 'Privacy and rights inquiries', body: [
        'For a privacy or copyright question, identify the page or material involved and provide enough information to locate it. Describe your concern without sending unnecessary personal information.'
      ], links: [{label: 'Read the privacy policy', href: '/privacy'}]},
      {title: 'External tool accounts', body: [
        'Billing, subscriptions, and refunds for third-party services are handled by those providers. Contact their support team for issues with their products.'
      ]}
    ]
  },
  'editorial-policy': {
    title: 'Useful guidance. Clear attribution.',
    eyebrow: 'Editorial policy',
    description: 'How this project presents prompts, examples, sources, and recommendations.',
    sections: [
      {title: 'Prompts are working drafts', body: ['Prompt templates are starting points. They may need adaptation to the selected tool, source material, and production format. Instructions inside a prompt are creative directions, not evidence that an outcome will happen.']},
      {title: 'Examples and generated material', body: ['Fictional story premises, scene examples, and AI illustrations are presented as examples. AI drafts require review for accuracy, originality, continuity, and suitability before publication. The homepage cat image is an illustrative AI-created story frame.']},
      {title: 'How guidance is prepared', body: ['Guides organize practical production decisions and link primary provider or platform documentation where relevant. AI-assisted drafts and illustrations require editorial review. Provider features and policies should be checked at their original source when they affect your project. The project does not claim that every prompt has been tested with every listed tool.']},
      {title: 'Sources and external videos', body: ['Creator guides link to relevant sources where provided. Videos are attributed to their original creators and embedded from YouTube. Our exercises and prompt examples are separate from the original videos.']},
      {title: 'Tool information', body: ['Provider features, pricing, and policies can change. The tools directory uses direct official links and avoids promising specific prices or performance. Check current primary documentation when a feature matters to your project.']},
      {title: 'Corrections', body: ['Report a factual error or broken example through the Contact page with the page address and the issue. Meaningful content changes should carry an updated date.']}
    ]
  },
  privacy: {
    title: 'Privacy, explained plainly.',
    eyebrow: 'Privacy policy',
    description: 'What The Faceless Prompts stores in your browser and which services process information when you use the site.',
    updated: '2026-10-19',
    sections: [
      {title: 'Who operates the site', body: [
        `The Faceless Prompts is an independent, unincorporated project operated by ${FOUNDER_NAME}. Contact ${CONTACT_EMAIL} with privacy questions.`
      ]},
      {title: 'Browser storage and exports', body: [
        'Saved prompts, the Studio input draft, and beginner-checklist progress are stored in your browser’s local storage. They are specific to that browser and are not synchronized to an account. Clear site data in your browser to remove them. Moving to a different domain does not automatically move this data.',
        'Bookmark and creative-brief exports are files you choose to download. Importing one updates the local browser data. Generated production plans can also be copied or downloaded. Editable prompt fields are held in the current page and reset when it is reloaded.'
      ]},
      {title: 'Template tools', body: [
        'The free helper tools and template planner build output in your browser. The Studio checks AI availability through the site’s server, but using template mode does not send your topic to an AI provider.'
      ]},
      {title: 'AI drafting', body: [
        'When you choose AI drafting, your topic, niche, format, visual style, and prompt destination are sent to the site’s server and then to the AI service at api.hcnsec.cn. That service can route the request to different upstream models, so the selected model may change.',
        'Your creative brief is processed by the routing service and the selected model provider under their own data-handling practices. This project has not independently verified their retention periods. Avoid including sensitive personal information, credentials, or private source material in a brief.',
        'The application does not store your creative brief in a server database. The server holds a short-lived request-count record for rate limiting and logs request status, model identifiers, and timing. Hosting or provider systems may keep their own operational records.'
      ]},
      {title: 'Hosting and access', body: [
        'The public website is hosted on Vercel. The hosting platform may process request metadata such as IP addresses and browser information to serve and protect the site. The application does not create customer accounts or collect payment details.'
      ]},
      {title: 'YouTube and external websites', body: [
        'Embedded videos use YouTube’s privacy-enhanced player. Loading a player can still connect your browser to Google or YouTube, and interacting with it is subject to their privacy practices. Following an external tool link takes you to a service with its own policies.'
      ]},
      {title: 'Advertising and analytics', body: [
        'The site loads Google AdSense’s advertising script and publishes site-verification information and an ads.txt file. Loading Google services can share the page address and your IP address with Google. Google and other advertising vendors may use cookies or similar technologies to serve and measure ads based on visits to this and other websites, depending on your settings and the advertising features in use.',
        'You can manage or opt out of personalized Google advertising through Google’s Ad Settings and manage cookies in your browser. Installing the AdSense code does not establish that Google has approved the site. The application does not load a separate analytics service.'
      ], links: [
        {label: 'How Google uses information from partner sites', href: 'https://policies.google.com/technologies/partner-sites'},
        {label: 'Manage Google ad personalization', href: 'https://adssettings.google.com/'},
        {label: 'Other advertising-vendor choices', href: 'https://optout.aboutads.info/'}
      ]},
      {title: 'Email inquiries', body: [
        `If you email ${CONTACT_EMAIL}, the contents of your message and your email address are processed by the email service used for that address. Send only the information needed to explain your inquiry.`
      ], links: [{label: 'Contact the project', href: '/contact'}]}
    ]
  },
  terms: {
    title: 'Terms of use.',
    eyebrow: 'Site terms',
    description: 'The practical terms for using the templates, tools, and linked resources in this project.',
    updated: '2026-10-11',
    sections: [
      {title: 'About the operator', body: [
        `The Faceless Prompts is an independent, unincorporated project founded in ${FOUNDING_YEAR} and operated by ${FOUNDER_NAME}. It is bootstrapped and self-funded. Questions about these terms can be sent to ${CONTACT_EMAIL}.`
      ]},
      {title: 'Using the tools and templates', body: ['You may adapt the prompt templates and generated production drafts for your own creative projects. Review the results and ensure you have permission to use the source materials, reference images, voices, music, and other media involved.']},
      {title: 'Your editorial decisions', body: ['You are responsible for the factual accuracy, rights, disclosures, and suitability of the content you publish. The project provides drafting and planning assistance. It does not promise audience growth, monetization, approval, or a particular quality of generated media.']},
      {title: 'Third-party services', body: ['External tools and embedded videos are operated by their respective providers. Availability, charges, licenses, and terms are set by those providers. Check their current terms before using their products or publishing their outputs.']},
      {title: 'Reasonable use', body: ['Do not attempt to expose server credentials, disrupt the site, bypass service limits, or use the project to infringe rights. AI drafting is subject to provider availability and request limits. The template planner remains an optional way to create a production outline without an AI request.']},
      {title: 'Changes and questions', body: ['The features and materials may change as the project evolves. Use the Contact page if you have a question about these terms or find a problem with the site.']}
    ]
  },
  'affiliate-disclosure': {
    title: 'How external links work here.',
    eyebrow: 'Disclosure',
    description: 'A clear explanation of the relationship between this project and the external resources it links to.',
    sections: [
      {title: 'Direct provider links', body: ['This version uses direct provider links in the tools directory and does not add affiliate tracking to those links. Mentioning a tool or embedding a video does not imply that its creator sponsors, endorses, or operates this project.']},
      {title: 'External videos', body: ['The YouTube videos are owned by their original creators. They are attributed and embedded for educational context. Our practice exercises and prompts are written for this site.']},
      {title: 'Future commercial relationships', body: ['If sponsored or affiliate links are added, they should be labeled where visitors encounter them and this page should be updated to describe the actual arrangement.']}
    ]
  }
};

