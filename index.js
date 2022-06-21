window.onload = () => {

    let totalFrames = 0;

 //   let obstaclesArr = [];

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

        class rectangleObject {
            constructor(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.velX = 0;
                this.velY = 0;
                this.width = width;
                this.height = height;
                
            }

            updatePosition () {
                this.x += this.velX;
                this.y += this.velY;
            }

            draw() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }            
        }

        class imageObject extends rectangleObject {
            constructor(x, y, width, height, imageElement) {
                super(x, y, width, height);
                this.image = imageElement;
            }
            draw() {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }
        
        const myRoad = new imageObject(0, 0, myCanvas.width, myCanvas.height, roadImg)
        const myBike = new imageObject(50, myCanvas.height - 150, 75, 75, bikeImg);

        function updateGame() {

           // totalFrames++;

           // if(totalFrames % 180 ===0) {
             //   console.log('3 seconds have passed')

               // let rectHeight = Math.floor((Math.random() * (myCanvas.height * 0.1)) + myCanvas.height * 0.05);

           //     let rectWidth = Math.floor(Math.random() * (myCanvas.height - rectHeight))
             //   obstaclesArr.push(new rectangleObject(rectHeight, 10, rectWidth, 300))
             //   console.log(obstaclesArr);
            

       
           myBike.updatePosition();
        //    for(let i = 0; i < obstaclesArr.length; i++) {
        //        obstaclesArr[i].x -= 1;
        //    }

            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
            myRoad.draw();
           // for(let i = 0; i < obstaclesArr.length; i++) {
           //     obstaclesArr[i].draw();
           // }
            myBike.draw();
        }

        roadImg.onload = () => {
            bikeImg.onload = () => {
                setInterval(updateGame, 16.67)
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