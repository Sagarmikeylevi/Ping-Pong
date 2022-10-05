const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gamewidth = gameBoard.width;
const gameHeight = gameBoard.height;
const paddle1Color = "yellow";
const paddle2Color = "red";
const ballColor = "white";
const ballRadius = 7;
const paddleSpeed = 25;
let intervalId;
let ballSpeed = 1;
let ballX = gamewidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2score = 0;

let paddle1 = {
    width: 100,
    height: 12,
    x: gamewidth / 2 - 50,
    y: 0
};

let paddle2 = {
    width: 100,
    height: 12,
    x:gamewidth / 2 - 50,
    y: gameHeight - 12
};

window.addEventListener("keydown" , changeDirection);
resetBtn.addEventListener('click' , resetGame);

gameStart();

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalId = setTimeout(() =>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX , ballY);
        checkCollision();
        nextTick();
    },10);
};
function clearBoard(){
    ctx.fillStyle = " rgb(81, 0, 115)";
    ctx.fillRect(0 , 0 , gamewidth , gameHeight);
};
function drawPaddles(){
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x , paddle1.y , paddle1.width , paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x , paddle2.y , paddle2.width , paddle2.height);
};
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1) ballXDirection = 1;
    else ballXDirection = -1;
    
    if(Math.round(Math.random()) == 1) ballYDirection = 1;
    else ballYDirection = -1;

    ballX = gamewidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX , ballY);
    
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);

    
};
function drawBall(ballX , ballY){
    ctx.beginPath();
    ctx.fillStyle = ballColor;
    ctx.arc(ballX , ballY , ballRadius , 0 , Math.PI * 2);
    ctx.fill();
};
function checkCollision(){
    if(ballX  < 0 || ballX + ballRadius > gameBoard.width) ballXDirection *= -1;
    if(ballY < 0){
        player2score +=1;
        updateScore();
        createBall();
        return;
    }
    if(ballY + ballRadius > gameBoard.height){
        player1Score += 1;
        updateScore();
        createBall();
        return;
    }

    if(ballX >= paddle1.x && ballX <= (paddle1.x + paddle1.width+ ballRadius)){
        if(ballY <= paddle1.y + paddle1.height + ballRadius){
            ballY = paddle1.y + paddle1.height + ballRadius;
            ballYDirection *= -1;
            ballSpeed += 0.2;
        }
       
    }

    if(ballX >= paddle2.x && ballX <= (paddle2.x + paddle2.width+ ballRadius)){
        if(ballY >= paddle2.y - paddle2.height - ballRadius){
            ballY = paddle2.y - paddle2.height - ballRadius
            ballYDirection *= -1;
            ballSpeed += 0.2;
        }
       
    }
   
};
function changeDirection(e){
    const KeyPressed = e.key;
    const p1Left = "ArrowLeft";
    const p1Right = "ArrowRight";
    const p2Left = "a";
    const p2Right = "d";

    switch(KeyPressed){
        case(p1Left):
           if(paddle1.x > 0) paddle1.x -= paddleSpeed;
           break;
          
        case(p1Right):
           if(paddle1.x + paddle1.width < gameBoard.width)  paddle1.x += paddleSpeed;
           break;  
           
        case(p2Left):
           if(paddle2.x > 0) paddle2.x -= paddleSpeed;
           break;
          
        case(p2Right):
           if(paddle2.x + paddle2.width < gameBoard.width)  paddle2.x += paddleSpeed;
           break;   
    }


};
function updateScore(){
    scoreText.textContent =  player1Score + " : " + player2score;
};
function resetGame(){
    player1Score = 0;
    player2score = 0;

    paddle1 = {
        width: 100,
        height: 12,
        x: gamewidth / 2 - 50,
        y: 0
    };
    
    paddle2 = {
        width: 100,
        height: 12,
        x:gamewidth / 2 - 50,
        y: gameHeight - 12
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalId);
    gameStart();

};


