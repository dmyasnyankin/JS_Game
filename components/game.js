import Ball from '../components/ball.js';
import Paddle from '../components/paddle.js';
import Brick from '../components/brick.js';

class Game {

    constructor(canvas, canvasContext){
        this.lives = 3;
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.ball = new Ball(canvas);
        this.brick = new Brick(this.colorRect, this.canvasContext, this.ball);
        this.paddle = new Paddle(this.ball, this.brick, canvas);
        this.ball.ballReset();
        this.brick.brickReset();

        this.updateAll = this.updateAll.bind(this);
        this.moveAll = this.moveAll.bind(this);
        this.drawAll = this.drawAll.bind(this);
        this.colorCircle = this.colorCircle.bind(this);
        this.colorRect = this.colorRect.bind(this);
        this.colorText = this.colorText.bind(this);
    }

    updateAll() {
        this.moveAll();
        this.drawAll();
    }

    moveAll() {
        this.ball.ballMove();

        this.brick.ballBrickHandling(this.ball.ballX, this.ball.ballY, this.ball.ballSpeedX, this.ball.ballSpeedY);

        this.paddle.ballPaddleHandling();
    }

    drawAll() {
        //clear screen
        this.colorRect(0, 0, this.canvas.width, this.canvas.height, "black");
        //draw ball
        this.colorCircle(this.ball.ballX, this.ball.ballY, 10, "white");
        //draw paddle
        this.colorRect(this.paddle.paddleX, this.canvas.height - this.paddle.PADDLE_DIST_FROM_EDGE, this.paddle.PADDLE_WIDTH, this.paddle.PADDLE_THICKNESS, 'white');

        this.brick.drawBricks();

    }

    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
        this.canvasContext.fillStyle = fillColor;
        this.canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    }

    colorCircle(centerX, centerY, radius, fillColor) {
        this.canvasContext.fillStyle = "white";
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