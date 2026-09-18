// Language Adventures — idiomas-alvo disponíveis (spec §16).
// Adicionar um idioma novo = criar um pack novo aqui.
import { PACK as FR } from './fr.js';
import { PACK as ES } from './es.js';

export const PACKS = [FR, ES];

export function packById(id) {
  return PACKS.find((pack) => pack.id === id) || null;
}

// Todos os pares (seção, lição) em ordem, para navegação e progresso.
export function flattenLessons(pack) {
  const out = [];
  for (const section of pack.sections) {
    for (const lesson of section.lessons) {
      out.push({ section, lesson });
    }
  }
  return out;
}
