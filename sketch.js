var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var Slider;
 
 
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    Slider = createSlider(0, 100, 50);
    Slider.position(40, 365);
    Slider.input = map(engine.world.gravity, Slider.min, Slider.max, 0, 1); 

    var options = {
        isStatic: true
    }
    ground = Bodies.rectangle(200, height - 50, width, 10, options);
    World.add(world, ground);
}
 
function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
        fill("blue");
    }
}
 
function draw() {
    background("Black");
    var GF = Slider.value();
 
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    noStroke();
    fill("purple");
    strokeWeight(4);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 10);
    fill("red");
    textSize(15);
    text("Gravity value : " + GF, 175, 381);
    
}
 
function Box(x, y, w, h, options) {
    var options = {
        friction: 0.5,
        restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill("yellow");
        rect(0, 0, this.w, this.h);
        pop();
    }
}