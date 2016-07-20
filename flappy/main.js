var mainState = {
  preload: function() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
  },
  
  create: function() {
    this.score = 0;

    var bird = this.bird = game.add.sprite(100, 245, 'bird');
    var pipes = this.pipes = game.add.group();
    this.labelScore = game.add.text(20, 20, "0",
      { font: "30px Arial", fill: "#ffffff" });
    
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(bird);
    
    bird.body.gravity.y = 1000;
    // only if we want the bird to hit top and bottom
    // bird.body.collideWorldBounds = true;
    
    spaceKey = game.input.keyboard.addKey(
      Phaser.Keyboard.SPACEBAR);
      
    spaceKey.onDown.add(this.jump, this);
    
    game.input.onTap.add(this.jump, this);

    // gamepad support
    game.input.gamepad.start();
    this.pad = game.input.gamepad.pad1;
    this.pad.addCallbacks(this, { onConnect: mapGamepadButtons });
    
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  },
  
  mapGamepadButtons: function() {
    var buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A);
    buttonA.onDown.add(this.jump, this);
  },

  update: function() {
    // if we want the bird to "visibly" hit the pipes
    // game.physics.arcade.collide(this.bird, this.pipes);
    
    game.physics.arcade.overlap(
      this.bird, this.pipes, this.restartGame, null, this);

    if(this.bird.y < 0 || this.bird.y > 490) {
      this.restartGame();
    }
  },
  
  jump: function() {
    this.bird.body.velocity.y = -350;
  },
  
  restartGame: function() {
    game.state.start('main');
  },
  
  addOnePipe: function(x, y) {
    var pipe = game.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);
    game.physics.arcade.enable(pipe);
    
    // velocity to make pipe move left
    pipe.body.velocity.x = -200;
    
    // auto kill pipe when no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },
  
  addRowOfPipes: function() {
    this.score += 1;
    this.labelScore.text = this.score;
    
    var hole = Math.floor(Math.random() * 5) + 1;
    
    for (var i=0; i<8; i++) {
      if (i != hole && i != hole + 1) {
        this.addOnePipe(400, i * 60 + 10);
      }
    }
  }
};

var game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');