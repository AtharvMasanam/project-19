var space, spaceImg;
var UFO, UFOImg;
var meteor, meteorImg, meteorGroup;
var star, starImg, starsGroup;
var gameState = "play";
var score = 0;
    
function preload(){
spaceImg = loadImage("space.jpg");
UFOImg = loadImage("UFO.png");
meteorImg = loadImage("meteor.jpg");
starImg = loadImage("star.png")
}

function setup() {
 createCanvas(600,600);
 
 space = createSprite(300,300);
 space.addImage("space", spaceImg);
 space.velocityY = 1;
 space.scale = 1.5;
 edges = createEdgeSprites();
 UFO = createSprite(300,550,50,50);
 UFO.addImage("UFO", UFOImg);
 UFO.scale = 0.05;

 meteorGroup = new Group();
 starsGroup = new Group();
}

function draw() {
    background(200);

   

    UFO.collide(edges);
    if(gameState ==="play"){
        if(space.y > 400){
        space.y = 300;
        }

        if(keyDown("left_arrow")){
            UFO.x -= 3;
        }

        if(keyDown("right_arrow")){
            UFO.x += 3;
        }

        if(keyDown("space")&&UFO.y >= 300){
            UFO.velocityY -=2;
        }

        UFO.velocityY = UFO.velocityY + 0.3;

        createMeteors();
        createStars();

        if(meteorGroup.isTouching(UFO) || UFO.y > 600){
            UFO.velocityY = 0;
            gameState="end";
        }

        if(starsGroup.isTouching(UFO)){
            score += 1;
            for(var i = 0; i<starsGroup.length; i++){
                starsGroup[i].destroy();
            }
        }
    

       
    }
    
    drawSprites();

    textSize(20);
    fill("white");
    text("Score: " + score, 450, 50);
    
    if(gameState==="end"){
        text("Game Over",300,300,1,1);
        space.x = width/2;
        space.y = height/2;

    }
    
}

function createMeteors(){
    if(frameCount%50==0){
        meteor = createSprite(random(10,550),0,20,20);
        meteor.velocityY = 3;
        meteor.addImage(meteorImg);
        meteor.scale = 0.1;
        meteorGroup.add(meteor);
    }

}

function createStars(){
    if(frameCount%50==0){
        star = createSprite(random(10,550),0,20,20);
        star.velocityY = 3;
        star.addImage(starImg);
        star.scale = 0.1
        starsGroup.add(star);
    }
}