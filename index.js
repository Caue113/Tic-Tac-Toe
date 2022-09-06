
/**
 * Hard coded stats for players. Future use objects to dynamically change them
 */

player1 = {
    playerColor: "#ff4500",
    playerImage: "crayon.png",
}
player2 = {
    playerColor: "#0059ff",
    playerImage: "duck.png",
}




function Start(){
    
    gameCanvas = document.getElementById("gameCanvas");
    squareList = gameCanvas.getElementsByTagName("div");
    
    menu = document.getElementById("infoPartida");
    currentPlayerImage = document.getElementById("playerImage");


    currentPlayer = player1; //player1 always start
};



function ChooseSquare(SquareNumber){
    console.log(`Chosen square ${SquareNumber}`);


    squareList[SquareNumber - 1].style.backgroundColor = currentPlayer.playerColor;
    squareList[SquareNumber - 1].onclick = null;

    // This is the intended way, however I hardcoded the "on click" directly on HTML--
    //  which means i cant use this remove event listener, only if i had used add event listener
    //squareList[SquareNumber - 1].removeEventListener("onclick",onclick);
    
    ChangePlayer();
    UpdateMenu();
}


/*
TODO - IMPLEMENT IMAGE TO CHANGE WHILE IN GAME

function UpdateSquare(){
    squareList[SquareNumber - 1].style.backgroundColor = currentPlayer.playerColor;
    squareList[SquareNumber - 1].src = `img/${currentPlayer.playerImage}`;
}
*/

function ChangePlayer(){
    currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
}

function UpdateMenu(){
    currentPlayerImage.src = `img/${currentPlayer.playerImage}`;
    currentPlayerImage.style.backgroundColor = currentPlayer.playerColor;
}
