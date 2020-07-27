var dog, database, foodS, foodStock, dogImg, dogHappyImg;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage("dog", dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("doge", dogHappyImg);
  }

  drawSprites();

  fill("blue");
  textSize(20);
  text("Remaining-Food: " + foodS, 170, 200);
  stroke("blue");
  text("Press UP_ARROW Key To Feed Drago Milk", 250, 250);

  console.log(foodS);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  } else {
    x--;
  }

  database.ref('/').update({
    Food: x
  })
}