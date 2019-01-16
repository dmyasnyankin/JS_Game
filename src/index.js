import _ from 'lodash';
import Game from '../components/game.js';

var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    
    const game = new Game(canvas, canvasContext);
    setInterval(game.updateAll, 1000 / framesPerSecond)
    canvas.addEventListener('mousemove', game.paddle.updateMousePos);
}

