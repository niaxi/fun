namespace('flappy');


flappy.commands = (function() {

  function applyGravity(obj, value) {
    return obj.body.gravity.y = value;
  }

  function moveX(obj, value) {
    return obj.body.velocity.x = value;
  }

  function moveY(obj, value) {
    return obj.body.velocity.y = value;
  }


  // exports
  return {
    applyGravity: applyGravity,
    moveX: moveX,
    moveY: moveY
  };
})();