namespace('flappy.level1');


flappy.level1.state = function(game, store) {
  var scene;
  var actions;
  var keyboardInput;

  var updateScore;
  var pipeSpawnTimer;

  // life cycle
  function preload() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    
    game.load.script('actions', 'src/actions.js');
    game.load.script('events', 'src/events.js');
    game.load.script('keyboardInput', 'src/inputs/keyboard.js');
    game.load.script('touchInput', 'src/inputs/touch.js');
    game.load.script('level1Scene', 'src/level1/scene.js');
    game.load.script('level1Rules', 'src/level1/rules.js');
  }

  function create() {
    // imports
    keyboardInput = flappy.inputs.keyboard(game);
    touchInput = flappy.inputs.touch(game);
    scene = flappy.level1.scene(game);
    rules = flappy.level1.rules(game, scene);
    actions = flappy.actions;


    // setup
    store.score = 0;
    updateScore = actions.getTextUpdater(scene.score);


    // bird = birdController(scene.bird);
    // rules.whenBirdIsOutOfBounds(restart);
    // rules.whenBirdHitsPipe(restart);


    // rules
    rules.whenBirdHitsPipe(restart);

    // scene.bird.events.onKilled.add(restart);
    // events.whenBirdHitsGround(scene.bird, );
    // events.whenBirdDies(restart);


    // controls
    keyboardInput.spaceKeyDown(jump);
    keyboardInput.escKeyDown(pause);
    touchInput.tap(jump);


    // start
    actions.applyGravity(scene.bird, 1000);
    pipeSpawnTimer = game.time.events.loop(1500, function() {
      scene.spawnRowOfPipes();
      store.score += 1;
    }, this);
  }

  function update() {
    rules.whenBirdHitsPipe(restart);
    
    // game.physics.arcade.overlap(
    //   scene.bird, scene.pipes, restart, null, this);

    if (scene.bird.angle < 20) {
      scene.bird.angle += 1;
    }
    // birdConstraint.check();
    updateScore(store.score);
  }



  function jump(){
    game.add.tween(scene.bird).to({angle:-20}, 100).start();
    return actions.moveY(scene.bird, -350);
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


/*
var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

function whenSpaceKeyPressed(cb) {
  spaceKey.onDown.add(cb);
}




whenSpaceKeyPressed(jump);
whenGamepadAPressed(jump);


function jump() {
  bird.body.velocity.y = -350;
}

function whenCollide(a, b, cb) {
  game.physics.arcade.overlap(
      a, b, cb, null, this);
}
*/