import { HEAL_CATALOGUE_MEDIA, type HealCatalogueId } from './catalogue-media';

export type HealVariantId = HealCatalogueId;

export type HealVariant = {
  id: HealVariantId;
  name: string;
  code: 'CNL' | 'LVC' | 'MRR' | 'OLB' | 'ALC';
  motionLabel: string;
  reading: string;
  designNote: string;
  color: string;
  image: string;
  path: string;
  counterPath: string;
  cadenceMs: number;
  mobileCadenceMs: number;
};

/**
 * Fonte única da coleção de estreia. As leituras abaixo são linguagem editorial
 * e histórica; não descrevem eficácia médica, espiritual ou ambiental.
 */
export const HEAL_VARIANTS = [
  {
    id: 'canela',
    name: 'Canela',
    code: 'CNL',
    motionLabel: 'Contragiros',
    reading: 'Um traço quente que avança em ciclos curtos.',
    designNote: 'Acento quente, espiral quebrada e direção curta formam um código de reconhecimento.',
    color: '#c7663f',
    image: HEAL_CATALOGUE_MEDIA.canela.url,
    path: 'M120 318 C78 292 76 254 122 232 C168 210 166 172 120 156 C80 142 84 102 142 72',
    counterPath: 'M112 308 C148 278 150 246 116 226 C84 206 88 178 126 160',
    cadenceMs: 720,
    mobileCadenceMs: 420,
  },
  {
    id: 'lavanda-celestial',
    name: 'Lavanda Celestial',
    code: 'LVC',
    motionLabel: 'Arcos abertos',
    reading: 'Arcos amplos deixam espaço entre uma curva e outra.',
    designNote: 'O violeta e os intervalos amplos diferenciam o produto sem descrever um efeito.',
    color: '#7773d6',
    image: HEAL_CATALOGUE_MEDIA['lavanda-celestial'].url,
    path: 'M120 318 C66 274 66 212 122 188 C180 164 182 102 112 54',
    counterPath: 'M132 304 C176 264 164 216 118 196 C84 180 78 138 104 102',
    cadenceMs: 900,
    mobileCadenceMs: 520,
  },
  {
    id: 'mirra',
    name: 'Mirra',
    code: 'MRR',
    motionLabel: 'Dobra interna',
    reading: 'O rastro se recolhe, cruza e preserva um centro.',
    designNote: 'A forma convergente é um código gráfico; não representa ingrediente nem tradição.',
    color: '#8f4c49',
    image: HEAL_CATALOGUE_MEDIA.mirra.url,
    path: 'M120 318 C74 286 72 238 118 218 C166 198 168 154 124 138 C88 126 90 94 132 72',
    counterPath: 'M130 300 C100 270 100 240 132 220 C158 204 150 176 120 160',
    cadenceMs: 780,
    mobileCadenceMs: 460,
  },
  {
    id: 'olibano',
    name: 'Olíbano',
    code: 'OLB',
    motionLabel: 'Cadência vertical',
    reading: 'Dois movimentos sobem e se encontram antes de desaparecer.',
    designNote: 'A orientação vertical organiza o SKU e não descreve ação espiritual.',
    color: '#d0a447',
    image: HEAL_CATALOGUE_MEDIA.olibano.url,
    path: 'M120 318 C160 294 160 264 120 250 C80 236 80 204 120 190 C160 176 160 142 120 128 C92 116 96 88 130 64',
    counterPath: 'M118 306 C88 282 90 254 124 238 C154 224 150 196 116 182',
    cadenceMs: 840,
    mobileCadenceMs: 480,
  },
  {
    id: 'alecrim',
    name: 'Alecrim',
    code: 'ALC',
    motionLabel: 'Mudanças precisas',
    reading: 'Um filamento vegetal encontra o alto por mudanças precisas.',
    designNote: 'O verde e o percurso angular distinguem o produto; não afirmam composição ou benefício.',
    color: '#43836f',
    image: HEAL_CATALOGUE_MEDIA.alecrim.url,
    path: 'M120 318 L148 282 L102 246 L146 210 L100 172 L138 126 L116 72',
    counterPath: 'M116 296 L128 270 L112 244 L130 218 L114 188 L126 156',
    cadenceMs: 680,
    mobileCadenceMs: 400,
  },
] as const satisfies readonly HealVariant[];

export function getHealVariant(id: string): HealVariant | undefined {
  return HEAL_VARIANTS.find((variant) => variant.id === id);
}
