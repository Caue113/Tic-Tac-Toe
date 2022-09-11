/**
 * TO-DO
 * 
 * -Create adequate gameloop
 *  1) Instantiate and create the GameCanvas to allow use of EventListener
 *  2) Adequate reset function (player properties, game visuals)
 *  3) Save player wins and losses
 * 
 * -Implement a way to put images inside Squares of Tic-Tac-Toe
 * 
 * -Small form asking player's name, any image to use in their squares, and a color pallete;* 
 */


/**
 * Hard coded stats for players. Future use objects to dynamically change them
 */

player1 = {
    name: "Zezinho",
    playerColor: "#ff4500",
    playerImage: "crayon.png",
    squaresSelected: [],
}
player2 = {
    name: "Luizinho",
    playerColor: "#0059ff",
    playerImage: "duck.png",
    squaresSelected: [],
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

    currentPlayer.squaresSelected.push(SquareNumber);


    UpdateSquare(SquareNumber);
    squareList[SquareNumber - 1].onclick = null;    //This is outside UpdateSquare because of next possible implementations

    // This is the intended way, however I hardcoded the "on click" directly on HTML--
    //  which means i cant use this remove event listener, only if i had used add event listener
    //squareList[SquareNumber - 1].removeEventListener("onclick",onclick);
    
    CheckVictoryConditions();

    ChangePlayer();
    UpdateMenu();
}

/**
 * Logic for HTML
 */


function UpdateSquare(SquareNumber){
    squareList[SquareNumber - 1].style.backgroundColor = currentPlayer.playerColor;
    
    //TO-DO -- RESIZE IMAGE TO FIT INSIDE LMAO
    //squareList[SquareNumber - 1].getElementsByTagName("img")[0].src = `img/${currentPlayer.playerImage}`;
}


function ChangePlayer(){
    currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
}

function UpdateMenu(){
    currentPlayerImage.src = `img/${currentPlayer.playerImage}`;
    currentPlayerImage.style.backgroundColor = currentPlayer.playerColor;
}



/**
 * Logic for Game and win conditions
 */


winSequences = [
    //Line sequences
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    //Column Sequences
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    //Diagonal Sequences
    [1, 5, 9],
    [3, 5, 7]
];

function CheckVictoryConditions(){

    //winSequences.every()
    //possible solution? https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array
    //Use winSequence as "every" and the playerBlocks as "include"

    let doPlayerWin;

    winSequences.forEach(sequence => {
        doPlayerWin = sequence.every(element => currentPlayer.squaresSelected.includes(element));

        if(doPlayerWin){
            let victoryMessage = document.createElement("h3");
            victoryMessage.innerText = `${currentPlayer.name} Ganhou!!`

            menu.append(victoryMessage);
            CreateReplayButton();
        }else{
            console.log("Player: " + currentPlayer.name + " não ganhou ainda");  
        }
    });
}


function CreateReplayButton(){
    //Configuring button
    let replayButton = document.createElement("button");
    replayButton.innerText = "Replay";
    replayButton.addEventListener("click", Replay);
    

    menu.append(replayButton);
}

function StopGame(){

}

function Replay(){
    //Clear current player sequences
    console.log("Replaying...")
    player1.squaresSelected = [];
    player2.squaresSelected = [];

    //Reset each square in GameCanvas
    //TO-DO - RESET WITHOUT DISRUPOTING CSS RULES
    for (let i = 0; i < squareList.length; i++) {
        console.log(i)
        squareList[i].style.backgroundColor = "#84c1e800"; //Default color in css
        squareList[i].onclick = `ChooseSquare(${i+1})`;       
    }

    //Set player 1 to play first
    currentPlayer = player1;
}