namespace('flappy.level1');


flappy.level1.state = function(game, store, env) {
  var scene;
  var keyboardInput;
  var touchInput;

  // objects
  var score;
  var bird;

  var mechanics;

  var pipeSpawnTimer;

  // life cycle
  function preload() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    
    game.load.script('mechanics', 'src/mechanics.js');
    game.load.script('commands', 'src/commands.js');
    game.load.script('keyboardInput', 'src/inputs/keyboard.js');
    game.load.script('touchInput', 'src/inputs/touch.js');

    game.load.script('level1Scene', 'src/level1/scene.js');
    game.load.script('level1Gameplay', 'src/level1/gameplay.js');
    
    game.load.script('bird', 'src/objects/bird.js');
    game.load.script('score', 'src/objects/score.js');
    
  }

  function create() {
    // imports
    mechanics = flappy.mechanics();
    keyboardInput = flappy.inputs.keyboard(game);
    touchInput = flappy.inputs.touch(game);
    scene = flappy.level1.scene(game);

    // initialize
    store.score = 0;
    score = flappy.objects.score(game, scene.score);
    bird = flappy.objects.bird(game, scene.bird);

    // setup rules for mechanics
    var when = flappy.level1.gameplay(game, scene, env).when;
    var gameBounds = {
      top: 0,
      bottom: env.height
    };
    mechanics
      .addRule(when(bird.sprite).hits(scene.pipes), restart)
      .addRule(when(bird.sprite).isOutOfBounds(gameBounds), restart);

    // controls
    keyboardInput
      .spaceKeyDown(bird.jump)
      .escKeyDown(pause);

    touchInput.tap(bird.jump);

    // start
    bird.fall();

    
    pipeSpawnTimer = game.time.events.loop(1500, function() {
      scene.spawnRowOfPipes();
      store.score += 1;
    }, this);
  }

  function update() {
    mechanics.enforce();

    if (scene.bird.angle < 20) {
      scene.bird.angle += 1;
    }
    
    score.update(store.score);
  }


  function pause() {
    console.log('Game paused');
  }

  function restart() {
    game.state.start('level1State');
  }


  // exports
  return {
    preload: preload,
    create: create,
    update: update,
    restart: restart
  };
};