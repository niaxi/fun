namespace('flappy.states');


flappy.states.play = function(game, store) {
  var scene;
  var keyboardInput;
  var touchInput;
  var gamepadInput;
  
  // objects
  var hud;
  var bird;
  var pipeSpore;

  var pauseMenu;


  var physics;
  var rules;
  var when;

  // life cycle

  function create() {
    // imports
    graphicsBuilderFactory = flappy.graphics.graphicsBuilderFactory;
    
    physics = flappy.mechanics.arcadePhysicsModel(game);
    rules = flappy.mechanics.rulesEngine();
    when = flappy.mechanics.conditions(game, scene, store.env).when;
    
    keyboardInput = flappy.inputs.keyboard(game);
    touchInput = flappy.inputs.touch(game);
    gamepadInput = flappy.inputs.gamepad(game);

    pipeGenerator = flappy.objects.pipeGenerator;


    // initialize
    store.score = 0;
    pipeSpore = pipeGenerator(game, Phaser.Timer.SECOND * 1.25);
    bird = new flappy.objects.Bird(game, 100, 245);
    hud = new flappy.objects.Hud(game, store);


    gfx = graphicsBuilderFactory(game);
    var player2 = game.add.sprite(60, 80, gfx.draw('player2'));

    // apply core physics model
    physics.start();
    physics.gravity(1200);
    physics.enable([bird]);

    // setTimeout(function() {
    //   bird.enable();
    //   physics.enable([bird]);
    // }, 1000);
    // set the stage
    game.stage.backgroundColor = '#71c5cf';

    // setup gameplay
    var gameBounds = {
      top: 0,
      bottom: store.env.height
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
      .space(birdJump)
      .esc(togglePause);
    
    touchInput.tap(birdJump);

    gamepadInput.start();
    gamepadInput.pad1().onConnect(function(pad) {
        console.log('connected 1');
        pad.a(birdJump);
        pad.back(pause);
        pad.start(resume); // does not work with game.paused = true
      });

    // release the KRAPn!
    // pipeSpore.start();
  }

  function update() {
    if (store.paused) {
      return;
    }
    keyboardInput.process();
    rules.enforce();
  }

  function pause() {
    if (store.paused) {
      return;
    }
    
    game.paused = true;
    store.paused = true;
    pauseMenu = new flappy.objects.PauseMenu(game, store);
    pauseMenu.resumeButton.onInputUp.add(resume, this);
  }

  function resume() {
    if (!store.paused) {
      return;
    }
    pauseMenu.destroy();
    pauseMenu = null;
    game.paused = false;
    store.paused = false;
  }

  function restart() {
    // game.state.start('play');
    // bird.reset();
    // store.score = 0;
    // pipeSpore.stop();
  }



  // commands
  function birdJump() {
    if (store.paused) {
      return;
    }
    bird.jump();
  }

  function scorePoint() {
    store.score += 1;    
  }

  function togglePause(){
    if (!store.paused) {
      pause();
    } else {
      resume();
    }
  }

  

  // exports
  return {
    create: create,
    update: update,
    // pauseUpdate: pauseUpdate,
    restart: restart,
    resume: resume
  };
};