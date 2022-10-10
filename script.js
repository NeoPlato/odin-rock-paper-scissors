info = document.querySelector(".game-area .game-info");
imgContainer = document.querySelector(".game-area .img-container");
gameArea = document.querySelector(".game-area");
scoreArea = document.querySelector("div.score");
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
    });

    const images = ["player", "comp"]
    images.forEach(img => {
        let elem = document.createElement("img");
        elem.id = img;
        imgContainer.appendChild(elem);
    });

    document.querySelectorAll("div#player.select img").forEach(
        choice => choice.removeEventListener("click", startGame)
    );
}

function resetImage(person, choice) {
    img = document.querySelector(`div.img-container img#${person}`);
    img.src = `./img/${choice.toLowerCase()}.png`;
}

function playRound(player) {
    let info = "";
    const playerBinary = convertToBinaryChoice(player);
    const compBinary = getComputerChoice();
    const result = determineWinner(playerBinary, compBinary);

    player = convertToStringChoice(playerBinary);
    comp = convertToStringChoice(compBinary);
    
    switch (result) {
        case 0b00:
            info = `Draw: We are both ${player}`;
            break;
        case 0b01:
            info = `Lose: ${comp} beats your ${player}`;
            winner = document.querySelector(".game-area div.score span#comp");
            winner.innerText = (+winner.innerText+1).toString();
            break;
        case 0b10:
            info = `Win: your ${player} beats ${comp}`;
            winner = document.querySelector(".game-area div.score span#player");
            winner.innerText = (+winner.innerText+1).toString();
            break;
    }

    gameInfo = document.querySelector(".game-area .game-info");
    gameInfo.innerText = info;

    resetImage("player", player);
    resetImage("comp", comp);
}

function getPlayerScore() {
    player = document.querySelector(".game-area div.score span#player");
    return +player.innerText;
}

function getCompScore() {
    comp = document.querySelector(".game-area div.score span#comp");
    return +comp.innerText
}

function isGameOver(maxScore=5) {
    return Math.max(getPlayerScore(), getCompScore()) === maxScore;
}

function refreshGame(maxScore=5) {
    paragraph = document.createElement("p");
    getPlayerScore() === maxScore ? 
        paragraph.innerText = "You Win!" :
        paragraph.innerText = "You Lose!";
    paragraph.appendChild(document.createElement("br"));

    scoreboard = document.querySelectorAll(".game-area div.score span");
    scoreboard.forEach(span => {
        const elem = document.createElement("span");
        elem.innerText = span.innerText;
        paragraph.appendChild(elem);
    });
    buttonLink = document.createElement("a");
    buttonLink.href = "./";
    button = document.createElement("button");
    button.innerText = "Play again!";
    buttonLink.appendChild(button);
    reset.appendChild(paragraph);
    reset.appendChild(buttonLink);

    imgContainer.textContent = "";
    gameInfo.textContent = "";
    scoreArea.textContent = "";
}

function gameClick() {
    player = this.id;
    const maxScore = 5;
    playRound(player);

    if (isGameOver(maxScore)) {
        refreshGame(maxScore);
    }
}