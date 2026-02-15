let trialCount = 0;

function setupParticipants() {

    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const participantsDiv = document.getElementById('participants');
    participantsDiv.innerHTML = '';

    // 入力欄の説明
    const participantLabel = document.createElement('label');
    participantLabel.innerHTML = 'Input Name and Amount !!';
    participantsDiv.appendChild(participantLabel);
    participantsDiv.appendChild(document.createElement('br'));

    for (let i = 0; i < numPeople; i++) {
        // 名前の入力欄を生成
        var participantInputName = document.createElement('input');
        participantInputName.type = 'text';  // テキストボックスを作成
        participantInputName.value = `Person ${i + 1}`; // Default Name
        participantInputName.id = `name_${i}`; // Assign unique ID
        
        // 金額の入力欄を生成
        var participantInputAmount = document.createElement('input');
        participantInputAmount.type = 'number';
        participantInputAmount.min = '1';
        participantInputAmount.value = '10'; // Default amount
        participantInputAmount.id = `amount_${i}`; // Assign unique ID
        
        participantsDiv.appendChild(document.createElement('br'));
        participantsDiv.appendChild(participantInputName);
        participantsDiv.appendChild(document.createElement('br'));
        participantsDiv.appendChild(participantInputAmount);
        participantsDiv.appendChild(document.createElement('br'));
    }
}

function calcWinProbability() {

    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const arrayAmount = [];
    var totalAmount = 0;

    for (let i = 0; i < numPeople; i++) {
        var amount = parseInt(document.getElementById(`amount_${i}`).value, 10);
        totalAmount += amount; 
        arrayAmount.push(amount);
    }

    // Calculate the winning probability based on the total amount
    const winningProbability = arrayAmount.map(amount => amount / totalAmount);
    
    // 確率の表示部分の生成
    const participantsDiv = document.getElementById('calcWinProb');
    participantsDiv.innerHTML = '';

    const participantLabel = document.createElement('label');
    participantLabel.innerHTML = '< Pay Probability >';
    participantsDiv.appendChild(document.createElement('br'));
    participantsDiv.appendChild(participantLabel);
    participantsDiv.appendChild(document.createElement('br'));
    participantsDiv.appendChild(document.createElement('br'));

    for (let i = 0; i < numPeople; i++) {
        var participantLabelName = document.createElement('label');
        participantLabelName.innerHTML = document.getElementById(`name_${i}`).value;

        var winProb = winningProbability[i] * 100;

        var participantLabelWinProb = document.createElement('label');
        participantLabelWinProb.innerHTML = ` : ${winProb.toFixed(1)} %`;

        participantsDiv.appendChild(participantLabelName);
        participantsDiv.appendChild(participantLabelWinProb);
        participantsDiv.appendChild(document.createElement('br'));
    }

}

function spinRoulette(winningProbability) {

    trialCount++;
    const numPeople = parseInt(document.getElementById('numPeople').value, 10);
    const cumulativeTotalAmount = [];
    var totalAmount = 0;

    for (let i = 0; i < numPeople; i++) {
        var amount = parseInt(document.getElementById(`amount_${i}`).value, 10);
        totalAmount += amount; 
        cumulativeTotalAmount.push(totalAmount);
    }

    // Calculate the winning probability based on the total amount
    winningProbability = cumulativeTotalAmount.map(amount => amount / totalAmount);
    // Generate a random number between 0 and 1
    const randomValue = Math.random();

    // Check if the random value is less than the winning probability
    const winnerIndex = winningProbability.findIndex(prob => randomValue < prob);

    if (winnerIndex !== -1) {
        var winnerName = document.getElementById(`name_${winnerIndex}`).value;
        displayResult(`${winnerName} should pay ${totalAmount} yen!\n(試行回数: ${trialCount})`);
    } else {
        displayResult(`Sorry, no one won this time. Try again!\n(試行回数: ${trialCount})`);
    }

}

function displayResult(message) {

    document.getElementById('result').innerHTML = message;

    // Generate a random color for the roulette display
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('roulette').style.color = randomColor;
    document.getElementById('roulette').innerHTML = '🎰';
}