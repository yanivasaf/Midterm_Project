//The Elusive Worm

//***REVISION:
//I did some cleaning and orginizing in the program  - creating new functions to make everything more neat and clean.
// I created 2 more elements the react well with the worm.***

//*** The elusive motion created by the noise() gives the effect as the worm reacting to
//    the different elements although there is no real reaction programed.***

//*** i would like to program actual reactions for the worm when he reach different positions
//    or elements. I didnt figure out how to do it while im using the noise to control is movemnt.***

//*** press '2' '3' '4' to bring different elements
//    press '1' to clear them.
//    press the mouse to bring the rain***


var w1; //worm object
var perlin = 0; //changing parameter that with the noise() create the movement
var xpos = 0; // X position of the worm
var ypos = 0; // Y position of the worm
var r = 0; //Red
var g = 0; //Green
var b = 0; //Blue

//Creature's Variables
var xrand=0;//creature X position
var yrand=10;// Creature Y position
var c = 10;// creature speed change


//Rain Variables
var drops = []; //Drops for the rain
var xmove = 1; // Changing variable for the rain


function setup() {
  createCanvas(displayWidth, displayHeight);
  frameRate(25);
  background(0);

  w1 = new Worm(width / 2, height / 2); // Creating the worm object

  //Creating Drops for Third Reaction
  //*** I wanted to create more drops but it was hard on the CPU***
  for (var i = 0; i < 100; i++) {
    drops[i] = new Rain();
  }
 


}

function draw() {


  //Changing the size of the head of the worm using sin
  breath = 50 + 35 * sin(frameCount * 0.05); // i took the idea of using frameCount as a multiplier from one of the tutorials of  Daniel Shiffman
   //*** I really like the way the 'breath' give a 3d feeling in a 2d sketch***
  
  //Press '2' or '3' to create lines for the worm to move in between them
  //press '1' to clear the creen
  elements();

  //Drawing the worm
  w1.display();


  // It's raining when you press the mouse
  if (mouseIsPressed) {
    for (var i = 0; i < drops.length; i++) { // going through the list of drops

      drops[i].display(); //drawing each drop
      drops[i].move(); // creating the motion of each drop
    }

  }

}


function Worm() { // Worm class
  this.x = xpos; //x position
  this.y = ypos; //y position
  this.r = r; //red
  this.g = g; //green
  this.b = b; //blue
  this.p = perlin; //changing variable that works with the noise()


  //*** i used the tutorial http://genekogan.com/code/p5js-perlin-noise/ to learn about noise and 

  this.display = function() {

    //*** Using the noise(),i create smooth random change in the position and color
    this.x = width * noise(this.p);// 
    this.y = height * noise(this.p + 4);//***the added numbers (4,10,15,20) we're controling that the values 'inside the noise' will be different.
    this.r = 255 * noise(this.p + 10);
    this.g = 255 * noise(this.p + 15);
    this.b = 255 * noise(this.p + 20);

    //These 3 variables varies the points positiom on the worm's head
    // the 'breath' make sure that the points stay on the head of the worm
    // while it getting bigger and smaller
    var cxr_1 = -(breath + 30) * 0.3;
    var cyr_1 = (breath - 30) * 0.3;
    var cxr_2 = breath * 0.3;


    background(5, 5); //The background with the very low opacity creates the effect of the fading trail  
    noStroke();
    fill(this.r, this.g, this.b); // color changing using noise()
    ellipse(this.x, this.y, breath + 50, breath); //Drawing  the ellipse - the X and Y are moving by the niose and multipliers.
    //the size of the ellipse is changing with the sin wave
    this.p += 0.01; // changing the value that effect the noise()*** the organic motion is a result of this really small 

    //creating points on the worm's head
    for (var r = 0; r < 5; r++) {
      stroke(random(100));
      strokeWeight(random(2, 5));
      point(this.x + random(cxr_1, cyr_1), this.y + random(cxr_2, -cxr_2));
    }


  }


}
//creating elements Function
function elements() {
  //The elements are created only when '1' , '2' or '3' are being pressed
  if (keyIsPressed) {
   
    //Press '1' to stop drawing elements
    if (key == '1') {
      background(0, 5);
      frameRate(25);//reset framerate
    }

      //press '2' to draw horizontal lines
     else if (key == '2') {
    linesHor();
    }
    
    //press '3' to draw vertical lines
    else if (key == '3') {
linesVer();
    }
      //press '4' to draw circles
    else if (key == '4') {
circles();
    }
    
    else if (key == '5'){
      sqr();
  }
}
}


//Rain Function
function Rain() {

  //start point on the X axes
  this.x = random(width);
  //start from the top
  this.y = 0;
  // rain speed
  this.speedY = random(3, 10);
  //"wind" speed (direction on the X axes)
  this.speedX = 1;

  //setting the display of a drop
  this.display = function() {
    frameRate(70);//take the framerate a bit higher
    //drawing a drop
    strokeWeight(2);
    stroke(52, 152, 219);
    background(50, 20);
    line(this.x, this.y, this.x - 1, this.y + 10);
  }
	 //setting the movement of the drop
   this.move = function() {
    //movement on the X and Y
    this.y += this.speedY;
    this.x -= this.speedX;

    //When a drop reach the bottom - goes back up
    if (this.y > height) {
      this.y = 0;
    }
    //If the "wind" takes the drops out of frame - Change direction
    if (this.x < 0) {
      this.speedX = -xmove;
    }
    if (this.x > width) {
      this.speedX = xmove;
    }
  }

}

function linesHor(){
     var randy = random(height); //choose a random point on the Y axes

      background(0, 5);
      //Drawing the outer line
      stroke(230);
      strokeWeight(8);
      line(0, randy, width, randy);
      //drawing the green inner line
      strokeWeight(2);
      stroke(30, 150, 20, 200);
      line(0, randy, width, randy);
}

function linesVer(){
       var randx = random(width); //choose a random point on the X axes
      background(0, 5);
      //Drawing the outer line
      stroke(230);
      strokeWeight(8);
      line(randx, 0, randx, height);
      //drawing the red inner line
      strokeWeight(2);
      stroke(140, 30, 20, 200);
      line(randx, 0, randx, height);
}

function circles(){
   background(0,5);
  var circleX = random(width);
  var circleY = random(height);
  var rad = (random(40,width/4));
  strokeWeight(random(4,10));
  stroke(200);
  noFill();
  ellipse(circleX,circleY,rad,rad);
   strokeWeight(2);
  stroke(104,92,121);
  ellipse(circleX,circleY,rad,rad);
}
  
function sqr(){
  background(0,5);
 push();
	// move the origin to the pivot point
	translate(width/2, height/2); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
	stroke(200);
  strokeWeight(8);
noFill();
	rect(0, 0, 100, 100);
  	stroke(130,0,79);
  strokeWeight(2);
noFill(255);
	rect(0, 0, 100, 100);
  
  	// move the origin to the pivot point
	translate(width/10, height/10); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
	stroke(200);
  strokeWeight(8);
noFill();
	rect(0, 0, 100, 100);
  	stroke(130,0,79);
  strokeWeight(2);
noFill(255);
	rect(0, 0, 100, 100);
   	// move the origin to the pivot point
	translate(width/11, height/11); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
	stroke(200);
  strokeWeight(8);
noFill();
	rect(0, 0, 100, 100);
  	stroke(130,0,79);
  strokeWeight(2);
noFill(255);
	rect(0, 0, 100, 100);
  
    	// move the origin to the pivot point
	translate(width/12, height/12); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
stroke(200);
  strokeWeight(8);
noFill();
	rect(0, 0, 100, 100);
  	stroke(130,0,79);
  strokeWeight(2);
noFill(255);
	rect(0, 0, 100, 100);
  
  	translate(width/13, height/13); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(radians(frameCount));

	// and draw the square at the origin
	stroke(200);
  strokeWeight(8);
noFill();
	rect(0, 0, 100, 100);
  	stroke(130,0,79);
  strokeWeight(2);
noFill(255);
	rect(0, 0, 100, 100);
  pop();
}

function mouseReleased() {// when stoping the rain - reset the frame rate
  frameRate(28);
}