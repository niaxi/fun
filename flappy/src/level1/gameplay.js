namespace('flappy.level1');


flappy.level1.gameplay = function(game, scene, env) {
  var mechanics = flappy.mechanics();


  function when(subject) {

    function hits(other) {
      return function() {
        return collision(subject, other);
      };
    }

    function isOutOfBounds(bounds) {
      return function() {
        return outOfVirticalBounds(subject, bounds);
      };
    }

    return {
      hits: hits,
      isOutOfBounds: isOutOfBounds
    };
  }

  function outOfVirticalBounds(obj, bounds) {
    return obj.y < bounds.top || obj.y > bounds.bottom;
  }

  function collision(objA, objB, cb, ctx) {
    return game.physics.arcade.overlap(
      objA, objB, cb, null, ctx);
  }


  // exports
  return {
    when: when
  };
};