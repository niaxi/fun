namespace('flappy.states');


flappy.states.splash = function(game, store) {
  var rectFactory;

  var keyboardInput;
  var touchInput;
  var gamepadInput;


  // life cycle
  function init() {
    game.stage.backgroundColor = '#71c5cf';
    this.titleText =  game.add.text(45, 120, "Flappy Blocks",
      { font: '50px Arial', fill: '#ffffff' });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    rectFactory = flappy.graphics.rectFactory;
    var unfilledBarStyle = {
      width: 280, 
      height: 20,
      line: {
        color: 0xAAAAAA
      },
      fill: {
        color: 0xCCCCCC
      }
    };
    this.progressBarUnfilled = rectFactory.add(game, 60, 280, unfilledBarStyle);
    this.progressBar = rectFactory.make(game, 60, 280, {width: 280, height:20});
    this.loadingText =  game.make.text(170, 282, "Loading...",
      { font: '12px Arial', fill: '#ffffff' });
  }

  function preload() {

    game.add.existing(this.progressBar);
    game.add.existing(this.loadingText);
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
    game.load.script('GameOverMenu', 'src/objects/GameOverMenu.js');
    game.load.script('pipeGenerator', 'src/objects/pipeGenerator.js');

    game.load.script('arcadePhysicsModel', 'src/mechanics/arcadePhysicsModel.js');
    game.load.script('rulesEngine', 'src/mechanics/rulesEngine.js');
    game.load.script('conditions', 'src/mechanics/conditions.js');

    game.load.script('menu',   'src/states/menu.js');
    game.load.script('play',   'src/states/play.js');
    game.load.script('options',   'src/states/options.js');
    game.load.script('credits',   'src/states/credits.js');
  }

  function create() {

    // initialize
    touchInput = flappy.inputs.touch(game);


    // add next states
    game.state.add('menu', flappy.states.menu(game, store));
    game.state.add('play', flappy.states.play(game, store));
    game.state.add('options', flappy.states.options(game, store));
    game.state.add('credits', flappy.states.credits(game, store));


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