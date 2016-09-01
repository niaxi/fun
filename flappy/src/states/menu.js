namespace('flappy.states');


flappy.states.menu = function(game, store, env) {
  var buttonFactory;


  // life cycle
  function create() {
    // imports
    buttonFactory = flappy.graphics.buttonFactory;

    this.titleText =  game.add.text(45, 120, "Flappy Blocks",
      { font: '50px Arial', fill: '#ffffff' });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.startButton = buttonFactory.add(game, 180, 280, "▶  Start");
    this.optionsButton = buttonFactory.add(game, 180, 340, "✎  Options");
    this.creditsButton = buttonFactory.add(game, 180, 400, "☷  Credits");

    // initialize
    game.stage.backgroundColor = '#71c5cf';

    this.startButton.onInputUp.add(function() {
      game.state.start('play');
    });

    this.optionsButton.onInputUp.add(function() {
      game.state.start('options');
    });

    this.creditsButton.onInputUp.add(function() {
      game.state.start('credits');
    });
  }
  

  // exports
  return {
    create: create
  };
};