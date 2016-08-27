namespace('flappy');


flappy.main = (function() {
  var store = {
    score: 0,
    paused: false,
    env: {
      width: 400,
      height: 490
    }
  };
  var game = new Phaser.Game(store.env.width, store.env.height);

  // life cycle 
  function preload() {
    game.load.script('graphicsBuilder', 'src/graphics/graphicsBuilder.js');
    game.load.script('graphicsBuilderFactory', 'src/graphics/graphicsBuilderFactory.js');
    game.load.script('rectFactory', 'src/graphics/rectFactory.js');

    game.load.script('splash',   'src/states/splash.js');
  }

  function create() {
    game.state.add('splash', flappy.states.splash(game, store));
    game.state.start('splash');
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
