namespace('flappy.graphics');


flappy.graphics.Button = (function() {
  
  function Button(game, x, y, label, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    this.anchor.setTo( 0.5, 0.5 );
    this.label = new Phaser.Text(game, 0, 0, label, { font: '16px Arial', fill: '#ffffff' });
    this.label.anchor.setTo( 0.5, 0.4 );
    this.addChild(this.label);    
    // this.setLabel( label );
  }
  Button.prototype = Object.create(Phaser.Button.prototype);
  Button.prototype.constructor = Button;


  // exports 
  return Button;
})();