namespace('flappy.level1');


flappy.level1.state = function(game, store, env) {
  var scene;
  var keyboardInput;
  var touchInput;

  // objects
  var hud;
  var bird;
  var pipeSpore;

  var mechanics;

  var pipeSpawnTimer;

  // life cycle
  function preload() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    
    game.load.script('keyboardInput', 'src/inputs/keyboard.js');
    game.load.script('touchInput', 'src/inputs/touch.js');

    game.load.script('level1Scene', 'src/level1/scene.js');
    game.load.script('level1Gameplay', 'src/level1/gameplay.js');
    
    game.load.script('Bird', 'src/objects/Bird.js');
    game.load.script('Hud', 'src/objects/Hud.js');
    game.load.script('Pipe', 'src/objects/Pipe.js');
    game.load.script('PipeGroup', 'src/objects/PipeGroup.js');

    game.load.script('mechanics', 'src/engine/mechanics.js');
    game.load.script('pipeGenerator', 'src/engine/pipeGenerator.js');
  }

  function create() {
    // imports
    pipeGenerator = flappy.engine.pipeGenerator;
    mechanics = flappy.engine.mechanics();
    keyboardInput = flappy.inputs.keyboard(game);
    touchInput = flappy.inputs.touch(game);
    scene = flappy.level1.scene(game);


    // initialize
    store.score = 0;
    pipeSpore = pipeGenerator(game, Phaser.Timer.SECOND * 1.25);
    bird = new flappy.objects.Bird(game, 100, 245);
    hud = new flappy.objects.Hud(game, store);

    // setup rules for mechanics
    var when = flappy.level1.gameplay(game, scene, env).when;
    var gameBounds = {
      top: 0,
      bottom: env.height
    };

    mechanics
      .addRule(when(bird).hitsAny(pipeSpore.pipes), restart)
      .addRule(when(bird).isOutOfBounds(gameBounds), restart)
      .addRule(when(bird).clearsAny(pipeSpore.pipes), scorePoint);

    // mechanics
    //   .when(playerHitsAPipe, restart)
    //   .when(playerIsOutOfBounds(gameBounds), restart)
    //   .when(playerClearsAPipeGroup, scorePoint);

    // controls
    keyboardInput
      .spaceKeyDown(bird.jump, bird) 
      .escKeyDown(pause);

    touchInput.tap(bird.jump, bird);

    pipeSpore.start();
  }

  function update() {
    mechanics.enforce();
  }

  function pause() {
    console.log('Game paused');
  }

  function restart() {
    game.state.start('level1State');
  }

  function scorePoint() {
    store.score += 1;    
  }


  // exports
  return {
    preload: preload,
    create: create,
    update: update,
    restart: restart
  };
};