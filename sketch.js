var trex,trex_running,trex_collided
var ground,groundimage,invisibleground
var cloud,cloudimage,cloudsgroup
var obstacle,obstaclesgroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score=0
var gameover,restart,gameoverimage,restartimage
var gamestate="play"
function preload() {
groundimage=loadImage("ground2.png")
cloudimage=loadImage("cloud.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
gameoverimage=loadImage("gameOver.png")
restartimage=loadImage("restart.png")
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
trex_collided=loadAnimation("trex_collided.png")
}

function setup() {
createCanvas(600,200) 
trex=createSprite(50,180,20,50)
trex.addAnimation("running",trex_running)
trex.addAnimation("collided",trex_collided)
trex.scale=0.5

ground=createSprite(200,180,400,20)
ground.addImage(groundimage)
ground.x=ground.width/2
invisibleground=createSprite(200,190,400,10)
invisibleground.visible=false
ground.velocityX=-6
gameover=createSprite(300,100)
gameover.addImage(gameoverimage)
gameover.scale=0.5
restart=createSprite(300,140)
restart.addImage(restartimage)
restart.scale=0.5
gameover.visible=false
restart.visible=false
cloudsgroup=new Group()
obstaclesgroup=new Group()
}

function draw() {
background(255)
text("score :"+score,500,50)
text("Samuel's first webgame",10,50)
if (gamestate==="play") {
score+=1
ground.velocityX=-6
trex.changeAnimation("running",trex_running)
if (ground.x<0) {
ground.x=ground.width/2
}
if (keyDown("space")&& trex.y>=159) {
trex.velocityY=-12
}
trex.velocityY+=0.8
trex.collide(invisibleground)
spawnClouds()
spawnObstacles()
if (obstaclesgroup.isTouching(trex)) {
gamestate="end"
}
}
else if (gamestate==="end") {
gameover.visible=true
restart.visible=true
ground.velocityX=0
trex.velocityY=0    
obstaclesgroup.setVelocityXEach(0)
cloudsgroup.setVelocityXEach(0)
trex.changeAnimation("collided",trex_collided)
obstaclesgroup.setLifetimeEach(-1)
cloudsgroup.setLifetimeEach(-1)
if (mousePressedOver(restart)) {
reset()
}
}
drawSprites()

}

function spawnClouds() {
if (frameCount % 70===0) {
cloud=createSprite(600,120,40,10)
cloud.y=random(50,120)
cloud.addImage(cloudimage)
cloud.scale=0.5
cloud.velocityX=-3
cloud.lifetime=600/3
cloud.depth=trex.depth
trex.depth+=1
cloudsgroup.add(cloud   )
}
}

function spawnObstacles() {
if (frameCount % 60===0) {
obstacle=createSprite(600,165,10,40)
obstacle.velocityX=-6
var rand=Math.round(random(1,6))
switch(rand) {
case 1: obstacle.addImage(obstacle1)
break
case 2: obstacle.addImage(obstacle2)
break
case 3: obstacle.addImage(obstacle3)
break
case 4: obstacle.addImage(obstacle4)
break
case 5: obstacle.addImage(obstacle5)
break
case 6: obstacle.addImage(obstacle6)
break

}
obstacle.scale=0.5
obstacle.lifetime=600/6
obstaclesgroup.add(obstacle)
}
}

function reset() {
gamestate="play"
gameover.visible=false
restart.visible=false
obstaclesgroup.destroyEach()
cloudsgroup.destroyEach()
score=0

}