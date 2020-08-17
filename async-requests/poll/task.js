const elPollTitle = document.getElementById('poll__title');
const elPollAnswersArea = document.getElementById('poll__answers');

function showResult(respText) {
    const statVotes = JSON.parse(respText).stat;
    const summVotes = statVotes.reduce((sum, item) => sum + item.votes, 0);
    let resultText = '';
    for (answer of statVotes) {
        resultText += `${answer.answer}: <strong>${(answer.votes / summVotes * 100).toFixed(2)}%</strong></br>`
    }
    elPollAnswersArea.innerHTML = resultText;
}

function sendAnswer(questionID, answerId) {
    const xhrSendAnswer = new XMLHttpRequest();
    xhrSendAnswer.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    xhrSendAnswer.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhrSendAnswer.addEventListener('readystatechange', () => {
        if (xhrSendAnswer.readyState === XMLHttpRequest.DONE && xhrSendAnswer.status === 200) {
            showResult(xhrSendAnswer.responseText)
        }
    });

    xhrSendAnswer.send(`vote=${questionID}&answer=${answerId}`);
}

function showQuestion(respText) {
    const response = JSON.parse(respText);
    const questionID = response.id;
    const questionData = response.data;
    elPollTitle.textContent = questionData.title;
    
    let answerButtonsHTML = '';
    for (answerIndex in questionData.answers) {
        answerButtonsHTML += `
        <button class="poll__answer" data-answer-id="${answerIndex}">
        ${questionData.answers[answerIndex]}
        </button>`;
    }
    elPollAnswersArea.innerHTML = answerButtonsHTML;

    const elAnswerButtons = elPollAnswersArea.querySelectorAll('.poll__answer');
    elAnswerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            setTimeout(alert, 0, 'Спасибо, ваш голос засчитан!');
            sendAnswer(questionID, Number(button.dataset.answerId));
        });
    });
}

function getNewQuestion() {
    const xhrGetQuestion = new XMLHttpRequest();
    xhrGetQuestion.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');

    xhrGetQuestion.addEventListener('readystatechange', () => {
        if (xhrGetQuestion.readyState === XMLHttpRequest.DONE && xhrGetQuestion.status === 200) {
            showQuestion(xhrGetQuestion.responseText)
        }
    });

    xhrGetQuestion.send();
}

getNewQuestion();