namespace('flappy.mechanics');


flappy.mechanics.pipeGenerator = function(game, frequency) {
  // imports
  var PipeGroup = flappy.objects.PipeGroup;


  var pipes = game.add.group();
  var generator;

  function spawnRowOfPipes() {
    var pipeGroup = pipes.getFirstExists(false);
    if(!pipeGroup) {
        pipeGroup = new PipeGroup(game, pipes);
        pipeGroup.name = 'PipeGroup' + (parseInt(pipes.children.length, 10));
    } 
    else {
      pipeGroup.reset(game.width + 10, 0);
    }
  }

  function start() {
    if (!generator) {
      generator = game.time.events.loop(frequency, spawnRowOfPipes, this);
    }
    generator.timer.start();
  }

  function stop() {
    if (generator) {
      generator.timer.stop();
      generator = null;
    }
    pipes.callAll('stop');
  }

  function pause() {
    if (generator) {
      generator.timer.pause();
    }
  }

  function resume() {
    if (generator) {
      generator.timer.resume();
    }
  }


  // exports 
  return {
    pipes: pipes,
    start: start,
    stop: stop,
    pause: pause,
    resume: resume
  };
};