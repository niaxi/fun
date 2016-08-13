namespace('flappy.states');


flappy.states.play = function(game, store, env) {
  var scene;
  var keyboardInput;
  var touchInput;
  var gamepadInput;
  
  // objects
  var hud;
  var bird;
  var pipeSpore;

  var rules;

  var pipeSpawnTimer;

  // life cycle
  function preload() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    
    game.load.script('keyboardInput', 'src/inputs/keyboard.js');
    game.load.script('touchInput', 'src/inputs/touch.js');
    
    game.load.script('Bird', 'src/objects/Bird.js');
    game.load.script('Hud', 'src/objects/Hud.js');
    game.load.script('Pipe', 'src/objects/Pipe.js');
    game.load.script('PipeGroup', 'src/objects/PipeGroup.js');

    game.load.script('rulesEngine', 'src/mechanics/rulesEngine.js');
    game.load.script('pipeGenerator', 'src/mechanics/pipeGenerator.js');
    game.load.script('conditions', 'src/mechanics/conditions.js');
  }

  function create() {
    // imports
    pipeGenerator = flappy.mechanics.pipeGenerator;
    rules = flappy.mechanics.rulesEngine();
    keyboardInput = flappy.inputs.keyboard(game);
    touchInput = flappy.inputs.touch(game);
    // gamepadInput = flappy.inputs.gamepad(game);


    // initialize
    store.score = 0;
    pipeSpore = pipeGenerator(game, Phaser.Timer.SECOND * 1.25);
    bird = new flappy.objects.Bird(game, 100, 245);
    hud = new flappy.objects.Hud(game, store);


    // set the stage
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1200;

    // setup gameplay
    var when = flappy.mechanics.conditions(game, scene, env).when;
    var gameBounds = {
      top: 0,
      bottom: env.height
    };

    rules
      .add(when(bird).hitsAny(pipeSpore.pipes), restart)
      .add(when(bird).isOutOfBounds(gameBounds), restart)
      .add(when(bird).clearsAny(pipeSpore.pipes), scorePoint);

    // rules
    //   .when(playerHitsAPipe, restart)
    //   .when(playerIsOutOfBounds(gameBounds), restart)
    //   .when(playerClearsAPipeGroup, scorePoint);


    keyboardInput
      .space(bird.jump, bird)
      .esc(pause);
    
    touchInput.tap(bird.jump, bird);

    // gamepadInput
    //   .pad1
    //     .buttonADown('down')
    //     .buttonBDown('down')
    //     .buttonBUp()

    // release the KRAPn!
    pipeSpore.start();
  }

  function update() {
    keyboardInput.process();
    rules.enforce();
  }

  function pause() {
    console.log('Game paused');
  }

  function restart() {
    game.state.start('play');
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