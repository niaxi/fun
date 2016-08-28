namespace('flappy.states');


flappy.states.credits = function(game, store) {
  var buttonFactory;


  // life cycle
  function create() {
    // imports
    buttonFactory = flappy.graphics.buttonFactory;

    this.titleText =  game.add.text(100, 120, "Credits",
      { font: '50px Arial', fill: '#ffffff' });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    this.whoText1 =  game.add.text(85, 220, "Ni Axi",
      { font: '22px Arial', fill: '#000000' });
    this.whatText1 =  game.add.text(100, 250, "Design + Code",
      { font: '16px Arial', fill: '#555555' });

    this.whoText2 =  game.add.text(85, 300, "Ty ",
      { font: '22px Arial', fill: '#000000' });
    this.whatText1 =  game.add.text(100, 330, "QA + Testing",
      { font: '16px Arial', fill: '#555555' });

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