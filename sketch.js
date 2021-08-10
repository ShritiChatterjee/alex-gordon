//game state
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//to create the sprite objects
var alex, alexImage;
var signBoard, signBoardImage;
var heart, heartImage;
var rabbit, rabbitImage;
var enemy, enemyImage;
var duck, duckImage;
var island, islandImage;
var coin, coinImage;
var jungle, jungleImage;
var stone, stoneImage;
var ground;
var score = 0;

var survivalTime = 0;

var enemysHit = 0;

var gameover, gameoverImage;

var restart, restartImage;

//to preload images and animations
function preload(){
  
  alexImage = loadAnimation("alex1.gif");
  
  //alex_collided = loadAnimation(alex_collided.png");
  
  heartImage = loadImage("heart.jpg");
  enemy1_img = loadImage("enemy1.png");
  enemy2_img = loadImage("enemy2.gif");
  enemy3_img = loadImage("enemy3.gif");
  enemy4_img = loadAnimation("croc1.png","croc1.png","croc2.png","croc2.png");
  enemy5_img = loadImage("enemy5.gif");
  enemy6_img = loadImage("enemy6.gif");
  enemy7_img = loadImage("enemy7.png");
  coinImage = loadImage("coin.gif");
  rabbitImage = loadImage("cheer rabbit.gif");
  duckImage = loadImage("cheer animal.gif");
  stoneImage = loadImage("stone.png");
  signBoardImage = loadImage("sign board.png");
  islandImage = loadImage("island.png");
  jungleImage = loadImage("background3.jpg");
  
  gameoverImage = loadImage("gameover.png");
  
  restartImage = loadImage("restart.png");
  
}

function setup() {

  //to create the canvas
    createCanvas(2000,800);

  //to create thealex
    alex = createSprite(100, 315, 20, 20);  
    alex.addAnimation("alex",alexImage);
    //alex.addAnimation("collided",alex_collided);
    alex.scale = 0.7;

  //to create the ground
    ground = createSprite(900, 700, 1600, 10);
    ground.visible = false;
  
  //to create the jungle
    jungle = createSprite(200,370,2000,800);
    jungle.addImage("background",jungleImage);
    jungle.scale = 1.5;
    jungle.x = jungle.width/2;
  
  //to create the coin and enemy group
    coinGroup = new Group();
    enemyGroup = new Group();
  
  //to create score
    score = 0;
  
  //to create survivalTime 
    survivalTIme = 0; 
  
  //to create enemysHit 
    enemysHit = 0;
  
  //to create gameover
    gameover = createSprite(400, 190);
    gameover.addImage("gameover", gameoverImage);
  
  //to create restart
    restart = createSprite(400, 250);
    restart.addImage("restart", restartImage);
  
  //to scale restart and gameover
    gameover.scale = 1.0;
    restart.scale = 1.0;
  
  //to change the invisibility to false 
    gameover.visible = false;
    restart.visible = false;
  
}

function draw(){ 
 
  //to give the background color
   background(255);
  
  //to increase the depth of thealex
alex.depth = jungle.depth + 1;
  
  //game state PLAY
  if(gameState===PLAY){  
    
    //to make thealex jump 
       if(keyDown("space") &&alex.y >= 159){
        alex.velocityY = -12
       }

    //to add gravity
      alex.velocityY =alex.velocityY + 2;

    //to give velocity to the ground and jungle
       jungle.velocityX = -(10 + Math.round(score / 4));
    
    //to spawn coin and enemy group 
       spawncoin();
       spawnenemys();

    //to create infinite jungle  
       if(jungle.x < 400){
         jungle.x = jungle.width/2;
       }  
    
    //to increase the survivalTime 
       survivalTime += Math.round(frameCount / 100);
 
    //to increase the score
      if(coinGroup.isTouching(alex)){
       coinGroup.destroyEach();
       score = score + 1;
      }
      /* switch(score){
         case 10:alex.scale = 0.12;
                 break;
         case 20:alex.scale = 0.14;
                 break;
         case 30:alex.scale = 0.16;
                 break;
         case 40:alex.scale = 0.18;
                 break;
         default: break;    
       }*/

    //to decrease the score
      if(enemyGroup.isTouching(alex)){
        enemyGroup.destroyEach();
        enemysHit = enemysHit + 1;
        if (enemysHit === 1) {
        //alex.scale = 0.08;
        }
        if (enemysHit === 5) {
         gameState = END;
        } 
      }
   }
  
  else if(gameState===END){
    gameover.visible = true;
    restart.visible = true;
    
  alex.velocityY = 0;
    
    jungle.velocityX = 0; 
    
    enemyGroup.destroyEach();
    coinGroup.destroyEach();
    
 // alex.changeAnimation("collided",alex_collided);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  //to make thealex collide with the ground
  alex.collide(ground); 

  //to draw the objects
   drawSprites();

  //to display score
   stroke("white");
   textSize(20);
   textFont("Georgia");
   fill("white");
   text("Score : "+ score, 40, 30);
   text("Survival Time : "+ survivalTime, 300, 30 );
   text("Obtacles Hit : "+ enemysHit, 600, 30);
  
}

//function spawn coin
function spawncoin(){  
  
  if(World.frameCount%80===0){
    coin = createSprite(800, Math.round(random(120,200)),10,30);
    coin.addImage("coin",coinImage);
    coin.scale = 0.5;
    coin.velocityX = -(10 + 3 * score / 100);
    coin.lifetime = 100;
    coinGroup.add(coin);   
    coin.setCollider("rectangle", 0, 0, 100, 100);
    coin.depth =alex.depth;
  alex.depth =alex.depth + 1;
  }
  
}

//function spawn enemys 
function spawnenemys(){
  
  if(World.frameCount%50===0){
    
    enemy = createSprite(800,700,10,40);
    var x=  Math.round(random(1,7));
     switch(x){
        case 1: enemy.addImage( "enemy1" ,enemy1_img);
         break; 
         case 2: enemy.addImage( "enemy2", enemy2_img);
          break;
           case 3: enemy.addImage( "enemy3", enemy3_img); 
           break; 
           case 4: enemy.addAnimation("enemy4", enemy4_img);
            break;
             case 5: enemy.addImage("enemy5", enemy5_img);
              break; 
              case 6: enemy.addImage("enemy6", enemy6_img);
              break; 
              case 7: enemy.addImage("enemy7", enemy7_img);
              break; 
            }
   
    enemy.scale = 1;
    enemy.velocityX = -(10 + 3 * score / 10);       
    enemy.lifetime = 100;
    enemyGroup.add(enemy);
    enemy.setCollider("rectangle", 0, 0, 300, 300);
  }
  
}

//function reset
function reset(){
  
  gameState = PLAY; 
  
  gameover.visible = false;
  restart.visible = false;
  
  coinGroup.destroyEach();
  enemyGroup.destroyEach();
  
//alex.changeAnimation("running",alex_running);
  
  score = 0;
  enemysHit = 0;
  survivalTime = 0;
  
alex.scale = 0.1;
  
}