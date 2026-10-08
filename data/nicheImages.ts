type NicheImage = {src:string;alt:string};

export const NICHE_IMAGES:Record<string,NicheImage|undefined> = {
  'ai-cat-and-pet-stories': {
    src:'/story-cat.webp',
    alt:'Orange kitten in a teal scarf looking into a warm bakery on a rainy evening',
  },
  'pov-immersive-vlogs': {
    src:'/niche-pov-vlog.webp',
    alt:'First-person view of hands holding a map in a lantern-lit street after rain',
  },
  'stickman-explainer-and-skits': {
    src:'/niche-stickman-skits.webp',
    alt:'Three playful stick figures working together to hold up a golden lightbulb',
  },
  'analog-horror-and-unsolved-mysteries': {
    src:'/niche-analog-horror.webp',
    alt:'Vintage CRT television showing an eerie silhouette through static in a dim recording room',
  },
  'elderly-wisdom-and-stoic-long-form': {
    src:'/niche-elderly-wisdom.webp',
    alt:'Thoughtful elderly storyteller seated in a warmly lit library',
  },
  'ai-asmr-cooking-cleaning-restoration': {
    src:'/niche-asmr-restoration.webp',
    alt:'Close-up of a gloved hand brushing tarnish from an ornate brass pocket watch',
  },
};
