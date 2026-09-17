// i18n do Music Adventures: PT padrão (idioma da Julia), EN e ES.

const COPY = {
  title: 'Music Adventures',
  tagline: 'Ouça, adivinhe e cante afinado',
  play: 'Tocar',
  continueJourney: 'Continuar',
  exitToLauncher: 'Menu',
  hubTitle: 'Escolha uma atividade',
  hubSubtitle: 'Ganhe estrelas em cada uma!',
  listen: 'Detetive de Ouvir',
  listenDesc: 'Ouça a melodinha e descubra quais são as notas',
  sing: 'Cante a Canção',
  singDesc: 'Ouça o trecho, cante de volta e veja sua voz na tela',
  level: 'Nível {n}',
  stars: '{n} ★',
  locked: 'Complete o nível anterior',
  back: 'Voltar',
  backToHub: 'Atividades',
  listenAgain: '🔊 Ouvir de novo',
  yourAnswer: 'Sua resposta',
  check: 'Verificar',
  tryAgain: 'Quase! Tente de novo.',
  correct: 'Isso mesmo!',
  greatEar: 'Que ouvido fino!',
  tapToStart: 'toque para começar',
  levelDone: 'Nível completo!',
  nextLevel: 'Próximo nível',
  replay: 'Jogar de novo',
  micIntro: 'Para cantar, vou precisar ouvir sua voz.',
  micAllow: '🎤 Ligar o microfone',
  micDenied: 'O microfone está desligado. Você pode permitir nas configurações do navegador ou jogar o Detetive de Ouvir!',
  micReady: 'Microfone pronto!',
  listenFirst: '🔊 Ouça a música…',
  nowSing: '🎶 Agora cante!',
  holdToSing: 'Segure para cantar',
  listening: 'Ouvindo…',
  yourVoice: 'sua voz',
  singFeedback: { good: 'Afinado!', ok: 'Quase!', off: 'Tente alcançar a nota', miss: 'Não te ouvi aqui' },
  score: '{good} afinadas · {ok} quase',
  newStar: 'Nova estrela!',
  howTo: 'Como funciona',
  sound: 'Som',
  loading: 'Preparando os instrumentos…',
  errorFatal: 'Ops! Algo deu errado. Recarregue a página para continuar a aventura.',
};

const ES = {
  tagline: 'Escucha, adivina y canta afinado',
  play: 'Jugar',
  continueJourney: 'Continuar',
  hubTitle: 'Elige una actividad',
  hubSubtitle: '¡Gana estrellas en cada una!',
  listen: 'Detective del Oído',
  listenDesc: 'Escucha la melodía y descubre cuáles son las notas',
  sing: 'Canta la Canción',
  singDesc: 'Escucha el fragmento, cántalo y ve tu voz en la pantalla',
  level: 'Nivel {n}',
  locked: 'Completa el nivel anterior',
  back: 'Volver',
  backToHub: 'Actividades',
  listenAgain: '🔊 Escuchar de nuevo',
  yourAnswer: 'Tu respuesta',
  check: 'Comprobar',
  tryAgain: '¡Casi! Inténtalo de nuevo.',
  correct: '¡Eso es!',
  greatEar: '¡Qué buen oído!',
  levelDone: '¡Nivel completo!',
  nextLevel: 'Siguiente nivel',
  replay: 'Jugar otra vez',
  micIntro: 'Para cantar, necesito escuchar tu voz.',
  micAllow: '🎤 Encender el micrófono',
  micDenied: 'El micrófono está apagado. ¡Puedes permitirlo en la configuración del navegador o jugar el Detective del Oído!',
  micReady: '¡Micrófono listo!',
  listenFirst: '🔊 Escucha la canción…',
  nowSing: '🎶 ¡Ahora canta!',
  holdToSing: 'Mantén para cantar',
  listening: 'Escuchando…',
  yourVoice: 'tu voz',
  score: '{good} afinadas · {ok} casi',
  newStar: '¡Nueva estrella!',
};

const EN = {
  tagline: 'Listen, guess and sing in tune',
  play: 'Play',
  continueJourney: 'Continue',
  hubTitle: 'Pick an activity',
  hubSubtitle: 'Earn stars in each one!',
  listen: 'Ear Detective',
  listenDesc: 'Hear the melody and work out which notes it uses',
  sing: 'Sing the Song',
  singDesc: 'Hear the tune, sing it back, watch your voice on screen',
  level: 'Level {n}',
  locked: 'Finish the previous level first',
  back: 'Back',
  backToHub: 'Activities',
  listenAgain: '🔊 Play it again',
  yourAnswer: 'Your answer',
  check: 'Check',
  tryAgain: 'So close! Try again.',
  correct: "That's it!",
  greatEar: 'What a sharp ear!',
  levelDone: 'Level complete!',
  nextLevel: 'Next level',
  replay: 'Play again',
  micIntro: 'To sing, I need to hear your voice.',
  micAllow: '🎤 Turn on the microphone',
  micDenied: 'The microphone is off. You can allow it in the browser settings or go play Ear Detective!',
  micReady: 'Microphone ready!',
  listenFirst: '🔊 Listen to the song…',
  nowSing: '🎶 Now sing!',
  holdToSing: 'Hold to sing',
  listening: 'Listening…',
  yourVoice: 'your voice',
  score: '{good} in tune · {ok} close',
  newStar: 'New star!',
};

export function uiText(language, key, vars = {}) {
  let table = COPY;
  if (language === 'es') table = { ...COPY, ...ES };
  else if (language === 'en') table = { ...COPY, ...EN };
  let value = table[key] ?? COPY[key] ?? key;
  for (const [name, replacement] of Object.entries(vars)) {
    value = value.replaceAll(`{${name}}`, replacement);
  }
  return value;
}

export function lang(value, language = 'pt') {
  if (value && typeof value === 'object') return value[language] ?? value.pt ?? value.en ?? '';
  return value ?? '';
}
