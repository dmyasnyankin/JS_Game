import Game from '../components/game.js';
 
class Ball {

    constructor(canvas, brickReset) {
        // this.brickReset = brickReset;
        this.canvas = canvas;
        this.ballX = 75;
        this.ballY = 75;
        this.ballSpeedX = 5;
        this.ballSpeedY = 7;

        this.ballMove = this.ballMove.bind(this);
        this.ballReset = this.ballReset.bind(this);

    }

    // function colorCircle(centerX, centerY, radius, fillColor) {
    //     this.canvasContext.fillStyle = "white";
    //     this.canvasContext.beginPath();
    //     this.canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    //     this.canvasContext.fill();
    // }

    ballMove() {
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
        
        if (this.ballX < 0 && this.ballSpeedX < 0.0) {//left
            this.ballSpeedX *= -1;
        }
        if (this.ballX > this.canvas.width && this.ballSpeedX > 0.0) {//right
            this.ballSpeedX *= -1;
        }
        if (this.ballY < 0 && this.ballSpeedY < 0.0) {
            this.ballSpeedY *= -1;//top
        }
        if (this.ballY > this.canvas.height) {//bottom
            // this.game.lives -= 1;
            this.ballReset();
            // this.brickReset();
            // ballSpeedY *= -1;
        }
    }

    ballReset() {
        this.ballX = this.canvas.width / 2;
        this.ballY = this.canvas.height / 2;
    }
}

export default Ball;


