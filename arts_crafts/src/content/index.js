// A biblioteca inteira, montada a partir de ./tutorials/.
//
// Um arquivo por tutorial. A biblioteca cresce de um lado só: entra um arquivo,
// saem os testes verde e a lição na tela. Nada aqui conhece o texto de um
// tutorial — só onde ele mora e em que ordem aparece.

import owl from './tutorials/paint-a-cute-owl.js';

export const TUTORIALS = [...owl];

export * from './shared.js';
