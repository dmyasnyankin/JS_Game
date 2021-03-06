import Ball from '../components/ball.js';
import Paddle from '../components/paddle.js';
import Brick from '../components/brick.js';

class Game {

    constructor(canvas, canvasContext, lives = 3){
        this.lives = 3;
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.ball = new Ball(canvas);
        this.brick = new Brick(this.colorRect, this.canvasContext, this.ball, this.score);
        this.paddle = new Paddle(this.ball, this.brick, canvas);
        this.ball.ballReset();
        this.brick.brickReset();

        this.updateAll = this.updateAll.bind(this);
        this.moveAll = this.moveAll.bind(this);
        this.drawAll = this.drawAll.bind(this);
        this.colorCircle = this.colorCircle.bind(this);
        this.colorRect = this.colorRect.bind(this);
        this.colorText = this.colorText.bind(this);

        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.startScreen = true;
        this.endScreen = false;
        //new
        this.score = 0;
        // this.dirChange = true;
        // this.distStart;
        // this.distEnd;
        // this.brick.isBrickAtColRow = this.brick.isBrickAtColRow.bind(this);
    }

    handleMouseClick() {
        if(this.startScreen) {
            this.lives = 3;
            this.startScreen = false;
        }

        if (this.endScreen){
            this.lives = 3;
            this.score = 0;
            this.endScreen = false;
        }
    }

    updateAll() {
        if(this.lives === 0){
            this.endScreen = true;
        }
        this.moveAll();
        this.drawAll();
    }

    moveAll() {
        if (this.ball.ballMove) {
            if (this.ball.ballY > this.canvas.height - this.paddle.PADDLE_THICKNESS) {
                this.lives -= 1;
            }
            this.ball.ballMove();
        }

        if (this.brick.ballBrickHandling(this.ball.ballX, this.ball.ballY, this.ball.ballSpeedX, this.ball.ballSpeedY)){
            this.score += 1;
        };
        // this.brick.ballBrickHandling(this.ball.ballX, this.ball.ballY, this.ball.ballSpeedX, this.ball.ballSpeedY);

        this.paddle.ballPaddleHandling();
    }

    drawAll() {
        //clear screen
        var backgroundImg = new Image();
        // backgroundImg.src = "./assets/wormhole.jpg";
        backgroundImg.src = "./assets/dark-stars.jpg";
        this.canvasContext.drawImage(backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
        // this.colorRect(0, 0, this.canvas.width, this.canvas.height, backgroundImg);
        //draw ball
        this.canvasContext.font = '30px sans-serif';

        if(this.startScreen){
            this.canvasContext.fillStyle = "white";
            this.canvasContext.fillText("Click to Begin", 310, 300);
            return;
        }
        this.canvasContext.fillStyle = "white";

        if(this.endScreen){
            this.canvasContext.fillStyle = "white";
            this.canvasContext.fillText(`Your Score: ${this.score}`, 300, 200);
            this.canvasContext.fillText("Click to Play Again", 275, 400);
            return;
        }
        this.canvasContext.fillStyle = "white";


        
        // if(this.ball.ballReset){
        //     this.lives -= 1;
        // }
        this.canvasContext.fillText(`Lives: ${this.lives}`, this.canvas.width-120, 40);
        
        this.canvasContext.fillText(`Score: ${this.score}`, this.canvas.width-780, 40);

        this.colorCircle(this.ball.ballX, this.ball.ballY, 10, "black");
        //draw paddle
        // this.colorRect(this.paddle.paddleX, this.canvas.height - this.paddle.PADDLE_DIST_FROM_EDGE, this.paddle.PADDLE_WIDTH, this.paddle.PADDLE_THICKNESS, 'white');
        var myImage = new Image();
        myImage.src = "./assets/grasspaddle.jpg";
        this.canvasContext.drawImage(myImage, this.paddle.paddleX, this.canvas.height - this.paddle.PADDLE_DIST_FROM_EDGE, this.paddle.PADDLE_WIDTH, this.paddle.PADDLE_THICKNESS);


        this.brick.drawBricks();

    }

    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
        this.canvasContext.fillStyle = fillColor;
        this.canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    }

    colorCircle(centerX, centerY, radius, fillColor) {
        this.canvasContext.fillStyle = "rgba(24, 183, 24, 0.8)";
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.ball.ballX, this.ball.ballY, 10, 0, Math.PI * 2, true);
        this.canvasContext.fill();
    }

    colorText(showWords, textX, textY, fillColor) {
        this.canvasContext.fillStyle = fillColor;
        this.canvasContext.fillText(showWords, textX, textY);
    }

    

}

export default Game;