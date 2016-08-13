namespace('flappy.inputs');


flappy.inputs.keyboard = function(game) {

  var KEYS = game.input.keyboard.addKeys({
    'space': Phaser.Keyboard.SPACEBAR,
    'esc': Phaser.Keyboard.ESC
  });

  var fluentApi = {};
  var updateCycleChecks = [];

  function makeOnPressHandler(key) {
    return function(cb, ctx) {
      key.onDown.add(cb, ctx);
      return fluentApi;
    }
  }
  
  function makeOnReleaseHandler(key) {
    return function(cb, ctx) {
      key.onUp.add(cb, ctx);
      return fluentApi;
    }
  }
  
  function makeOnHoldHandler(key) {
    return function(cb, ctx) {
      updateCycleChecks.push(function() {
        if (key.isDown) {
          cb.call(ctx);
        }
      });
      return fluentApi;
    }
  }

  function processUpdateCycleChecks() {
    var i = 0;
    var l = updateCycleChecks.length;
    for(; i<l; i++) {
      updateCycleChecks[i]();
    }
  }

  for (var keyAlias in KEYS) {
    if (KEYS.hasOwnProperty(keyAlias)) {
      fluentApi[keyAlias] = makeOnPressHandler(KEYS[keyAlias]);
      fluentApi[keyAlias].onPress = makeOnPressHandler(KEYS[keyAlias]);
      fluentApi[keyAlias].onRelease = makeOnReleaseHandler(KEYS[keyAlias]);
      fluentApi[keyAlias].onHold = makeOnHoldHandler(KEYS[keyAlias]);
    }
  }

  fluentApi.KEYS = KEYS;
  fluentApi.process = processUpdateCycleChecks;


  // exports
  return fluentApi;
};