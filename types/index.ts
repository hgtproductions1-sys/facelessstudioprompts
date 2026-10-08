export type VisualEngine = 
  | 'Google Flow / Veo'
  | 'Runway Gen-3 Alpha'
  | 'Kling AI 1.5 / 2.0'
  | 'OpenAI Sora / ChatGPT'
  | 'Luma Dream Machine'
  | 'Universal AI Video Prompt'
  | 'Pika 2.0'
  | 'Minimax / Hailuo AI'
  | 'Leonardo AI'
  | 'Midjourney v6.1'
  | 'Flux.1 [dev]';

export type CameraStyle = 
  | '35mm Anamorphic Cinematic'
  | 'Macro Chiaroscuro'
  | 'Vintage 16mm Film Patina'
  | 'Cinematic Drone Establishing'
  | 'Moody Studio Chiaroscuro'
  | 'Volumetric Fog & God Rays'
  | 'Hyper-detailed Archival Document'
  | 'Bioluminescent Neon Noir';

export type TargetDuration = '60s Shorts / Reels' | '3-min Story' | '8-12 min Long-form' | '15+ min Documentary';

export interface ShotPrompt {
  id: string;
  shotNumber: number;
  timestamp: string;
  sceneDescription: string;
  visualPrompt: string;
  cameraMovement: string;
  aspectRatio: string;
  engineParameters: string;
  voiceoverLine: string;
  soundDesignCue: string;
}

export interface VideoPackage {
  id: string;
  topic: string;
  niche: string;
  targetDuration: string;
  engine: VisualEngine;
  cameraStyle: CameraStyle;
  hook: {
    hookScript: string;
    hookVisualPrompt: string;
    retentionTrigger: string;
  };
  scriptOutline: {
    acts: {
      title: string;
      duration: string;
      summary: string;
      keyTension: string;
    }[];
  };
  voiceoverSettings: {
    recommendedVoice: string;
    voiceProfile: string;
    stability: number;
    clarity: number;
    speechRate: string;
    audioPausesDirective: string;
  };
  characterConsistencyGuide: {
    anchorPrompt: string;
    negativePrompt: string;
    lightingAnchor: string;
    seedDirectives: string;
  };
  shots: ShotPrompt[];
  thumbnailConcept: {
    prompt: string;
    textOverlay: string;
    compositionNote: string;
    expectedCTR: string;
  };
  musicBrollGuide: {
    bpmRange: string;
    musicVibe: string;
    recommendedKeywords: string[];
    foleyChecklist: string[];
  };
  storytellingTips: {
    pacingRule: string;
    visualRetentionTip: string;
    hookFormula: string;
  };
  createdAt: string;
}

export interface NicheData {
  id: string;
  title: string;
  slug: string;
  category: string;
  competition: 'Low' | 'Medium' | 'High';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  avgVideoLength: string;
  audienceDemographic: string;
  description: string;
  visualAesthetic: string;
  colorGrade: string;
  soundscape: string;
  sampleHook: string;
  viralConcepts: {
    title: string;
    hook: string;
    format: string;
  }[];
  promptFormula: string;
  recommendedStack: {
    script: string;
    voice: string;
    visual: string;
    edit: string;
  };
  bestFormat: string;
}

export interface PromptItem {
  id: string;
  title: string;
  category: 
    | 'Cinematic' 
    | 'Character Consistency' 
    | 'Historical' 
    | 'Dark Sci-Fi' 
    | 'Stoic & Philosophy' 
    | 'True Crime' 
    | 'Luxury & Architecture' 
    | 'Luxury & Wealth'
    | 'Dark Psychology' 
    | 'Camera Directives'
    | 'Nature & Creatures'
    | 'Mythology & Fantasy';
  engine: VisualEngine;
  prompt: string;
  negativePrompt?: string;
  aspectRatio: string;
  parameters: string;
  cameraDirective: string;
  lightingDirective: string;
  useCase: string;
}

export interface AITool {
  id: string;
  name: string;
  category: 'Scripting' | 'Voiceover' | 'Image Generation' | 'Video Motion' | 'Editing & Captions' | 'Analytics & SEO';
  rating: number;
  pricing: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  features: string[];
  affiliateUrl: string;
  isRecommended?: boolean;
}
