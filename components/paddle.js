  
class Paddle {

    constructor(ball, brick, canvas){
        this.PADDLE_WIDTH = 100;
        this.PADDLE_THICKNESS = 10;
        this.PADDLE_DIST_FROM_EDGE = 60;
        this.paddleX = 400;
        this.canvas = canvas;

        this.brick = brick;
        this.ball = ball;
        this.mouseX = 0;
        this.mouseY = 0;

        this.updateMousePos = this.updateMousePos.bind(this);
        this.ballPaddleHandling = this.ballPaddleHandling.bind(this);
    }

    updateMousePos(e) {
        var rect = this.canvas.getBoundingClientRect();
        var root = document.documentElement;

        this.mouseX = e.clientX - rect.left - root.scrollLeft;
        this.mouseY = e.clientY - rect.top - root.scrollTop;

        this.paddleX = this.mouseX - this.PADDLE_WIDTH / 2;
    }

    ballPaddleHandling() {
        var paddleTopEdgeY = this.canvas.height - this.PADDLE_DIST_FROM_EDGE;
        var paddleBottomEdgeY = paddleTopEdgeY + this.PADDLE_THICKNESS;
        var paddleLeftEdgeX = this.paddleX;
        var paddleRightEdgeX = paddleLeftEdgeX + this.PADDLE_WIDTH;

        if (this.ball.ballY > paddleTopEdgeY && //below the top of paddle
            this.ball.ballY < paddleBottomEdgeY && //above bottom of paddle
            this.ball.ballX > paddleLeftEdgeX && //right of the left side of paddle
            this.ball.ballX < paddleRightEdgeX) { //left of the right side of paddle

            this.ball.ballSpeedY *= -1;

            var centerOfPaddleX = this.paddleX + this.PADDLE_WIDTH / 2;
            var ballDistFromPaddleCenterX = this.ball.ballX - centerOfPaddleX;
            this.ball.ballSpeedX = ballDistFromPaddleCenterX * 0.35;

            if (this.brick.bricksLeft == 0) {
                this.brick.brickReset();
            } //out of bricks
        } //ball center inside paddle
    } //  end of ball paddle handling
}

export default Paddle;