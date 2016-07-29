namespace('flappy');


flappy.main = (function() {
  var env = {
    width: 400,
    height: 490
  }
  var game = new Phaser.Game(env.width, env.height);
  var store = {
    score: 0
  };


  // life cycle 
  function preload() {
    game.load.script('level1State',   'src/level1/state.js');
  }

  function create() {
    game.state.add('level1State', flappy.level1.state(game, store, env));
    game.state.start('level1State');
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
