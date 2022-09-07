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

function determineWinner(Player1, Player2) {
    // This next bit will look booky
    // Remember that 0 = Rock, 1 = Paper, 2 = Scissors
    // We can encode another set of binary results as follows:
    // 0 = Draw, 1 = Player2 wins, 2 = Player1 wins (convert to binary and it just makes sense)
    // Now, I noticed that the XOR works well enough when one guy is fixed as Rock
    // So the remaining booky bit is converting the second guy to relatively match Rock.
    // Example: Scissors VS Paper = 2 VS 1
    // Shift both down by 2 = 0 VS -1
    // Take remainder mod 3 = 0 VS 2 = Rock VS Scissors
    // Take the XOR = 00 ^ 10 = 10 = Player1 wins
    // Applies for the remainder case and the original case
    return 0 ^ (3+Player2-Player1) % 3;
}

function playRound(playerSelection, computer) {
    player = convertToBinaryChoice(playerSelection.toLowerCase());
    switch (0 ^ (computer - player + 3) % 3) {
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