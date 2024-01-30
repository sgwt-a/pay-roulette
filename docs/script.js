function setupParticipants() {
    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const participantsDiv = document.getElementById('participants');
    participantsDiv.innerHTML = '';

    // 入力欄の説明
    const participantLabelName = document.createElement('label');
    participantLabelName.innerHTML = 'Name';

    const participantLabelAmount = document.createElement('label');
    participantLabelAmount.innerHTML = 'Amount';

    participantsDiv.appendChild(participantLabelName);
    participantsDiv.appendChild(participantLabelAmount);
    participantsDiv.appendChild(document.createElement('br'));

    for (let i = 0; i < numPeople; i++) {
        var participantInputName = document.createElement('input');
        participantInputName.type = 'text';  // テキストボックスを作成
        participantInputName.value = `Person ${i + 1}`; // Default Name
        participantInputName.id = `name_${i}`; // Assign unique ID
        
        var participantInputAmount = document.createElement('input');
        participantInputAmount.type = 'number';
        participantInputAmount.min = '1';
        participantInputAmount.value = '10'; // Default amount
        participantInputAmount.id = `amount_${i}`; // Assign unique ID
        
        participantsDiv.appendChild(participantInputName);
        participantsDiv.appendChild(participantInputAmount);
        participantsDiv.appendChild(document.createElement('br'));
    }
}

function spinRoulette() {
    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const CumulativeTotalAmount = [];
    var totalAmount = 0;

    for (let i = 0; i < numPeople; i++) {
        var amount = parseInt(document.getElementById(`amount_${i}`).value, 10);
        totalAmount += amount; 
        CumulativeTotalAmount.push(totalAmount);
    }

    // Generate a random number between 0 and 1
    const randomValue = Math.random();

    // Calculate the winning probability based on the total amount
    const winningProbability = CumulativeTotalAmount.map(amount => amount / totalAmount);

    // Check if the random value is less than the winning probability
    const winnerIndex = winningProbability.findIndex(prob => randomValue < prob);

    if (winnerIndex !== -1) {
        var winnerName = document.getElementById(`name_${winnerIndex}`).value;
        displayResult(`${winnerName} should pay!   ${totalAmount} yen!`);
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