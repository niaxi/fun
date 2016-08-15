namespace('flappy.inputs');


flappy.inputs.gamepad = function(game) {
  
  var api;
  var BUTTON_CODES = {
    'a': Phaser.Gamepad.XBOX360_A,
    'b': Phaser.Gamepad.XBOX360_B,
    'start': Phaser.Gamepad.XBOX360_START,
    'back': Phaser.Gamepad.XBOX360_BACK
  }


  function getGamepadButtons(pad) {
    var buttons = {};

    for (var buttonAlias in BUTTON_CODES) {
      if (BUTTON_CODES.hasOwnProperty(buttonAlias)) {
        buttons[buttonAlias] = pad.getButton(BUTTON_CODES[buttonAlias]);
      }
    }
    return buttons;
  }


  function makeGamepadFluentApi(pad) {
    var onConnectCallbacks = [];
    var fluentApi = {
      _pad: pad,
      isConnected: pad.connected,
      onConnect: function(cb) {
        onConnectCallbacks.push(cb);
      }      
    };

    function handleOnConnect(){
      var i = 0;
      var l = onConnectCallbacks.length;
      for(; i<l; i++) {
        onConnectCallbacks[i](fluentApi);
      }
    }

    function makeOnPressHandler(button) {
      return function(cb, ctx) {
        button.onDown.add(cb, ctx);
        return fluentApi;
      }
    }
    
    function makeOnReleaseHandler(button) {
      return function(cb, ctx) {
        button.onUp.add(cb, ctx);
        return fluentApi;
      }
    }

    function makeButtonEventHandlers(buttons) {
      var buttonEventHandlers = {};

      for (var buttonAlias in buttons) {
        if (buttons.hasOwnProperty(buttonAlias)) {
          buttonEventHandlers[buttonAlias] = makeOnPressHandler(buttons[buttonAlias]);
          buttonEventHandlers[buttonAlias].onPress = makeOnPressHandler(buttons[buttonAlias]);
          buttonEventHandlers[buttonAlias].onRelease = makeOnReleaseHandler(buttons[buttonAlias]);
          // buttonEventHandlers[buttonAlias].onHold = makeOnHoldHandler(buttons[buttonAlias]);
        }
      }
      return buttonEventHandlers;
    }

    // when connected, map buttons and generate event handlers
    fluentApi.onConnect(function() {
      var buttons = getGamepadButtons(pad);
      var buttonEventHandlers = makeButtonEventHandlers(buttons);

      fluentApi.BUTTONS = buttons;
      for (var buttonAlias in buttonEventHandlers) {
        if (buttonEventHandlers.hasOwnProperty(buttonAlias)) {
          fluentApi[buttonAlias] = buttonEventHandlers[buttonAlias];
        }
      }
    });

    pad.addCallbacks(this, { onConnect: handleOnConnect });

    return fluentApi;
  }


  function pad1() {
    return makeGamepadFluentApi(game.input.gamepad.pad1);
  }

  function pad2() {
    return makeGamepadFluentApi(game.input.gamepad.pad2);
  }

  function pad3() {
    return makeGamepadFluentApi(game.input.gamepad.pad3);
  }

  function pad4() {
    return makeGamepadFluentApi(game.input.gamepad.pad4);
  }


  function start() {
    game.input.gamepad.start();
    return api;
  }

  function isSupported() {
    return game.input.gamepad.supported;
  }

  function isActive() {
    return game.input.gamepad.active;
  }


  // exports
  api = {
    start: start,
    isSupported: isSupported,
    isActive: isActive,
    pad1: pad1,
    pad2: pad2,
    pad3: pad3,
    pad4: pad4,
    BUTTON_CODES: BUTTON_CODES
  };
  return api;
};