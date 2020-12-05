let cvsWrapper = null;
let birdX,birdY;
let bgImg,backgroundImg;
let baseImg;
let birdArray
let birdW,birdH;
let barrierCounter=0;
let barrierArray,barrierArrayD;
let menu;
let gameOver;
let scoreArray;
let point;
let ghoast;
let die;
let wrong,lifePlus;
let heart,heart2;
let hit;
var flyCount=0
var slowDown=0;
var randomChoice;
var soundObj;
var barrier;
var barrierDown;
var Over;


// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets

function preload() {
	backgroundImg = ["day","night"].map(daytime=>loadImage("assets/sprites/background-"+`${daytime}.png`));
	baseImg = loadImage("assets/sprites/base.png");
	menu = loadImage("assets/sprites/message.png");
	birdArray= ["blue", "red", "yellow"].map(color => ["upflap", "midflap", "downflap"].map(flap => loadImage("assets/sprites/"+`${color}bird-${flap}.png`)));
	scoreArray= ["0","1","2","3","4","5","6","7","8","9"].map(number=> loadImage("assets/sprites/"+`${number}.png`));
	soundObj = loadSound("assets/audio/wing.ogg");
	die= loadSound('assets/audio/die.ogg');
	hit= loadSound('assets/audio/hit.ogg');
	wrong= loadSound('assets/audio/wrong.mp3');
	lifePlus= loadSound('assets/audio/lifeplus.mp3');

	point=loadSound("assets/audio/point.ogg");
	barrierArray =["green","red"].map(color=>loadImage("assets/sprites/pipe-"+`${color}-upper.png`));
	barrierArrayD =["green","red"].map(color=>loadImage("assets/sprites/pipe-"+`${color}-lower.png`));
	ghoast=loadImage("assets/sprites/ghoast.png")
	heart2=loadImage("assets/sprites/heart2.png")
	heart=loadImage("assets/sprites/heart.png")
	gameOver=loadImage("assets/sprites/gameover.png")
	};

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
     	cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
   
    myCanvas.parent("canvasWrapper");
  	//----------------bird-------------
  	birdW=birdArray[0][0].width;
  	birdH=birdArray[0][0].height;
	vy=0;	
	ay=0.6;
	aAng=0.02;
	birdX=width/2-birdW/2;
	//birdY=0;
	birdY=height/2+birdH/2;
	triAng=0;
	randomChoice=Math.floor(Math.random()*3);//for the wings flapping
	//----------------back-------------
	backRandom=Math.floor(Math.random() * 2);
	bgImg=backgroundImg[backRandom];
	menu.s=false;
	backgroundX=0;
	backgroundV=3;	
	bgScale=width/bgImg.width;
	Over=true;
	
	//----------------barrier-----------
	barrierRandom1=Math.floor(Math.random() * 120) + 50;
  	barrierRandom2=Math.floor(Math.random() * 120) + 50;
  	barrierRandom3=Math.floor(Math.random() * 120) + 50;
  	barrierRandom4=Math.floor(Math.random() * 120) + 50;
  	barriercolor=Math.floor(Math.random() * 2)
  	barrier=barrierArray[barriercolor];
  	barrierDown=barrierArrayD[barriercolor];
  	distance=160;
	barrierX=2*width;
	barrierX2=3*width;
	barrierA=1;
	//-----------------socre------------
	score=0;
	//----------------other--------------
	ghoastV=5;
	ghoastY=200;
	ghoastX=width;
	heartX=5/4*width;
	heartY=Math.floor(Math.random() * 250) + 180;
	life=0;
	};
	

	//-----------------------------------
function keyPressed() {
	if (keyCode===32 ){
		if(Over===true){
			vy=-10;//10
			triAng=-PI/4;
		};
		soundObj.play();
		menu.s=true;
		}

	if(keyCode===27){
	document.location.reload();
	clearInterval();};
	};
function endgame(){
	if(life>0){
		life-=1;
		wrong.play()
		birdY=-barrierRandom1+barrier.height+70;
		return;}

	if(Over===true){
		hit.play();
		die.play();
	}
	Over=false;
	backgroundV=0;
	ghoastV=0;
	if (birdY<height-baseImg.height-birdH){
		ay=0.5;
		if(triAng<=PI/2){
			aAng=0.05;
			birdX+=2;
		}
		else aAng=0;
	}
	if (birdY>height-baseImg.height-birdH){
		vy=0;
		ay=0;
		aAng=0;
		triAng=PI/2;
		birdY=height-baseImg.height-birdW;
		//birdX=width/2;
		noLoop();
		image(gameOver,width/2-gameOver.width/2,height/2+gameOver.height/2,gameOver.width,gameOver.height);
	};

	setTimeout('document.location.reload();clearInterval();',2000);

};


function draw() {
	//===========================Background=======================================

  	background(0);

  	image(bgImg, backgroundX,0,bgImg.width*bgScale,(height-baseImg.height));
  	image(bgImg, backgroundX+width,0,bgImg.width*bgScale,(height-baseImg.height));
  	backgroundX-=backgroundV;

  	if (backgroundX<=-width){
  		backgroundX=0;	
  	};
  	
  	if (menu.s===false){
  	image(baseImg,backgroundX,height-baseImg.height,baseImg.width*bgScale,baseImg.height);
  	image(baseImg,backgroundX+width,height-baseImg.height,baseImg.width*bgScale,baseImg.height);
  	image(menu,width/2-menu.width,height/2-menu.height,2*menu.width,2*menu.height);
  	};

  	//******************************Start********************************************
  	
  	if (menu.s===true){
  	//===========================Barrier==========================================
	  	barrierCounter+=1;
	 
	  	image(barrier,barrierX,-barrierRandom1,barrier.width,barrier.height);
	  	image(barrier,barrierX+width/2,-barrierRandom2,barrier.width,barrier.height);
	  	image(barrier,barrierX2,-barrierRandom3,barrier.width,barrier.height);
	  	image(barrier,barrierX2+width/2,-barrierRandom4,barrier.width,barrier.height);
	  	if(score>15){
		  	barrierRandom1+=barrierA;
		  	barrierRandom2-=barrierA;
		  	barrierRandom3+=barrierA;
		  	barrierRandom4-=barrierA;
		  	if(barrierCounter%70===0){
		  		console.log(barrierCounter)
		  		barrierCounter=0;
		  		barrierA=(-barrierA);
		  	}
	 	}

	  	image(barrierDown,barrierX,-barrierRandom1+barrier.height+distance,barrier.width,barrier.height);
	  	image(barrierDown,barrierX+width/2,-barrierRandom2+barrier.height+distance,barrier.width,barrier.height);
	  	image(barrierDown,barrierX2,-barrierRandom3+barrier.height+distance,barrier.width,barrier.height);
	  	image(barrierDown,barrierX2+width/2,-barrierRandom4+barrier.height+distance,barrier.width,barrier.height);

	  	barrierX-=backgroundV;
	  	barrierX2-=backgroundV;
	  	if (barrierX<-width){
	  		barrierX=width;
	  		barrierRandom1=Math.floor(Math.random() * 120) + 50;
	  		barrierRandom2=Math.floor(Math.random() * 120) + 50;
	  		console.log(barrierRandom1)
	  	};
	  	if (barrierX2<-width){
	  		barrierX2=width;
	  		barrierRandom3=Math.floor(Math.random() * 120) + 50;
	  		barrierRandom4=Math.floor(Math.random() * 120) + 50;
	  	};
	  	//====================Score===============================
	  	if((width/2+birdW*cos(triAng)/2>=barrierX && barrierX>=width/2-barrier.width)){
	  		if(birdY<=-barrierRandom1+barrier.height+birdH/2||birdY>=-barrierRandom1+barrier.height+distance-birdH/2){
	  			endgame();

	  		};
	  	};
	  	if((birdW*cos(triAng)/2>=barrierX && barrierX>=-barrier.width)){
	  		if(birdY<=-barrierRandom2+barrier.height+birdH/2||birdY>=-barrierRandom2+barrier.height+distance-birdH/2){
	  			endgame();
	  		};
	  	};
	  	if((width/2+birdW*cos(triAng)/2>=barrierX2 && barrierX2>=width/2-barrier.width)){
	  		if(birdY<=-barrierRandom3+barrier.height+birdH/2||birdY>=-barrierRandom3+barrier.height+distance-birdH/2){
	  			endgame();
	  		};
	  	};
	  	if((birdW*cos(triAng)/2>=barrierX2&& barrierX2>=-barrier.width)){
	  		if(birdY<=-barrierRandom4+barrier.height+birdH/2||birdY>=-barrierRandom4+barrier.height+distance-birdH/2){
	  			endgame();
	  		};
	  	};

	  	if(birdY>height-baseImg.height-birdH/2||birdY<0){
	  		endgame();
	  	};
		if(score<10){
	  		image(scoreArray[score],width/2,40,scoreArray[0].width,scoreArray[0].height);
	  	};
	  	if(score>9){
	  		image(scoreArray[score%10],width/2+scoreArray[0].width/2,40,scoreArray[0].width,scoreArray[0].height);
	  		image(scoreArray[int(score/10)],width/2-scoreArray[0].width/2,40,scoreArray[0].width,scoreArray[0].height);
	  	};
	  	
	  	if(barrierX<=width/2&&barrierX>width/2-backgroundV||barrierX<=0&&barrierX>-backgroundV||
	  		barrierX2<=width/2&&barrierX2>width/2-backgroundV||barrierX2<=0&&barrierX2>-backgroundV){
	  		score+=1;
	  		point.play();
	  	};
	//==================================heart========================================
	 	image(heart,30,30,30,30)
	 	if(heartX<=width/2+birdW/2&&heartX>width/2-birdW/2-30){
	 		if(heartY+30>=birdY-birdH/2&&heartY<=birdY+birdH/2){
		 		if(life<9){
		 			life+=1;
		 		}
		 		heartY=-50;
		 		lifePlus.play()
		 	}
	 	}

	 	image(scoreArray[life],70,30,20,30)

	 	if(score%10>=3&&score%10<6){
	 		if (heartX>=width-ghoastV){
	  		heartY=Math.floor(Math.random() * 250) + 180;
	  		};
	 		image(heart,heartX,heartY,30,30);
	 		heartX-=backgroundV;
	 		if(heartX<=-width/4){
	 			heartX=width+width/4;
	 		}
	 	}

	//==================================Ghoast=======================================
	  	
	  	if (score%5>=2&&score%5<=3){
	  		if (ghoastX>=width-ghoastV){
	  		ghoastY=Math.floor(Math.random() * 350) + 150
	  		};

			image(ghoast,ghoastX,ghoastY,40,40);
			ghoastX-=ghoastV;
			if (ghoastX<=-2/3*width-20){
				ghoastX=width;
			};
		}
		if(ghoastX+10<width/2+birdW/2*cos(triAng)&& ghoastX+30>width/2-birdW/2 ){
			if(ghoastY+30>=birdY-birdH/2&&ghoastY<=birdY+birdH/2){
				endgame();
			};
		};
		image(baseImg,backgroundX,height-baseImg.height,baseImg.width*bgScale,baseImg.height);
		image(baseImg,backgroundX+width,height-baseImg.height,baseImg.width*bgScale,baseImg.height);

  	//==================================Bird======================================
  	};	//end of start

	  	translate(birdX,birdY);
	  	if (menu.s===true){
		vy+=ay;
		birdY+=vy;
		triAng+=aAng;
	  }

		rotate(triAng);		
		image(birdArray[randomChoice][flyCount],0,0,birdW,birdH);
		
		if (flyCount===2){
			flyCount=0;
			};
		slowDown+=5;

		if(slowDown===20){
			flyCount+=1;slowDown=0
			};


};//end of draw

