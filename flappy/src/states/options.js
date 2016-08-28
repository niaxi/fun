namespace('flappy.states');


flappy.states.options = function(game, store) {
  var buttonFactory;


  // life cycle
  function create() {
    // imports
    buttonFactory = flappy.graphics.buttonFactory;

    this.titleText =  game.add.text(100, 120, "Options",
      { font: '50px Arial', fill: '#ffffff' });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);


    this.backButton = buttonFactory.add(game, 180, 400, "◀  Back");

    // initialize
    game.stage.backgroundColor = '#71c5cf';

    this.backButton.onInputUp.add(function() {
      game.state.start('menu');
    });
  }


  // exports
  return {
    create: create
  };
};