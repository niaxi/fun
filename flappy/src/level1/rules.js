namespace('flappy.level1');


flappy.level1.rules = function(game, scene) {
  // imports
  var events = flappy.events(game);


  var onOutOfBounds = new Phaser.Signal();


  function whenBirdHitsPipe(cb, ctx) {
    return events.whenHit(scene.bird, scene.pipes, cb, ctx);
  }

  function whenOutOfBounds(cb, ctx) {
    onOutOfBounds.add(cb, ctx);
  }

  // exports
  return {
    whenBirdHitsPipe: whenBirdHitsPipe
  };
};