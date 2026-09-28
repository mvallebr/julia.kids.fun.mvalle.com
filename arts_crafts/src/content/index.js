// A biblioteca inteira, montada a partir de ./tutorials/.
//
// Um arquivo por tutorial (por categoria, na prática). A biblioteca cresce de um
// lado só: entra um arquivo, os testes rodam sobre a lista inteira e a lição
// aparece na tela. Nada aqui conhece o texto de um tutorial — só onde ele mora
// e em que ordem aparece.
//
// Os objetos vêm na ordem em que devem aparecer na biblioteca: primeiro o
// desenho e pintura (é por onde a criança começa), depois papel, sucata, massa,
// lã, spin art, 2D e 3D.

import owl from './tutorials/paint-a-cute-owl.js';
import paintFigure from './tutorials/paint-a-figure.js';
import paintCharacters from './tutorials/paint-a-characters.js';
import drawingPainting from './tutorials/drawing-painting.js';
import paperCard from './tutorials/paper-card.js';
import recycled from './tutorials/recycled.js';
import clay from './tutorials/clay-model-making.js';
import textile from './tutorials/textile-yarn.js';
import spinArt from './tutorials/spin-art.js';
import twoD from './tutorials/2d-design.js';
import threeD from './tutorials/3d-modelling.js';

export const TUTORIALS = [
  ...owl,
  ...paintFigure,
  ...paintCharacters,
  ...drawingPainting,
  ...paperCard,
  ...recycled,
  ...clay,
  ...textile,
  ...spinArt,
  ...twoD,
  ...threeD,
];

export * from './shared.js';
