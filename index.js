window.onload = () => {

    let totalFrames = 0;

    let obstaclesArr = [];

    let intervalId = null;

    document.getElementById('start-button').onclick = () => {
        startGame();
        
    };

    function startGame() {

        const myCanvas = document.querySelector('canvas');
        const ctx = myCanvas.getContext('2d');

        const roadImg = new Image();
        roadImg.src = './images/background.png';

        const bikeImg = new Image();
        bikeImg.src =  './images/character.png';

        const obstacleImg = new Image();
        obstacleImg.src = './images/obstacles.png';

        class rectangleObject {
            constructor(x, y, width, height, hitboxX, hitboxY, hitboxWidth, hitboxHeight) {
                this.x = x;
                this.y = y;
                this.velX = 0;
                this.velY = 0;
                this.width = width;
                this.height = height;
                this.hitboxX = hitboxX;
                this.hitboxY = hitboxY;
                this.hitboxWidth = hitboxWidth;
                this.hitboxHeight = hitboxHeight;
                
            }

            updatePosition () {
                this.x += this.velX;
                this.y += this.velY;
                this.hitboxX += this.velX;
                this.hitboxY += this.velY;
            }

            draw() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }   
            
            left() {
                return this.hitboxX;
            }
            right() {
                return this.hitboxX + this.hitboxWidth;
            }
            top() {
               return this.hitboxY;
            }
            bottom() {
                return this.hitboxY + this.hitboxHeight;
            }
            crashWith(obstacle) {
                if (this.hitboxX < obstacle.hitboxX + obstacle.hitboxWidth &&
                    this.hitboxX + this.hitboxWidth > obstacle.hitboxX &&
                    this.hitboxY < obstacle.hitboxY + obstacle.hitboxHeight &&
                    this.hitboxHeight + this.hitboxY > obstacle.hitboxY) {
                    // collision detected!
                    return true;
                } else {
                    // no collision
                    return false;
                }
            }
        }

        class imageObject extends rectangleObject {
            constructor(x, y, width, height, hitboxX, hitboxY, hitboxWidth, hitboxHeight, imageElement) {
                super(x, y, width, height, hitboxX, hitboxY, hitboxWidth, hitboxHeight);
                this.image = imageElement;
            }
            draw() {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            drawHitBox () {
                ctx.strokeRect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight);
            }
        }
        
        const myRoad = new imageObject(0, 0, myCanvas.width, myCanvas.height, null, null, null, null, roadImg);
        const myBike = new imageObject(50, myCanvas.height - 150, 75, 75, 50, myCanvas.height - 105, 75, 30, bikeImg);
        //const myObstacle = new imageObject(myCanvas.width, myCanvas.height - 225, 40, 40, obstacleImg);

        function updateGame() {
            roadMargin();
            totalFrames++;

            if(totalFrames % 240 ===0) {
            
               let randomObstacleYposition = Math.round(Math.random() * ((myCanvas.height - 40 - 80) - (myCanvas.height - 270))) + (myCanvas.height - 270);
               obstaclesArr.push(new imageObject(myCanvas.width, randomObstacleYposition, 40, 40, myCanvas.width, randomObstacleYposition, 40, 40, obstacleImg));
            }

       
           myBike.updatePosition();

           //obstacle movement
           for(let i = 0; i < obstaclesArr.length; i++) {
                obstaclesArr[i].x -= 1;
                obstaclesArr[i].hitboxX -= 1;
                if (myBike.crashWith(obstaclesArr[i])) {
                    clearInterval(intervalId);
                    alert ('You Lost!')
                };
             }

            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
            
            myRoad.draw();
            
            for(let i = 0; i < obstaclesArr.length; i++) {
                obstaclesArr[i].draw();
                obstaclesArr[i].drawHitBox();
            }
            
            myBike.draw();
            myBike.drawHitBox();
            
        }

        function roadMargin () {
            let roadLeft = 10;
            let roadRight = myCanvas.width - myBike.width - 10;
            let roadBottom = myCanvas.height - myBike.height - 80;
            let roadTop = myCanvas.height - 300;
            if (myBike.y > roadBottom) {
                myBike.y = roadBottom;
                myBike.velY = 0;               
            }
            if (myBike.y < roadTop ) {
                myBike.y = roadTop;
                myBike.velY = 0;
            }
            if (myBike.x < roadLeft) {
                myBike.x = roadLeft;
                myBike.velX = 0;
            }
            if (myBike.x > roadRight) {
                myBike.x = roadRight;
                myBike.velX = 0;
            }
            
        }

        roadImg.onload = () => {
            bikeImg.onload = () => {
                intervalId = setInterval(updateGame, 16.67)
            }
            
        }

        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'ArrowUp':
                    myBike.velY -= 2;
                    break;
                case 'ArrowDown':
                    myBike.velY += 2;
                    break;
                case 'ArrowLeft':
                    myBike.velX -= 2;
                    break;
                case 'ArrowRight':
                    myBike.velX += 2;
                    break;
            }
        })

        document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'ArrowUp':
                    myBike.velY = 0;
                    break;
                case 'ArrowDown':
                    myBike.velY = 0;
                    break;
                case 'ArrowLeft':
                    myBike.velX = 0;
                    break;
                case 'ArrowRight':
                    myBike.velX = 0;
                    break;
            }
        })
    }
}