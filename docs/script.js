function setupParticipants() {
    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const participantsDiv = document.getElementById('participants');
    participantsDiv.innerHTML = '';

    for (let i = 0; i < numPeople; i++) {
        const participantLabel = document.createElement('label');
        participantLabel.innerHTML = `Amount for Person ${i + 1}: `;
        
        const participantInput = document.createElement('input');
        participantInput.type = 'number';
        participantInput.min = '1';
        participantInput.value = '10'; // Default amount
        participantInput.id = `amount_${i}`; // Assign unique ID
        
        participantsDiv.appendChild(participantLabel);
        participantsDiv.appendChild(participantInput);
        participantsDiv.appendChild(document.createElement('br'));
    }
}

function spinRoulette() {
    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const amounts = [];

    for (let i = 0; i < numPeople; i++) {
        const amount = parseInt(document.getElementById(`amount_${i}`).value, 10);
        amounts.push(amount);
    }

    // Calculate the total amount
    const totalAmount = amounts.reduce((total, amount) => total + amount, 0);

    // Generate a random number between 0 and 1
    const randomValue = Math.random();

    // Calculate the winning probability based on the total amount
    const winningProbability = amounts.map(amount => amount / totalAmount);

    // Check if the random value is less than the winning probability
    const winnerIndex = winningProbability.findIndex(prob => randomValue < prob);

    if (winnerIndex !== -1) {
        displayResult(`Person ${winnerIndex + 1} won!`);
    } else {
        displayResult('Sorry, no one won this time. Try again!');
    }
    }

    function displayResult(message) {
    document.getElementById('result').innerHTML = message;

    // Generate a random color for the roulette display
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('roulette').style.color = randomColor;
    document.getElementById('roulette').innerHTML = '🎰';
}