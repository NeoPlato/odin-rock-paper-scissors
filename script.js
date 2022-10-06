info = document.querySelector(".game-area .game-info");
imgContainer = document.querySelector(".game-area .img-container");
gameArea = document.querySelector(".game-area");
scoreArea = document.querySelector("div.score");
playerWins = document.querySelector("div.score span#player");
compWins = document.querySelector("div.score span#comp");
reset = document.querySelector(".game-area .reset");

function getComputerChoice() {
    // 0 = Rock, 1 = Paper, 2 = Scissors
    // The binary versions are more accurate in this case, 
    // since that is the underlying logic.
    return Math.floor(3 * Math.random());
}

function convertToBinaryChoice(choice) {
    // This is justified by the ever clever XOR function
    switch (choice) {
        case "rock":
            return 0;
        case "paper":
            return 1;
        case "scissors":
            return 2;
    }
}

function convertToStringChoice(choice) {
    plays = ["Rock", "Paper", "Scissors"];
    return plays[choice];
}

/**
 * Determines the winner of a rock-paper-scissors game using binary logic
 * @param {number} Player1 The first player
 * @param {number} Player2 The second player
 * @return {number} The winner of the game
 * 
 * Interpretation
 * 0 or 0b00: Draw
 * 1 or 0b01: Player 2 wins
 * 2 or 0b10: Player 1 wins
**/
function determineWinner(Player1, Player2) {
    return (3+Player2-Player1) % 3;
}

function playRound(playerBinary, computerBinary) {
    switch (determineWinner(playerBinary, computerBinary)) {
        case 0b00:
            return `Draw: We are both ${convertToStringChoice(playerBinary)}`;
        case 0b01:
            return `Lose: ${convertToStringChoice(computerBinary)} beats your ${convertToStringChoice(playerBinary)}`;
        case 0b10:
            return `Win: your ${convertToStringChoice(playerBinary)} beats ${convertToStringChoice(computerBinary)}`;
    }
}

// function refreshGame() {
//     gameArea.textContent = "";
// }

function startGame() {
    const spans = [
        ["player", "0"],
        ["hyphen", "-"],
        ["comp", "0"]
    ]
    spans.forEach(span => {
        let elem = document.createElement("span");
        elem.id = span[0];
        elem.innerText = span[1];
        scoreArea.appendChild(elem);
    })
}

function gameClick() {
    playerWins.parentNode.classList.remove("hide-me");
    images = document.querySelectorAll(".img-container img");
    images.forEach(img => imgContainer.removeChild(img));

    player = this.id;
    playerBinary = convertToBinaryChoice(player);

    compBinary = getComputerChoice();
    computer = convertToStringChoice(compBinary).toLowerCase();

    info.innerText = playRound(playerBinary, compBinary);
    playerImage = document.createElement("img");
    compImage = document.createElement("img");
    playerImage.src = `./img/${player}.png`;
    compImage.src = `./img/${computer}.png`;
    imgContainer.appendChild(playerImage);
    imgContainer.appendChild(compImage);

    switch (determineWinner(playerBinary, compBinary)) {
        case 0b10:
            playerWins.innerText = (+playerWins.innerText+1).toString();
            break;
        case 0b01:
            compWins.innerText = (+compWins.innerText+1).toString();
            break;
    }

    playerCount = +playerWins.innerText;
    compCount = +compWins.innerText;

    if (Math.max(playerCount, compCount) !== 5) return;

    // gameArea.textContent = "";
    info.classList.add("hide-me");
    imgContainer.classList.add("hide-me");
    playerWins.parentNode.classList.add("hide-me");
    
    paragraph = document.createElement("p");
    playerCount === 5 ? paragraph.innerText = "You Win!" :
                        paragraph.innerText = "You Lose!";
    paragraph.appendChild(document.createElement("br"));
    scoreboard = [playerWins.innerText, "-", compWins.innerText];
    scoreboard.forEach(span => {
        const elem = document.createElement("span");
        elem.innerText = span;
        paragraph.appendChild(elem);
    }); 
    button = document.createElement("button");
    button.innerText = "Play again!";
    reset.appendChild(paragraph);
    reset.appendChild(button);
    gameArea.appendChild(reset);
    playerWins.innerText = "0";
    compWins.innerText = "0";
    return;
}


playerChoices = document.querySelectorAll("#player img");
playerChoices.forEach(choice => choice.addEventListener("click", gameClick));