var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup,cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4,obstacle5,obstacle6;
var count=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,gameover_image;
var restart,restart_image;
var dinoducking;
//var ground1;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  dinoducking = loadImage("dinoDucking.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 =loadImage("obstacle1.png");
  obstacle2 =loadImage("obstacle2.png");
  obstacle3 =loadImage("obstacle3.png");
  obstacle4 =loadImage("obstacle4.png");
  obstacle5 =loadImage("obstacle5.png");
  obstacle6 =loadImage("obstacle6.png");
  gameover_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  //camera.position.x=1;

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.addAnimation("ducking",dinoducking);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.velocityX=1; 

  // ground1 = createSprite(200,180,400,20);
  // ground1.addImage("ground",groundImage);
  
  invisibleGround = createSprite(200,190,1000,10);
  invisibleGround.visible = false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
  gameover=createSprite(300,60);
  gameover.addImage(gameover_image);
  gameover.scale=0.5;
  gameover.visible=false;
  
  restart=createSprite(300,100);
  restart.addImage(restart_image);
  restart.scale=0.5;
  restart.visible=false;
}

function draw() {
  background(180);           
  text("Score: "+ count, trex.x+100, 50);
  
  if(gameState==PLAY){
    trex.velocityX = (6+3*count/1000);
    camera.position.x=trex.x;
    invisibleGround.x=trex.x;

    count=count+Math.round(getFrameRate()/60);
    if(keyDown("space") && trex.y >= 161) {
      trex.velocityY = -12;
    }
    if(keyDown("up_arrow") && trex.y >= 161) {
      trex.velocityY = -12;
    }
    if(keyDown("down_arrow") && trex.y >= 161) {
      trex.changeAnimation("ducking",dinoducking);
      ground.depth=ground.depth+1;
    } else if (trex.y>161) {
      trex.changeAnimation("running", trex_running);
    }
  
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x <trex.x-300){
      ground.x = trex.x;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
    } 
  }
  else if(gameState==END){
    gameover.x=trex.x;
    restart.x=trex.x;
    gameover.visible=true;
    gameover.depth=gameover.depth+1;
    restart.visible=true;
    trex.velocityY=0;
    trex.velocityX=0;
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);  
    trex.changeAnimation("collided",trex_collided); 
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
     reset(); 
    }
    if(keyDown("space") || keyDown("up_arrow") || keyDown("enter")) {
      reset();
    }
  }  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(trex.x+400,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    //cloud.velocityX = -(6+3*count/1000);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x+400,165,10,40);
    // obstacle.velocityX = -(6+3*count/1000);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  count=0;
  
  
} 