var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var greentrees;
var cloudsky;
var mountaintops;
var collectablecoins;
var watercanyons;
var clouds;
var sun;
var sunRays;
var badGuys;
var mountains;
var jumpSound;
var canyonSound;
var youWonSound;
var badguyDeath;
var canyonDeath;
var congratsSound;
var gamePlayMusic;
var coinSound;
var gameoverSound;

var whats_the_score;
var flagpole;
var plateformLevels
var how_many_lives;


function preload() {
  soundFormats('mp3');

  // Load the sound for the game
  jumpSound = loadSound('asset/jumpsounds.mp3');
  jumpSound.setVolume(0.3);
  // Killed by badguy bite
  badguyDeath = loadSound('asset/badguybite.mp3');
  badguyDeath.setVolume(0.2);
  // Killed by Canyon
  canyonDeath = loadSound('asset/canyondeath.mp3');
  canyonDeath.setVolume(0.1);
  // Won level
  youWonSound = loadSound('asset/congrats.mp3');
  youWonSound.setVolume(0.2);
  // GameOver level
  gameoverSound = loadSound('asset/gameover.mp3');
  gameoverSound.setVolume(0.2);
  // Music during game play gamePlayMusic = loadSound('asset/music.mp3');
  gamePlayMusic = loadSound('asset/gameplaymusic.mp3');
  gamePlayMusic.setVolume(0.1);
  // Coin sound
  coinSound = loadSound('asset/coinsound.mp3');
  coinSound.setVolume(0.3);

 }

function setup() {

  createCanvas(1024, 576);
  floorPos_y = height * 3 / 4;
  how_many_lives = 3;
  startGame();
}



  function startGame() {

    whats_the_score = 0;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;


    // Variable to control the background scrolling.
    scrollPos = 3500;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;

    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    // Initialise arrays of scenery objects

    clouds = {

      points: [],

      setup: function () {

        for (var i = 0; i < 70; i++) {

          var v = createVector(0, 0);
          v.x = random(-3900, 4000);
          v.y = random(50, 200);

          this.points.push(v);

        }
      },

      draw: function () {
        //console.log("draw")

        fill(255);

        for (var i = 0; i < this.points.length; i++) {

          ellipse (this.points[i].x + 65,
            this.points[i].y,
            120, 30)
          ellipse(this.points[i].x,
            this.points[i].y,
            100, 50)
            ellipse(this.points[i].x + 35,
              this.points[i].y,
              120, 30)
            ellipse (this.points[i].x + 65,
              this.points[i].y,
              120, 30)
        }
      }
    }
    clouds.setup();

    sunRays = {
      points: [],

      size: 500,

      setup: function () {

        var incr = PI * 2 / 36;
        console.log(incr);

        for (var i = 0; i < 23; i++) {
          var v = createVector(0, 3);
          var a = incr * i;
          v.rotate(a);
          this.points.push(v);
        }
      },

      draw: function () {
        fill(250, 250, 210);

        beginShape();

        for (var i = 0; i < this.points.length; i++) {

          var v = p5.Vector.mult(this.points[i], this.size);

          v.x = 300 * sin(i) + 0,
            v.y = 300 * cos(i) + 15

          vertex(
            v.x,
            v.y
          )
        }
        endShape();
      },

      grow: function () {
            this.size *= random(1, 1.005);
            this.size = min(400, this.size);
          },
          shrink: function () {
            this.size *= random(5, 0.9995);
            this.size = max(60, this.size);
          }
    }
    sunRays.setup();

    sun = {

      points: [],

      size: 240,

      setup: function () {

        var incr = PI * 2 / 36;
        console.log(incr);

        for (var i = 0; i < 36; i++) {
          var o = createVector(.3, random(0.98, 1));
          var w = incr * i;
          o.rotate(w);
          this.points.push(o);
        }
      },


      draw: function (eyeDirection) {

        fill(255, 140, 0);
        beginShape();

        for (var i = 0; i < this.points.length; i++) {

          //translate(p5.Vector.fromAngle(this.point[i]millis() / 1000, 40));
          var v = p5.Vector.mult(this.points[i], this.size);

          vertex(
            v.x,
            v.y
          )
        }
        endShape();

        fill(255);

        ellipse(this.size * 0.39, 60, this.size * 0.5);
        ellipse(-this.size * 0.39, 60, this.size * 0.5);

        fill(0);

        var p = eyeDirection;
        p.mult(this.size * 0.08);

        ellipse(this.size * 0.39 + p.x, p.y + 55, this.size * 0.25);
        ellipse(-this.size * 0.39 + p.x, p.y + 55, this.size * 0.25);
      },
    }
    sun.setup();

    mountaintops = [
      {pos_x: -2000, pos_y: 432},
      {pos_x: 300, pos_y: 432},
      {pos_x: 450, pos_y: 432},
      {pos_x: 900, pos_y: 432},

      {pos_x: 1000, pos_y: 432},
      {pos_x: 1000, pos_y: 432},
      {pos_x: 1400, pos_y: 432},
    ];

    watercanyons = [
      {pos_x: 3000, width: 150},
      {pos_x: 2400, width: 150},
      {pos_x: 2100, width: 150},
      {pos_x: 1376, width: 150},
      {pos_x: 1000, width: 150},
      {pos_x: 600, width: 150},
      {pos_x: -500, width: 150},
    ];

    collectablecoins = [
      {pos_x: -3050, pos_y: 413, isFound: false},
      {pos_x: -2750, pos_y: 413, isFound: false},
      {pos_x: -2650, pos_y: 413, isFound: false},
      {pos_x: -2450, pos_y: 413, isFound: false},
      {pos_x: -2250, pos_y: 413, isFound: false},
      {pos_x: -1300, pos_y: 413, isFound: false},

      {pos_x: -1100, pos_y: 313, isFound: false},
      {pos_x: -1100, pos_y: 213, isFound: false},

      {pos_x: -1200, pos_y: 313, isFound: false},
      {pos_x: -1200, pos_y: 213, isFound: false},

      {pos_x: -1300, pos_y: 313, isFound: false},
      {pos_x: -1300, pos_y: 213, isFound: false},

      {pos_x: -1400, pos_y: 313, isFound: false},
      {pos_x: -1400, pos_y: 213, isFound: false},

      {pos_x: -1500, pos_y: 313, isFound: false},
      {pos_x: -1500, pos_y: 213, isFound: false},

      {pos_x: -1500, pos_y: 413, isFound: false},
      {pos_x: -1650, pos_y: 413, isFound: false},
      {pos_x: -600, pos_y: 413, isFound: false},

      {pos_x: 100, pos_y: 280, isFound: false},
      {pos_x: 120, pos_y: 280, isFound: false},
      {pos_x: 140, pos_y: 280, isFound: false},

      {pos_x: 300, pos_y: 280, isFound: false},
      {pos_x: 320, pos_y: 280, isFound: false},
      {pos_x: 340, pos_y: 280, isFound: false},

      {pos_x: 100, pos_y: 180, isFound: false},
      {pos_x: 120, pos_y: 180, isFound: false},
      {pos_x: 140, pos_y: 180, isFound: false},

      {pos_x: 300, pos_y: 180, isFound: false},
      {pos_x: 320, pos_y: 180, isFound: false},
      {pos_x: 340, pos_y: 180, isFound: false},

      {pos_x: 220, pos_y: 120, isFound: false},
      {pos_x: 220, pos_y: 100, isFound: false},
      {pos_x: 220, pos_y: 80, isFound: false},
      // ---------------------------------------

      {pos_x: 775, pos_y: 280, isFound: false},
      {pos_x: 785, pos_y: 280, isFound: false},
      {pos_x: 795, pos_y: 280, isFound: false},

      {pos_x: 975, pos_y: 280, isFound: false},
      {pos_x: 985, pos_y: 280, isFound: false},
      {pos_x: 995, pos_y: 280, isFound: false},

      {pos_x: 775, pos_y: 180, isFound: false},
      {pos_x: 785, pos_y: 180, isFound: false},
      {pos_x: 795, pos_y: 180, isFound: false},

      {pos_x: 975, pos_y: 180, isFound: false},
      {pos_x: 985, pos_y: 180, isFound: false},
      {pos_x: 995, pos_y: 180, isFound: false},

      {pos_x: 900, pos_y: 120, isFound: false},
      {pos_x: 900, pos_y: 100, isFound: false},
      {pos_x: 900, pos_y: 80, isFound: false},
      //-------------------------------------

      {pos_x: 1100, pos_y: 140, isFound: false},
      {pos_x: 1110, pos_y: 150, isFound: false},
      {pos_x: 1120, pos_y: 160, isFound: false},

      {pos_x: 1160, pos_y: 200, isFound: false},
      {pos_x: 1180, pos_y: 210, isFound: false},
      {pos_x: 1200, pos_y: 220, isFound: false},

      {pos_x: 1240, pos_y: 260, isFound: false},
      {pos_x: 1260, pos_y: 270, isFound: false},
      {pos_x: 1280, pos_y: 280, isFound: false},

      {pos_x: 1240, pos_y: 380, isFound: false},
      {pos_x: 1260, pos_y: 390, isFound: false},
      {pos_x: 1280, pos_y: 400, isFound: false},
      // ------------------------------------------

      {pos_x: 1700, pos_y: 180, isFound: false},
      {pos_x: 1750, pos_y: 180, isFound: false},
      {pos_x: 1800, pos_y: 180, isFound: false},
      {pos_x: 1850, pos_y: 180, isFound: false},
      {pos_x: 1900, pos_y: 180, isFound: false},
      {pos_x: 1950, pos_y: 180, isFound: false},
      {pos_x: 2000, pos_y: 180, isFound: false},
      {pos_x: 2050, pos_y: 180, isFound: false},

      {pos_x: 1700, pos_y: 110, isFound: false},
      {pos_x: 1750, pos_y: 110, isFound: false},
      {pos_x: 1800, pos_y: 110, isFound: false},
      {pos_x: 1850, pos_y: 110, isFound: false},
      {pos_x: 1900, pos_y: 110, isFound: false},
      {pos_x: 1950, pos_y: 110, isFound: false},
      {pos_x: 2000, pos_y: 110, isFound: false},
      {pos_x: 2050, pos_y: 110, isFound: false},
      // ----------------------------------------

      {pos_x: 2600, pos_y: 100, isFound: false},
      {pos_x: 2650, pos_y: 100, isFound: false},
      {pos_x: 2700, pos_y: 100, isFound: false},
      {pos_x: 2750, pos_y: 100, isFound: false},
      {pos_x: 2800, pos_y: 100, isFound: false},
      {pos_x: 2850, pos_y: 100, isFound: false},
      {pos_x: 2900, pos_y: 100, isFound: false},
      {pos_x: 2950, pos_y: 100, isFound: false},

      {pos_x: 2600, pos_y: 200, isFound: false},
      {pos_x: 2650, pos_y: 200, isFound: false},
      {pos_x: 2700, pos_y: 200, isFound: false},
      {pos_x: 2750, pos_y: 200, isFound: false},
      {pos_x: 2800, pos_y: 200, isFound: false},
      {pos_x: 2850, pos_y: 200, isFound: false},
      {pos_x: 2900, pos_y: 200, isFound: false},
      {pos_x: 2950, pos_y: 200, isFound: false},

      {pos_x: 2600, pos_y: 150, isFound: false},
      {pos_x: 2650, pos_y: 150, isFound: false},
      {pos_x: 2700, pos_y: 150, isFound: false},
      {pos_x: 2750, pos_y: 150, isFound: false},
      {pos_x: 2800, pos_y: 150, isFound: false},
      {pos_x: 2850, pos_y: 150, isFound: false},
      {pos_x: 2900, pos_y: 150, isFound: false},
      {pos_x: 2950, pos_y: 150, isFound: false},

    ];

    greentrees = [
       -3050, -250, 50, 220, 500, 1000, 1500, 2000, 2500,
    ];

    // Boolean start & Position of the Flag
    flagpole = {isReached: false, x_pos: 3500};

    plateformLevels = [];
    plateformLevels.push(new createPlateformsLevels(-1000, floorPos_y - 130, 300));
    plateformLevels.push(new createPlateformsLevels(-2500, floorPos_y - 130, 300));
    plateformLevels.push(new createPlateformsLevels(-2000, floorPos_y - 200, 300));
    plateformLevels.push(new createPlateformsLevels(60, floorPos_y - 130, 300));
    plateformLevels.push(new createPlateformsLevels(730, floorPos_y - 130, 280));
    plateformLevels.push(new createPlateformsLevels(1650, floorPos_y - 130, 400));
    plateformLevels.push(new createPlateformsLevels(2600, floorPos_y - 130, 400));




    badGuys = [];
    badGuys.push(new badGuy(300,
      floorPos_y - 5, 300));
    badGuys.push(new badGuy(-350,
                            floorPos_y - 5, 300));
    badGuys.push(new badGuy(-2300,
                              floorPos_y -5, 400));
    badGuys.push(new badGuy(-2000,
      floorPos_y -5, 400));
    badGuys.push(new badGuy(-1000,
      floorPos_y -5, 300));
    badGuys.push(new badGuy(775,
      floorPos_y -5, 200));
    badGuys.push(new badGuy(1700,
      floorPos_y -135, 300));
    badGuys.push(new badGuy(2600,
      floorPos_y -305, 400));
    badGuys.push(new badGuy(3200,
      floorPos_y -5, 300));
  }

  function draw() {

    background(100, 155, 255); // fill the sky blue

    noStroke();
    fill(0, 100,   0);
    rect(0, floorPos_y, width, height / 4); // draw some green ground

    push();

    translate(scrollPos, 0);

    drawMountain();

    clouds.draw();

    //Eyes for the sun
    var v = createVector(mouseX - width / 2, mouseY - height / 2);
    v.normalize();
    // Draw Sun

    sunRays.draw();

    sun.draw(v);

    drawTrees();

    // Draw Plateform Levels
    for (var i = 0; i < plateformLevels.length; i++)
    {
      plateformLevels[i].draw();
    }

    // Draw Canyons
    for (var i = 0; i < watercanyons.length; i++) {
      drawCanyon(watercanyons[i]);
      checkCanyon(watercanyons[i]);
    }

    // Draw Collectable items
    for (var i = 0; i < collectablecoins.length; i++) {
      if (!collectablecoins[i].isFound) {
        drawCollectable(collectablecoins[i]);
        checkCollectable(collectablecoins[i]);
      }
    }

    renderFlagpole();

    checkPlayerDie();

    for (var i = 0; i < badGuys.length; i++)
    {
      badGuys[i].draw();

      var isContact =
        badGuys[i].checkContact(gameChar_world_x, gameChar_y);

      if (isContact)
      {
        if(how_many_lives > 0)
        {
          how_many_lives -= 1;
          startGame();
          break;
        }
      }
    }
    pop();

    // Draw Game Character
    drawGameChar();

    fill(0, 100,   0);
    noStroke();
    textSize(30)
    text(" $$$: " + whats_the_score, 850, 50);
    fill(0);
    text(" You have " + how_many_lives + " Lives ", 50, 50);

    if (how_many_lives == 0) {
      gameoverSound.play();
      fill(255, 0, 0);
      noStroke();
      textSize(120);
      text(" Game Over ", 200, height / 2);
      fill(75,   0, 130);
      noStroke();
      textSize(30);
      text(" Refresh To Play Again ", 380, 150);
      stroke();

    }

    // Lives Token
    for (var i = 0; i < how_many_lives; i++) {

      fill( 139,   0,   0);
      noStroke();
      if (how_many_lives == 3) {
        stroke(300);
        ellipse(120, 75, 40, 40);
        ellipse(170, 75, 40, 40);
        ellipse(220, 75, 40, 40);
        noStroke();
      }
      if (how_many_lives == 2) {
        stroke(300);
        ellipse(120, 75, 40, 40);
        ellipse(170, 75, 40, 40);
        noStroke();
      }
      if (how_many_lives == 1) {
        stroke(300);
        ellipse(120, 75, 40, 40);
        noStroke();
      } else if (flagpole.isReached) {
        youWonSound.play();
        fill(255, 0, 0);
        textSize(80);
        text(" LEVEL COMPLETE ", 170, height / 2);
        stroke();
        // Code to end the Level when Complete
      }
    }
    if (isLeft) {

      if (gameChar_x > width * 0.2) {
        gameChar_x -= 5;
      } else {
        scrollPos += 5;
      }
    }

    if (isRight) {
      if (gameChar_x < width * 0.8) {
        gameChar_x += 5;
      } else {
        scrollPos -= 5; // negative for moving against the background
      }
    }
    // Logic to make the game character rise and fall

    if (gameChar_y < floorPos_y) {
      var isContact = false;
      for (var i = 0; i < plateformLevels.length; i++) {

        if (plateformLevels[i].checkContact(gameChar_world_x, gameChar_y) == true) {

          isContact = true;
          break;
        }
      }

        if (isContact == false) {
          gameChar_y += 2;
          isFalling = true;

        }
      }
    else
      {
        isFalling = false;
      }



      if (isPlummeting == true) {
        gameChar_y += 5;
      }


      if (flagpole.isReached == false) {
        checkFlagpole();
      }



    gameChar_world_x = gameChar_x - scrollPos;
  }

  // ---------------------
  // Key control functions
  // ---------------------


  function keyPressed() {
    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode); // Need to write a conditional
                                           // to check if the key is
    if (keyCode == 37) {

      console.log(" Left arrow ");
      isLeft = true;


    } else if (keyCode == 39) {

      console.log(" right arrow");
      isRight = true;

    }

    if (keyCode == 32) {

      if (!isFalling) {
        gameChar_y -= 180;
        jumpSound.play();
      }
    }
  }

  function keyReleased() {

    if (keyCode == 37) {
      console.log(" Left arrow ");
      isLeft = false;

    } else if (keyCode == 39) {

      console.log(" right arrow");
      isRight = false;
    }
    if (keyCode == 32) {

      console.log("spacebar");
      isFalling = false;
    }
  }

  function mouseDragged() {

  }

// ------------------------------
// Game character render function
// ------------------------------

  // Function to draw the game character.
  function drawGameChar() {

    if (isLeft && isFalling) {
      // add your jumping-left code

      //Right Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x + 11, gameChar_y - 23, 22, 15);
      // Right Bottom
      //fill(25,  25, 112);
      ellipse(gameChar_x + 23, gameChar_y - 20, 17, 10);

      // Top Right Shoe
      fill(255, 215,   0);
      rect(gameChar_x + 28, gameChar_y - 23, 5, 10);
      // Bottom Right Shoe
      fill(255, 165,   0);
      rect(gameChar_x + 32,gameChar_y - 28, 13, 17, 5);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x - 11, gameChar_y - 23, 22, 15);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x - 23, gameChar_y - 20, 17, 10);

      // Top Left Shoe
      fill(255, 215,   0);
      rect(gameChar_x - 33, gameChar_y - 23, 5, 10);
      // Bottom Left Shoe
      fill(255, 165,   0);
      rect(gameChar_x - 46, gameChar_y - 28, 15, 17, 5);

      // Back of Collar
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 20, 5);

      fill(102,51,0);
      // Neck
      rect(gameChar_x - 5, gameChar_y - 65, 10, 15);

      // Body Color
      fill(255, 215,   0);
      //Left Peck
      rect(gameChar_x - 14,gameChar_y - 60, 15, 21, 5);
      // Right Peck
      rect(gameChar_x + 1,gameChar_y - 60, 15, 21, 5);

      // Ab's
      fill(255, 215,   0);
      rect(gameChar_x - 10,gameChar_y - 45, 18, 21, 5);

      //Left Shoulder
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 50, 15, 15);
      // Left Bicep
      fill(102,51,0);
      ellipse(gameChar_x - 17, gameChar_y - 63, 13, 20);
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 75, 8, 8);

      //Right Shoulder
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 50, 15, 15);
      // Right Bicep
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 43, 13, 20);
      // Right Arm End
      triangle(gameChar_x + 14, gameChar_y - 32, gameChar_x + 10, gameChar_y - 40, gameChar_x + 5, gameChar_y - 30)
      fill(102,51,0);
      ellipse(gameChar_x + 7, gameChar_y - 32, 7, 7);

      // The Afro
      fill(0);
      ellipse(gameChar_x, gameChar_y - 90, 30, 30);
      //The Head
      fill(102,51,0);
      ellipse(gameChar_x , gameChar_y - 75, 20, 25);
      // HeadLine
      fill(0);
      rect(gameChar_x - 10, gameChar_y - 92, 20, 5);

      // The Headband
      fill(112, 128, 144);
      rect(gameChar_x - 10, gameChar_y - 85, 20, 5);

    } else if (isRight && isFalling) {

      // add your jumping-right code

      //Right Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x + 11, gameChar_y - 23, 22, 15);
      // Right Bottom
      //fill(25,  25, 112);
      ellipse(gameChar_x + 23, gameChar_y - 20, 17, 10);

      // Top Right Shoe
      fill(255, 215,   0);
      rect(gameChar_x + 28, gameChar_y - 23, 5, 10);
      // Bottom Right Shoe
      fill(255, 165,   0);
      rect(gameChar_x + 32,gameChar_y - 28, 13, 17, 5);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x - 11, gameChar_y - 23, 22, 15);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x - 23, gameChar_y - 20, 17, 10);

      // Top Left Shoe
      fill(255, 215,   0);
      rect(gameChar_x - 33, gameChar_y - 23, 5, 10);
      // Bottom Left Shoe
      fill(255, 165,   0);
      rect(gameChar_x - 46, gameChar_y - 28, 15, 17, 5);

      // Back of Collar
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 20, 5);

      fill(102,51,0);
      // Neck
      rect(gameChar_x - 5, gameChar_y - 65, 10, 15);

      // Body Color
      fill(255, 215,   0);
      //Left Peck
      rect(gameChar_x - 14,gameChar_y - 60, 15, 21, 5);
      // Right Peck
      rect(gameChar_x + 1,gameChar_y - 60, 15, 21, 5);

      // Ab's
      fill(255, 215,   0);
      rect(gameChar_x - 10,gameChar_y - 45, 18, 21, 5);

      //Left Shoulder
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 50, 15, 15);
      // Left Bicep
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 43, 13, 20);
      // Left Arm End
      triangle(gameChar_x - 15 , gameChar_y - 32, gameChar_x - 10, gameChar_y - 40, gameChar_x - 5, gameChar_y - 30);
      // Left Hand
      fill(102,51,0);
      ellipse(gameChar_x - 7, gameChar_y - 32, 7, 7);

      //Right Shoulder
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 50, 15, 15);
      // Right Bicep
      fill(102,51,0);
      ellipse(gameChar_x + 20, gameChar_y - 60, 13, 20);
      // Right Arm End
      triangle(gameChar_x + 23, gameChar_y - 65, gameChar_x + 20, gameChar_y - 75, gameChar_x + 15, gameChar_y - 65)
      fill(102,51,0);
      ellipse(gameChar_x + 19, gameChar_y - 71, 8, 8);

      // The Afro
      fill(0);
      ellipse(gameChar_x, gameChar_y - 90, 30, 30);
      //The Head
      fill(102,51,0);
      ellipse(gameChar_x , gameChar_y - 75, 20, 25);
      // HeadLine
      fill(0);
      rect(gameChar_x - 10, gameChar_y - 92, 20, 5);

      // The Headband
      fill(112, 128, 144);
      rect(gameChar_x - 10, gameChar_y - 85, 20, 5);

    } else if (isLeft) {
      // add your walking left code

      fill(102,51,0);
      // Neck
      rect(gameChar_x - 5, gameChar_y - 65, 10, 15);

      // Body Color
      fill(255, 215,   0);
      //Left Peck
      rect(gameChar_x - 12,gameChar_y - 60, 15, 21, 5);
      // Right Peck
      rect(gameChar_x - 3,gameChar_y - 60, 15, 21, 5);

      // Ab's
      fill(255, 215,   0);
      rect(gameChar_x - 10,gameChar_y - 45, 18, 21, 5);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x - 11, gameChar_y - 23, 22, 15);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x - 23, gameChar_y - 20, 17, 10);

      // Top Left Shoe
      fill(255, 215,   0);
      rect(gameChar_x - 33, gameChar_y - 23, 5, 10);
      // Bottom Left Shoe
      fill(255, 165,   0);
      rect(gameChar_x - 46, gameChar_y - 28, 15, 17, 5);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x + 2, gameChar_y - 23, 20, 15);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x + 7, gameChar_y - 13, 13, 20);
      fill(25,  25, 112);
      ellipse(gameChar_x + 11, gameChar_y - 9, 13, 20);

      // Top Right Shoe
      fill(255, 215,   0);
      rect(gameChar_x + 17, gameChar_y - 10, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x + 16, gameChar_y - 8, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x + 15, gameChar_y - 6, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x + 14, gameChar_y - 4, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x + 13, gameChar_y - 2, 5, 5);
      // // Bottom Right Shoe
      fill(255, 165,   0);
      quad(gameChar_x + 22, gameChar_y - 8,gameChar_x + 15, gameChar_y + 6, gameChar_x + 25, gameChar_y + 11, gameChar_x + 31, gameChar_y, 5);
      ellipse(gameChar_x + 23, gameChar_y + 7, 8, 8);
      ellipse(gameChar_x + 29, gameChar_y + 1, 5, 5);

      //Right Shoulder
      fill(102,51,0);
      ellipse(gameChar_x, gameChar_y - 50, 15, 15);
      // Right Bicep
      fill(102,51,0);
      ellipse(gameChar_x, gameChar_y - 43, 13, 20);
      // Right Arm End
      fill(102,51,0);
      ellipse(gameChar_x - 5, gameChar_y - 32, 8, 8);

      // The Afro
      fill(0);
      ellipse(gameChar_x, gameChar_y - 90, 30, 30);
      //The Head
      fill(102,51,0);
      ellipse(gameChar_x , gameChar_y - 75, 20, 25);
      // Back of Collar
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 20, 5);
      // HeadLine
      fill(0);
      rect(gameChar_x - 10, gameChar_y - 92, 20, 5);

      // The Headband
      fill(112, 128, 144);
      rect(gameChar_x - 10, gameChar_y - 85, 20, 5);

    } else if (isRight) {
      // add your walking right code
      //Right Leg

      fill(102,51,0);
      // Neck
      rect(gameChar_x - 5, gameChar_y - 65, 10, 15);

      // Body Color
      fill(255, 215,   0);
      //Left Peck
      rect(gameChar_x - 14,gameChar_y - 60, 15, 21, 5);
      // Right Peck
      rect(gameChar_x - 5,gameChar_y - 60, 15, 21, 5);

      // Back of Collar
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 18, 5);

      // Ab's
      fill(255, 215,   0);
      rect(gameChar_x - 10,gameChar_y - 45, 18, 21, 5);

      //Right Leg
      //Right Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x + 11, gameChar_y - 23, 22, 15);
      // Right Bottom
      //fill(25,  25, 112);
      ellipse(gameChar_x + 23, gameChar_y - 20, 17, 10);

      // Top Right Shoe
      fill(255, 215,   0);
      rect(gameChar_x + 28, gameChar_y - 23, 5, 10);
      // Bottom Right Shoe
      fill(255, 165,   0);
      rect(gameChar_x + 32,gameChar_y - 28, 13, 17, 5);

      //Left Shoulder
      fill(102,51,0);
      ellipse(gameChar_x - 5, gameChar_y - 50, 15, 15);
      // Left Bicep
      fill(102,51,0);
      ellipse(gameChar_x - 5, gameChar_y - 43, 13, 20);
      // Left Arm End
      triangle(gameChar_x - 5 , gameChar_y - 32, gameChar_x, gameChar_y - 40, gameChar_x, gameChar_y - 30);
      // Left Hand
      fill(102,51,0);
      ellipse(gameChar_x + 3, gameChar_y - 32, 7, 7);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x - 2, gameChar_y - 23, 20, 15);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x - 7, gameChar_y - 13, 13, 20);
      fill(25,  25, 112);
      ellipse(gameChar_x - 11, gameChar_y - 9, 13, 20);

      // Top Left Shoe
      fill(255, 215,   0);
      rect(gameChar_x - 22, gameChar_y - 8, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x - 21, gameChar_y - 6, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x - 20, gameChar_y - 4, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x - 19, gameChar_y - 2, 5, 5);
      fill(255, 215,   0);
      rect(gameChar_x - 18, gameChar_y, 5, 5);
      // // Bottom Left Shoe
      fill(255, 165,   0);
      quad(gameChar_x - 22, gameChar_y - 8,gameChar_x - 15, gameChar_y + 6, gameChar_x - 25, gameChar_y + 11, gameChar_x - 31, gameChar_y, 5);
      ellipse(gameChar_x - 23, gameChar_y + 7, 8, 8);
      ellipse(gameChar_x - 29, gameChar_y + 1, 5, 5);

      // The Afro
      fill(0);
      ellipse(gameChar_x, gameChar_y - 90, 30, 30);
      //The Head
      fill(102,51,0);
      ellipse(gameChar_x , gameChar_y - 75, 20, 25);
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 18, 5);
      // HeadLine
      fill(0);
      rect(gameChar_x - 10, gameChar_y - 92, 20, 5);

      // The Headband
      fill(112, 128, 144);
      rect(gameChar_x - 10, gameChar_y - 85, 20, 5);

    } else if (isFalling || isPlummeting) {

      // add your jumping facing forwards code
      //Right Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x + 11, gameChar_y - 23, 22, 15);
      // Right Bottom
      //fill(25,  25, 112);
      ellipse(gameChar_x + 23, gameChar_y - 20, 17, 10);

      // Top Right Shoe
      fill(255, 215,   0);
      rect(gameChar_x + 28, gameChar_y - 23, 5, 10);
      // Bottom Right Shoe
      fill(255, 165,   0);
      rect(gameChar_x + 32,gameChar_y - 28, 13, 17, 5);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x - 11, gameChar_y - 23, 22, 15);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x - 23, gameChar_y - 20, 17, 10);

      // Top Left Shoe
      fill(255, 215,   0);
      rect(gameChar_x - 33, gameChar_y - 23, 5, 10);
      // Bottom Left Shoe
      fill(255, 165,   0);
      rect(gameChar_x - 46, gameChar_y - 28, 15, 17, 5);

      // Back of Collar
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 20, 5);

      fill(102,51,0);
      // Neck
      rect(gameChar_x - 5, gameChar_y - 65, 10, 15);

      // Body Color
      fill(255, 215,   0);
      //Left Peck
      rect(gameChar_x - 14,gameChar_y - 60, 15, 21, 5);
      // Right Peck
      rect(gameChar_x + 1,gameChar_y - 60, 15, 21, 5);

      // Ab's
      fill(255, 215,   0);
      rect(gameChar_x - 10,gameChar_y - 45, 18, 21, 5);

      //Left Shoulder
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 50, 15, 15);
      // Left Bicep
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 43, 13, 20);
      // Left Arm End
      triangle(gameChar_x - 15 , gameChar_y - 32, gameChar_x - 10, gameChar_y - 40, gameChar_x - 5, gameChar_y - 30);
      // Left Hand
      fill(102,51,0);
      ellipse(gameChar_x - 7, gameChar_y - 32, 7, 7);

      //Right Shoulder
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 50, 15, 15);
      // Right Bicep
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 43, 13, 20);
      // Right Arm End
      triangle(gameChar_x + 14, gameChar_y - 32, gameChar_x + 10, gameChar_y - 40, gameChar_x + 5, gameChar_y - 30)
      fill(102,51,0);
      ellipse(gameChar_x + 7, gameChar_y - 32, 7, 7);

      // The Afro
      fill(0);
      ellipse(gameChar_x, gameChar_y - 90, 30, 30);
      //The Head
      fill(102,51,0);
      ellipse(gameChar_x , gameChar_y - 75, 20, 25);
      // HeadLine
      fill(0);
      rect(gameChar_x - 10, gameChar_y - 92, 20, 5);

      // The Headband
      fill(112, 128, 144);
      rect(gameChar_x - 10, gameChar_y - 85, 20, 5);

    } else {
      // add your standing front facing code

      //Right Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x + 7, gameChar_y - 23, 13, 20);
      // Right Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x + 7, gameChar_y - 13, 13, 20);

      // Top Right Shoe
      fill(255, 215,   0);
      rect(gameChar_x + 2, gameChar_y - 10, 10, 5);
      // Bottom Right Shoe
      fill(255, 165,   0);
      rect(gameChar_x + 1,gameChar_y - 8, 15, 13, 5);

      //Left Thigh
      fill(25,  25, 112);
      ellipse(gameChar_x - 7, gameChar_y - 23, 13, 20);
      // Left Bottom
      fill(25,  25, 112);
      ellipse(gameChar_x - 9, gameChar_y - 13, 13, 20);

      // Top Left Shoe
      fill(255, 215,   0);
      rect(gameChar_x - 15, gameChar_y - 10, 10, 5);
      // Bottom Left Shoe
      fill(255, 165,   0);
      rect(gameChar_x - 19, gameChar_y - 8, 15, 13, 5);

      // Back of Collar
      fill(255, 215,   0);
      rect(gameChar_x - 10, gameChar_y - 65, 20, 5);

      fill(102,51,0);
      // Neck
      rect(gameChar_x - 5, gameChar_y - 65, 10, 15);

      // Body Color
      fill(255, 215,   0);
      //Left Peck
      rect(gameChar_x - 14,gameChar_y - 60, 15, 21, 5);
      // Right Peck
      rect(gameChar_x + 1,gameChar_y - 60, 15, 21, 5);

      // Ab's
      fill(255, 215,   0);
      rect(gameChar_x - 10,gameChar_y - 45, 18, 21, 5);

      //Left Shoulder
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 50, 15, 15);
      // Left Bicep
      fill(102,51,0);
      ellipse(gameChar_x - 15, gameChar_y - 43, 13, 20);
      // Left Arm End
      triangle(gameChar_x - 15 , gameChar_y - 32, gameChar_x - 10, gameChar_y - 40, gameChar_x - 5, gameChar_y - 30);
      // Left Hand
      fill(102,51,0);
      ellipse(gameChar_x - 7, gameChar_y - 32, 7, 7);

      //Right Shoulder
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 50, 15, 15);
      // Right Bicep
      fill(102,51,0);
      ellipse(gameChar_x + 15, gameChar_y - 43, 13, 20);
      // Right Arm End
      triangle(gameChar_x + 14, gameChar_y - 32, gameChar_x + 10, gameChar_y - 40, gameChar_x + 5, gameChar_y - 30)
      fill(102,51,0);
      ellipse(gameChar_x + 7, gameChar_y - 32, 7, 7);

      // The Afro
      fill(0);
      ellipse(gameChar_x, gameChar_y - 90, 30, 30);
      //The Head
      fill(102,51,0);
      ellipse(gameChar_x , gameChar_y - 75, 20, 25);
      // HeadLine
      fill(0);
      rect(gameChar_x - 10, gameChar_y - 92, 20, 5);

      // The Headband
      fill(112, 128, 144);
      rect(gameChar_x - 10, gameChar_y - 85, 20, 5);
    }
  }

// ---------------------------
// Background render functions
// ---------------------------

  // Function to draw mountains objects.
  function drawMountain() {
    for (var i = 0; i < mountaintops.length; i++) {

      // first Group
      fill(210, 207, 207);
      triangle(200 + mountaintops[i], mountaintops[i] = floorPos_y, 50, 431, 300, 50);

      fill(169, 165, 165);
      triangle(250 + mountaintops[i], mountaintops[i] = floorPos_y, 150, 431, 350, 50);

      fill(158, 152, 152);
      triangle(300 + mountaintops[i], mountaintops[i] = floorPos_y, 200, 431, 400, 50);

      // Second Group ------------------------------------------
      fill(210, 207, 207);
      triangle(800 + mountaintops[i], mountaintops[i] = floorPos_y, 550, 431, 700, 50);

      fill(169, 165, 165);
      triangle(850 + mountaintops[i], mountaintops[i] = floorPos_y, 650, 431, 750, 50);

      fill(158, 152, 152);
      triangle(1000 + mountaintops[i], mountaintops[i] = floorPos_y, 700, 431, 800, 50);

      // Third Group -------------------------------------------------
      fill(210, 207, 207);
      triangle(-800 + mountaintops[i], mountaintops[i] = floorPos_y, -1200, 431, -700, 50);

      fill(169, 165, 165);
      triangle(-850 + mountaintops[i], mountaintops[i] = floorPos_y, -1300, 431, -750, 50);

      fill(158, 152, 152);
      triangle(-1000 + mountaintops[i], mountaintops[i] = floorPos_y, -1400, 431, -800, 50);

      // Forth Group ------------------------------------------
      fill(210, 207, 207);
      triangle(1000 + mountaintops[i], mountaintops[i] = floorPos_y, 2000, 431, 1500, 50);

      fill(169, 165, 165);
      triangle(1150 + mountaintops[i], mountaintops[i] = floorPos_y, 2100, 431, 1550, 50);

      fill(158, 152, 152);
      triangle(1200 + mountaintops[i], mountaintops[i] = floorPos_y, 2200, 431, 1600, 50);
    }
  }

  // Function to draw trees objects.
  function drawTrees() {
    for (var i = 0; i < greentrees.length; i++) {
      strokeWeight(2);
      stroke(139,  69,  19);
      fill(100, 50, 0);
      rect(75 + greentrees[i], -200 / 2 + floorPos_y, 50, 200 / 2);

      strokeWeight(15);
      stroke(85, 107,  47);
      fill(0, 100, 0);
      // triangle(greentrees[i] + 25, -200 / 2 + floorPos_y,
      //   greentrees[i] + 100, -200 + floorPos_y,
      //   greentrees[i] + 175, -200 / 2 + floorPos_y);

      triangle(greentrees[i], -200 / 4 + floorPos_y,
        greentrees[i] + 100, -200 * 3 / 4 + floorPos_y,
        greentrees[i] + 200, -200 / 4 + floorPos_y);

      fill(0, 100, 0);
      triangle(greentrees[i] + 25, -200 / 2 + floorPos_y,
        greentrees[i] + 100, -200 + floorPos_y,
        greentrees[i] + 175, -200 / 2 + floorPos_y);
      noStroke();
      fill(0);
    }
  }

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

  // Function to draw canyon objects.
  function drawCanyon(t_canyon) {
    // Border Around Canyon
    fill(0);
    rect(t_canyon.pos_x - 5, 432, t_canyon.width + 10, 800);
    // Canyon
    fill(255,   0,   0);
    rect(t_canyon.pos_x, 432, t_canyon.width, 200);

    // Left Side Rocks
    fill(0);
    rect(t_canyon.pos_x, 432, t_canyon.width - 127, 20, 5);
    fill(0);
    ellipse(t_canyon.pos_x + 12, 463, 25, 25);
    fill(0);
    rect(t_canyon.pos_x, 476, t_canyon.width - 127, 20, 5);
    fill(0);
    ellipse(t_canyon.pos_x + 12, 508, 25, 25);
    fill(0);
    rect(t_canyon.pos_x, 520, t_canyon.width - 127, 20, 5);
    fill(0);
    ellipse(t_canyon.pos_x + 12, 552, 25, 25);
    fill(0);
    rect(t_canyon.pos_x, 562, t_canyon.width - 127, 20, 5);

    // Right Side Rocks
    fill(0);
    rect(t_canyon.pos_x + 126, 432, t_canyon.width - 127, 20, 5);
    fill(0);
    ellipse(t_canyon.pos_x + 137, 463, 25, 25);
    fill(0);
    rect(t_canyon.pos_x + 126, 476, t_canyon.width - 127, 20, 5);
    fill(0);
    ellipse(t_canyon.pos_x + 137, 508, 25, 25);
    fill(0);
    rect(t_canyon.pos_x + 126, 520, t_canyon.width - 127, 20, 5);
    fill(0);
    ellipse(t_canyon.pos_x + 137, 552, 25, 25);
    fill(0);
    rect(t_canyon.pos_x + 126, 562, t_canyon.width - 127, 20, 5);
  }

  // Function to check character is over a canyon.

  function checkCanyon(t_canyon) {
    if (gameChar_world_x > t_canyon.pos_x &&
      gameChar_world_x < t_canyon.pos_x + t_canyon.width &&
      gameChar_y >= floorPos_y) {

      isPlummeting = true;
      canyonDeath.play();
    }
  }

  // ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
  function drawCollectable(t_collectable) {

    beginShape();
    strokeWeight(1);
    stroke(0);
    fill(184, 134, 11);
    ellipse(t_collectable.pos_x, t_collectable.pos_y - 20, 55, 55);
    noStroke();
    fill(218, 165, 32);
    ellipse(t_collectable.pos_x, t_collectable.pos_y - 20, 47, 47);
    fill(238, 232, 170);
    ellipse(t_collectable.pos_x, t_collectable.pos_y - 20, 35, 35);
    fill(250, 250, 210);
    ellipse(t_collectable.pos_x, t_collectable.pos_y - 20, 24, 24);
    fill(255, 255, 224);
    ellipse(t_collectable.pos_x, t_collectable.pos_y - 20, 12, 12);
    fill(184, 134, 11);
    ellipse(t_collectable.pos_x, t_collectable.pos_y - 20, 5, 5);
    endShape();
  }


  // Function to check character has collected an item.
  function checkCollectable(t_collectable) {
    if (dist(gameChar_world_x, gameChar_y, t_collectable.pos_x,
      t_collectable.pos_y) < 60) {
      t_collectable.isFound = true;
      whats_the_score += 1;
      coinSound.play();

    }
  }

  function renderFlagpole() {
    push();
    strokeWeight(25);
    stroke(180);
    line(flagpole.x_pos, floorPos_y - 10, flagpole.x_pos, floorPos_y - 250);
    fill( 0, 128,   0);
    noStroke();
    if (flagpole.isReached) {
      rect(flagpole.x_pos, floorPos_y - 250, 100, 75);
    } else {
      fill(255,   0,   0)
      rect(flagpole.x_pos, floorPos_y - 25, 100, 75);
    }
    pop();
  }

  function checkFlagpole() {

    var d = abs(gameChar_world_x - flagpole.x_pos);

    if (d < 15) {
      flagpole.isReached = true;
    }
  }

  function createPlateformsLevels(x, y, length) {

    var p = {
      x: x,
      y: y,
      length: length,
      draw: function () {

        strokeWeight(3);
        stroke(0);
        noFill();
        fill(255);
        rect(this.x, this.y, this.length, 30, 20);
        fill(128,   0,   0);
        rect(this.x, this.y, this.length, 22, 20);
        noStroke();

        },
      checkContact: function (gc_x, gc_y) {
        if (gc_x > this.x && gc_x < this.x + this.length) {
          var d = this.y - gc_y;
          if (d >= 0 && d < 5) {
            return true;

          }
        }
        return false;
      }
    }
        return p;
}
    function checkPlayerDie() {

      if (isPlummeting && (gameChar_y > height)) {
        how_many_lives -= 1;
        if (how_many_lives > 0) {
          startGame();
        } else {
          how_many_lives = 0;
        }
      }
    }

    function badGuy(x, y, range) {

      this.x = x;
      this.y = y;
      this.range = range;

      this.currentX = x;
      this.inc = 1;

      this.update = function () {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) {
          this.inc = -1;
        } else if (this.currentX < this.x) {
          this.inc = 1;
        }
      }
      this.draw = function () {
        this.update();
        fill(255, 255, 255)
        //ellipse(this.currentX , this.y, 20,20);
        noStroke();

        // Right ear
        fill(47, 79, 79);
        rect(this.currentX - 63, this.y - 85, 35, 35, 20, 15, 10, 20);
        fill(47, 79, 79);
        triangle(this.currentX + 48, this.y - 84, this.currentX + 63, this.y - 74, this.currentX + 65, this.y - 85)
        // Inner Ear
        fill(255, 228, 181);
        rect(this.currentX - 56, this.y - 79, 27, 27, 5, 20, 15, 10);

        // // Left ear
        fill(47, 79, 79);
        rect(this.currentX + 28, this.y - 85, 35, 35, 20, 15, 20, 10);
        fill(47, 79, 79);
        triangle(this.currentX - 48, this.y - 85, this.currentX - 64, this.y - 69, this.currentX - 65, this.y - 85);
        // Inner Ear
        fill(255, 228, 181);
        rect(this.currentX + 31, this.y - 80, 27, 27, 20, 5, 15, 10);

        fill(47, 79, 79);
        ellipse(this.currentX, this.y - 32, 80, 70);

        fill(250, 128, 114);
        quad(this.currentX - 30, this.y - 20, this.currentX, this.y, this.currentX + 30, this.y - 20, this.currentX, this.y - 17);
        // First Tooth
        fill(255, 255, 240);
        triangle(this.currentX - 20, this.y - 13, this.currentX - 13, this.y - 19, this.currentX - 25, this.y - 19);
        //Second Tooth
        fill(255, 255, 240);
        triangle(this.currentX - 13, this.y - 18, this.currentX, this.y, this.currentX + 14, this.y - 18);
        // Third Tooth
        //Second Tooth
        fill(255, 255, 240);
        triangle(this.currentX + 16, this.y - 19, this.currentX + 18, this.y - 10, this.currentX + 28, this.y - 20);

        // Bottom Teeth
        fill( 255, 255, 240);
        triangle(this.currentX - 15, this.y - 11, this.currentX - 7, this.y - 5, this.currentX - 13, this.y - 17);
        fill( 255, 255, 240);
        triangle(this.currentX + 15, this.y - 11, this.currentX + 7, this.y - 5, this.currentX + 15, this.y - 17);


        // Nose
        fill(255, 182, 193);
        rect(this.currentX - 16, this.y - 45, 32, 27, 20, 15, 20, 15);
        // Left hole
        fill(0);
        ellipse(this.currentX - 7, this.y - 28, 5, 10);
        fill(0);
        ellipse(this.currentX - 5, this.y - 28, 5, 10);
        fill(0);
        ellipse(this.currentX - 3, this.y - 32, 5, 10);
        //Right hole
        fill(0);
        ellipse(this.currentX + 7, this.y - 28, 5, 10);
        fill(0);
        ellipse(this.currentX + 5, this.y - 28, 5, 10);
        fill(0);
        ellipse(this.currentX + 3, this.y - 32, 5, 10);

        fill(139, 0, 0);
        ellipse(this.currentX - 22, this.y - 39, 10, 10);
        // eye brows
        fill(0);
        rect(this.currentX - 35, this.y - 45, 20, 5);

        fill(139, 0, 0);
        ellipse(this.currentX + 22, this.y - 39, 10, 10);
        // eye brows
        fill(0);
        rect(this.currentX + 15, this.y - 45, 20, 5);


      }
      this.checkContact = function (gc_x, gc_y) {
        var d = dist(gc_x, gc_y, this.currentX, this.y)

        console.log(d);

        if (d < 60) {
          badguyDeath.play();
          return true;

        }
        return false;
      }
    }














