namespace('flappy');


flappy.commands = (function() {

  function updateText(obj, value) {
    return obj.text = value;
  }

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
    updateText: updateText,
    applyGravity: applyGravity,
    moveX: moveX,
    moveY: moveY
  };
})();