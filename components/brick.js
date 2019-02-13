
class Brick {

    constructor(colorRect, canvasContext, ball){
        this.BRICK_W = 80;
        this.BRICK_H = 20;
        this.BRICK_GAP = 2;
        this.BRICK_COLS = 10;
        this.BRICK_ROWS = 14;
        this.brickGrid = new Array(this.BRICK_COLS * this.BRICK_ROWS);
        this.bricksLeft = 0;
        this.colorRect = colorRect;
        this.canvasContext = canvasContext;
        this.ball = ball;

        this.drawBricks = this.drawBricks.bind(this);
        this.rowColToArrayIndex = this.rowColToArrayIndex.bind(this);
        this.brickReset = this.brickReset.bind(this);
        this.isBrickAtColRow = this.isBrickAtColRow.bind(this);
        this.ballBrickHandling = this.ballBrickHandling.bind(this);
    }

    rowColToArrayIndex(col, row) {
        return col + this.BRICK_COLS * row;
    }

    drawBricks() {

        for (var eachRow = 0; eachRow < this.BRICK_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < this.BRICK_COLS; eachCol++) {

                var arrayIndex = this.rowColToArrayIndex(eachCol, eachRow);

                if (this.brickGrid[arrayIndex]) {

                    var myImage = new Image();
                    myImage.src = "./assets/redbrick.png";

                    this.canvasContext.drawImage(myImage, (this.BRICK_W * eachCol), (this.BRICK_H * eachRow), 70, 20);

                    // const img = document.getElementById("tilestyle");
                    // this.canvasContext.drawImage(img, 672, 240, 24, 24, (this.BRICK_W * eachCol), (this.BRICK_H * eachRow), 75, 17.5);

                    // this.colorRect(this.BRICK_W * eachCol, this.BRICK_H * eachRow, this.BRICK_W - this.BRICK_GAP, this.BRICK_H - this.BRICK_GAP, "white");

                } // end of is this brick here
            } // end of for each brick
        }// end of for each row
    } // end of drawBricks func

    brickReset() {
        this.bricksLeft = 0;
        for (var i = 0; i < 3 * this.BRICK_COLS; i++) {
            this.brickGrid[i] = false;
        }
        for (var i = 3 * this.BRICK_COLS; i < this.BRICK_COLS * this.BRICK_ROWS; i++) {
            this.brickGrid[i] = true;
            this.bricksLeft++;
        } // end of for each brick
    } // end of brickReset func

    isBrickAtColRow(col, row) {
        if (col >= 0 && col < this.BRICK_COLS &&
            row >= 0 && row < this.BRICK_ROWS) {
            var brickIndexUnderCord = this.rowColToArrayIndex(col, row);
            return this.brickGrid[brickIndexUnderCord];
        } else {
            return false;
        }

    }

    ballBrickHandling() {
        var ballBrickCol = Math.floor(this.ball.ballX / this.BRICK_W);
        var ballBrickRow = Math.floor(this.ball.ballY / this.BRICK_H);
        var brickIndexUnderBall = this.rowColToArrayIndex(ballBrickCol, ballBrickRow);
        // colorText(mouseBrickCol+","+mouseBrickRow+":"+brickIndexUnderMouse, 
        //             mouseX,mouseY, 'yellow');

        if (ballBrickCol >= 0 && ballBrickCol < this.BRICK_COLS &&
            ballBrickRow >= 0 && ballBrickRow < this.BRICK_ROWS) {

            if (this.isBrickAtColRow(ballBrickCol, ballBrickRow)) {
                this.brickGrid[brickIndexUnderBall] = false;
                this.bricksLeft--;

                var prevBallX = this.ball.ballX - this.ball.ballSpeedX;
                var prevBallY = this.ball.ballY - this.ball.ballSpeedY;
                var prevBrickCol = Math.floor(prevBallX / this.BRICK_W)
                var prevBrickRow = Math.floor(prevBallY / this.BRICK_H)

                var bothTestsFailed = true;

                if (prevBrickCol != ballBrickCol) {
                    if (this.isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                        this.ball.ballSpeedX *= -1;
                        bothTestsFailed = false;
                    }
                }

                if (prevBrickRow != ballBrickRow) {
                    if (this.isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
                        this.ball.ballSpeedY *= -1;
                        bothTestsFailed = false;
                    }
                }

                if (bothTestsFailed) { //armpit case, prevents ball from going thru
                    this.ball.ballSpeedX *= -1;
                    this.ball.ballSpeedY *= -1;
                }
            } //end of brick found
        } // end of valid col and row
    } //end of ballBrickHandling func
}

export default Brick;