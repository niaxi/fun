namespace('flappy.mechanics');


flappy.mechanics.conditions = function(game, scene, env) {

  function when(subject) {

    function hits(other) {
      return function() {
        return collision(subject, other);
      };
    }

    function hitsAny(group) {
      return function() {
        return collisionWithAnyInGroup(subject, group);
      };
    }

    function clearsAny(group) {
      return function() {
        return hasPassedAnyInGroup(subject, group);
      };
    }

    function isOutOfBounds(bounds) {
      return function() {
        return outOfVirticalBounds(subject, bounds);
      };
    }

    return {
      hits: hits,
      hitsAny: hitsAny,
      clearsAny: clearsAny,
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

  function hasPassedAnyInGroup(objA, group, cb, ctx) {
    var i=0, l, nestedGroup;
    if (!objA || !group || !group.children) {
      return false;
    }

    if (isSpriteGroup(group)) {
      l = group.children.length;
      for (; i<l; i++) {
        nestedGroup = group.children[i];
        if (nestedGroup.exists && !nestedGroup.hasBeenCleared && nestedGroup.children[0].world.x <= objA.world.x) {
          nestedGroup.hasBeenCleared = true;
          return true;
        }
      }
    }
    return false;
  }

  function collisionWithAnyInGroup(objA, group, cb, ctx) {
    var i=0, l;
    if (!group || !objA) {
      return false;
    }
    if (isSpriteGroup(group)) {
      l = group.children.length;
      for (; i<l; i++) {
        if (collision(objA, group.children[i], cb, ctx)) {
          return true;
        }
      }
    }
    return (collision(objA, group, cb, ctx));
  }

  function isSpriteGroup(obj) {
    return obj.children && obj.children.length;
  }


  // exports
  return {
    when: when
  };
};