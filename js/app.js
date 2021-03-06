var BOARD_HEIGHT = 600;
var BOARD_WIDTH = 505;
var HORIZONTAL_MOVE = 100;
var VERTICAL_MOVE = 83;

// Enemy class with location.//
var Enemy = function (beginX, beginY, speed) {
   this.x = beginX;
   this.y = beginY;
   this.sprite = 'images/enemy-bug.png';
};

//Sets random speed for enemy bugs on canvas and off//
Enemy.prototype.update = function(dt) {
    if (this.x < BOARD_WIDTH) {
        this.x = this.x + (this.speed * dt);
    }
    else {
        this.x = -10;
        this.speed = Math.floor(Math.random()*(300-80)) + 110;
    }
};
// Draw bugs on canvas//
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class with image location. //
// Updated the engine.js to use image//

var Player = function (x,y) {
    this.sprite = "images/char-boy.png";
    this.reset();  
};

//Princess class with image location.//
// Updated engine.js to use image.//
var Princess = function (x,y) {
    this.sprite = "images/char-princess-girl.png";
    this.reset;
};
 //Draw player on canvas.//
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check to see if collision conditions occur. Calculate distance between images.//
//Reset player to original coordinates when collision with bugs occurs. //
//Move player and star offscreen and place princess when player reaches star.//

Player.prototype.collision = function() {
for(var i = 0; i < allEnemies.length; i++) {
    if (this.x < allEnemies[i].x + 50 &&
    this.x + 50 > allEnemies[i].x &&
    this.y < allEnemies[i].y + 50 &&
    this.y + 50 > allEnemies[i].y) {
        this.x = 10;
        this.y = 400;

    }
    if (this.x > star.x && this.y < star.y) { //collide with star
        star.x = 700;
        star.y = 700;
        this.x = 700;
        this.y = 700;
        princess.x = 400;
        princess.y = 5;
        setTimeout (function () {
        reset ();
       }, 2000);
    }
 }
};

Player.prototype.reset = function() {
    this.x = 5;
    this.y = 400;
};

//update player prototype and invoke function to check for collision//
Player.prototype.update = function() {
    this.collision();

};
//Star class with location.
 var Star = function (x,y) {
    this.reset();
    this.sprite = "images/star.png";
};

Star.prototype.reset = function () {
    this.x = 400;
    this.y = 5;
};

//Draw star on canvas.//
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

 //Draw princess on canvas.//
Princess.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
  //prototype update for princess.//
Princess.prototype.update = function () {
};

Princess.prototype.reset = function() {
    this.x = 900;
    this.y = 900;
};

//function for keyboard input and setting the canvas boundaries//
Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left": 
           if(this.x - HORIZONTAL_MOVE > 0) { 
                this.x = this.x - HORIZONTAL_MOVE;
            }
            break;
        case "right": 
            if (this.x + HORIZONTAL_MOVE < BOARD_WIDTH) {
               this.x = this.x + HORIZONTAL_MOVE;
            }
            break;
        case "up": 
             if (this.y - VERTICAL_MOVE > -100) { //allows for space above head
                this.y = this.y - VERTICAL_MOVE;
             }
            break;
        case "down":
            if (this.y + VERTICAL_MOVE < BOARD_HEIGHT) { 
               this.y = this.y + VERTICAL_MOVE;
            }
            break;
    }
    if(this.x < 0) {
        this.x = 0;
    }
    else if (this.x + 100 >= BOARD_WIDTH) {
        this.x = BOARD_WIDTH-100;
    }

    if (this.y < 0) {
        this.y = 0;
    }
    else if (this.y + 200 >= BOARD_HEIGHT) {
        this.y = BOARD_HEIGHT - 200;
    }
};
// Instantiate objects and set array for enemy bugs//
var player = new Player();
var star = new Star ();
var princess = new Princess ();
var allEnemies = [];
for (var i = 0; i < 3; i++){
    allEnemies.push(new Enemy(-40, 60 + (83*i)));
}
//Reset positions for new game after setTimeout on collision.//
var reset = function () {
    player.reset();
    star.reset();
    princess.reset();

        
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
