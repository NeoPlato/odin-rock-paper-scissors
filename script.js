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
 * Determines the winner of a rock-paper-scissors game using binary
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
    return 0 ^ (3+Player2-Player1) % 3;
}

function playRound(playerSelection, computer) {
    player = convertToBinaryChoice(playerSelection.toLowerCase());
    switch (determineWinner(player, computer)) {
        case 0:
            return `Draw: We are both ${convertToStringChoice(player)}`;
        case 1:
            return `Lose: ${convertToStringChoice(computer)} beats your ${convertToStringChoice(player)}`;
        case 2:
            return `Win: your ${convertToStringChoice(player)} beats ${convertToStringChoice(computer)}`;
        default:
            console.log(player, computer);
            return "What just happened???";
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        console.log(playRound(
            prompt("Enter your choice mate"),
            getComputerChoice()
        ))
    }
}