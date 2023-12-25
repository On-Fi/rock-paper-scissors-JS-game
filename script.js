document.addEventListener('DOMContentLoaded', function () {
    const userEmoji = document.getElementById('user-emoji');
    const computerEmoji = document.getElementById('computer-emoji');
    const resultText = document.getElementById('result-text');

    function makeChoice(userChoice) {
        const computerChoice = generateComputerChoice();
        updateEmojis(userChoice, computerChoice);
        const result = determineWinner(userChoice, computerChoice);
        displayResult(result);
    }

    function generateComputerChoice() {
        const choices = ['🪨', '📄', '✌'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function updateEmojis(userChoice, computerChoice) {
        userEmoji.textContent = userChoice;
        computerEmoji.textContent = computerChoice;
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        } else if (
            (userChoice === '🪨' && computerChoice === '✌') ||
            (userChoice === '📄' && computerChoice === '🪨') ||
            (userChoice === '✌' && computerChoice === '📄')
        ) {
            return 'You win!';
        } else {
            return 'Computer wins!';
        }
    }

    function displayResult(result) {
        resultText.textContent = result;
    }

    // Attach the makeChoice function to each button click
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const userChoice = this.textContent;
            makeChoice(userChoice);
        });
    });
});
