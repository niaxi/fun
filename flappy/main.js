namespace('flappy');


flappy.main = (function() {
  var env = {
    width: 400,
    height: 490
  }
  var game = new Phaser.Game(env.width, env.height);
  var store = {
    score: 0,
    paused: false
  };


  // life cycle 
  function preload() {
    game.load.script('play',   'src/states/play.js');
  }

  function create() {
    game.state.add('play', flappy.states.play(game, store, env));
    game.state.start('play');
  }


  // setup
  game.state.add('main', {
    preload: preload,
    create: create
  });


  // start
  game.state.start('main');


  // exports
  return {
    game: game,
    store: store
  }
})();
