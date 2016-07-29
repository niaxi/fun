namespace('flappy.objects');


flappy.objects.score = function(game, sprite) {
  // imports
  var updateText = flappy.commands.updateText;


  function update(value) {
    updateText(sprite, value);
  }


  // exports 
  return {
    sprite: sprite,
    update: update
  };
};