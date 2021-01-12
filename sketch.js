//Create variables here
var dog, happyDog, food, foodStock, database

function preload()
{
  //load images here
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();

  dog1 = createSprite(400,350,50,50);
  dog1.scale = 0.5;
  dog1.addImage(dog);

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background("lightBlue");

  textSize(20);
  text("Food Remaining:"+food, 600, 100)

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog1.addImage(happyDog)
  }

  drawSprites();
  //add styles here

}

function readStock(data) {
    food = data.val()
}

function writeStock(x) {
    if(x<=0){
      x = 0;
    }else{
      x = x-1;
    }

    database.ref('/').update({
      food:x
    })
}

