//all dem global variables
  var monkeyImg;
  var bananaImg, foodGroup;
  var obstacleImg, obstacleGroup;
  var backgroundImg
  var score
  var gameState = "begin"

//preloads all the images and stuff
function preload(){

  // the image of the background
    backgroundImg = loadImage("jungle.jpg");

  // the image of the obstacles  
    obstacleImg = loadImage("stone.png");

  // the player avatar  
    monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  // the image of the food   
    bananaImg = loadImage("banana.png");
    
  //sets the score
    score = 0;
}

//sets the canvas and declares the variables
function setup() {

  //creates the gamin area
    createCanvas(displayWidth, 400);

  //creates the player
    player = createSprite(60, 340, 10, 10);
      player.addAnimation("walkingPlayer", monkeyImg);
      player.scale = 0.1;
  
  //creates the ground so that you aren't just floating
    ground = createSprite(player.x, 400, 100000000000000, 20);
      ground.visible = false;

  //creates the rock and banana groups
    foodGroup = new Group();
    obstacleGroup = new Group(); 
  
}

//the game sandbox!
function draw() {
  background(backgroundImg);

  //to make sure the game is actually functionable
    if (gameState === "begin"){

      //to keep the player still
        player.velocityX = 0;
      
      //the text settings
        stroke(rgb(60, 132, 44));
        strokeWeight(10)

      //the title
        textSize(36)
        fill(rgb(255, 255, 0));
        text("MONKEY GO HAPPY", player.x - 155, 100);

      //the instructions on how to begin the game
        textSize(20)
        fill(rgb(255, 255, 255));
        text("Press Space to Begin!", player.x - 100, 180);

      //the trigger to start the game
        if (keyDown("space")){
          gameState = "play";
        }

    } else if (gameState === "play"){
      
      //allows the player to jump
        if (keyDown("space") && player.y > 325){
          player.velocityY = -15           
        }

      //keeps the player walking
        player.velocityX = +5;
      
      //allows the score to increase
        score = score + Math.round(getFrameRate()/100);
      
      //the score affects the size of the monkey
        switch(score){
          case -50: player.scale = 0;
            break;
          case -40: player.scale = 0.02;
            break;
          case -30: player.scale = 0.04;
            break;
          case -20: player.scale = 0.06;
            break;
          case -10: player.scale = 0.08;
            break;
          case 0: player.scale = 0.1;
            break;
          case 10: player.scale = 0.12;
            break;
          case 20: player.scale = 0.14;
            break;
          case 30: player.scale = 0.16;
            break;
          case 40: player.scale = 0.18;
            break;
          case 50: player.scale = 0.2;
            break;
            default: break;
      }
      
      //if you hit the rocks, you will slowly start to die mhwhahaha
        if (obstacleGroup.isTouching(player)){
        score = score - 1; 
        }  
      //im nice ok?
        if (foodGroup.isTouching(player)){
          foodGroup.destroyEach();
          score = score+5; 
        }
      
      //in order to actually get rocks and bananas
        spawnObstacles();
        spawnFood();

      //the scoreboard displayer
        stroke(rgb(255, 255, 255));
        textSize(20);
        fill(rgb(255, 255, 255));
        text("Score: " + score, player.x, 50);

    } else if (gameState === "lose"){
      
      //the failure text oof
        stroke(rgb(60, 132, 44));
        strokeWeight(10)
        textSize(20)
        fill(rgb(255, 255, 255));
        text("im sorry but you died", player.x - 100, 180)

      //to make sure you don't see moving rocks and bananas
        obstaclesGroup.lifetime = 0
        player.velocityX = 0;

    } else if (gameState === "win"){
      
    //the winning text!
      stroke(rgb(60, 132, 44));
      strokeWeight(10)
      textSize(20)
      fill(rgb(255, 255, 255));
      text("Hot Dog you won!", player.x - 100, 180)

    //to make sure you don't see moving rocks and bananas
      obstaclesGroup.lifetime = 0
      player.velocityX = 0;

    }

  //just the stuff that stys constant y'know
  
    //gravity generator
      player.velocityY = player.velocityY + 0.8      
    
    //so that the player doesn't fall straight through the ground
      player.collide(ground); 
      obstacleGroup.collide(ground);
      
    //fixes the movemoent on the player
      camera.position.x = player.x;

    //allows the player to win and lose
      if (player.scale === 0){
        gameState = "lose";
      } else if (player.scale === 0.2){
        gameState = "win";
      }
    
  drawSprites();
  
}

//the banana-maker!
  function spawnFood(){
    if (frameCount % 457 === 0){
    var food = createSprite(player.x+500, 350, 10, 10);
      food.addImage("the food", bananaImg);
      food.collide(ground);
      food.scale = 0.05;
      food.velocityY = 5;
      food.lifetime = 300;
      foodGroup.add(food);
      food.setCollider("circle", 0, 0, 200);
    }
}

//the rock-miner!
  function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(player.x+500, 350, 10, 10);
    obstacle.addImage("the obstacles", obstacleImg);
    obstacle.collide(ground);
    obstacle.scale = 0.145;
    obstacle.velocityY = 5;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 200);
  }
}