namespace('flappy.states');


flappy.states.splash = function(game, store) {
  var rectFactory;

  var keyboardInput;
  var touchInput;
  var gamepadInput;


  // life cycle
  function init() {
    rectFactory = flappy.graphics.rectFactory;
    this.progressBar = rectFactory.make(game, 60, 280, {width: 280, height:20});
  }

  function preload() {
    game.add.existing(this.progressBar);
    this.load.setPreloadSprite(this.progressBar);

    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    game.load.atlas('birdy', 'assets/bird/spritesheet.png', 'assets/bird/sprites.json');
    
    game.load.script('keyboardInput', 'src/inputs/keyboard.js');
    game.load.script('touchInput', 'src/inputs/touch.js');
    game.load.script('gamepadInput', 'src/inputs/gamepad.js');
    
    game.load.script('Button', 'src/graphics/Button.js');
    game.load.script('buttonFactory', 'src/graphics/buttonFactory.js');
    game.load.script('textureFactory', 'src/graphics/textureFactory.js');

    game.load.script('Bird', 'src/objects/Bird.js');
    game.load.script('Hud', 'src/objects/Hud.js');
    game.load.script('Pipe', 'src/objects/Pipe.js');
    game.load.script('PipeGroup', 'src/objects/PipeGroup.js');
    game.load.script('PauseMenu', 'src/objects/PauseMenu.js');
    game.load.script('pipeGenerator', 'src/objects/pipeGenerator.js');

    game.load.script('arcadePhysicsModel', 'src/mechanics/arcadePhysicsModel.js');
    game.load.script('rulesEngine', 'src/mechanics/rulesEngine.js');
    game.load.script('conditions', 'src/mechanics/conditions.js');

    game.load.script('menu',   'src/states/menu.js');
    game.load.script('play',   'src/states/play.js');
  }

  function create() {
    this.titleText =  game.add.text(45, 120, "Flappy Blocks",
      { font: '50px Arial', fill: '#ffffff' });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    // initialize
    touchInput = flappy.inputs.touch(game);
    game.stage.backgroundColor = '#71c5cf';


    // add next states
    game.state.add('menu', flappy.states.menu(game, store));
    game.state.add('play', flappy.states.play(game, store));


    // load next state
    setTimeout(function () {
      console.log('loaded');
      game.state.start("menu");
    }, 500);
  }
  

  // exports
  return {
    init: init,
    preload: preload,
    create: create
  };
};