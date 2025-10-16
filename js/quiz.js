const questions = [
    {
        questionKey: "quiz.questions.q1.question",
        optionsKeys: [
            "quiz.questions.q1.options.1",
            "quiz.questions.q1.options.2",
            "quiz.questions.q1.options.3",
            "quiz.questions.q1.options.4"
        ],
        answerKey: "quiz.questions.q1.answer"
    },
    {
        questionKey: "quiz.questions.q2.question",
        optionsKeys: [
            "quiz.questions.q2.options.1",
            "quiz.questions.q2.options.2",
            "quiz.questions.q2.options.3",
            "quiz.questions.q2.options.4"
        ],
        answerKey: "quiz.questions.q2.answer"
    },
    {
        questionKey: "quiz.questions.q3.question",
        optionsKeys: [
            "quiz.questions.q3.options.1",
            "quiz.questions.q3.options.2",
            "quiz.questions.q3.options.3",
            "quiz.questions.q3.options.4"
        ],
        answerKey: "quiz.questions.q3.answer"
    }
];

let current = 0;
let correctCount = 0;
let wrongCount = 0;
let lastResult = null;
let quizFinished = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

function getCurrentLanguage() {
    if (window.translationSystem) {
        return window.translationSystem.currentLanguage;
    }
    try {
        const stored = localStorage.getItem('studyplaza-language');
        if (stored) {
            return stored;
        }
    } catch (e) {
        // ignore
    }
    return 'pt';
}

function translate(key) {
    const lang = getCurrentLanguage();
    return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function renderQuestionContent() {
    const questionData = questions[current];
    questionEl.textContent = translate(questionData.questionKey);
    optionsEl.innerHTML = "";
    questionData.optionsKeys.forEach(optionKey => {
        const btn = document.createElement("button");
        btn.textContent = translate(optionKey);
        btn.onclick = () => checkAnswer(optionKey);
        optionsEl.appendChild(btn);
    });
    progressBar.style.width = `${(current / questions.length) * 100}%`;
}

function renderResultMessage() {
    if (!lastResult) {
        resultEl.textContent = "";
        return;
    }

    if (lastResult.type === 'correct') {
        resultEl.textContent = translate('quiz.correct');
        resultEl.style.color = "#45b94bff";
    } else if (lastResult.type === 'incorrect') {
        resultEl.textContent = `${translate('quiz.incorrect.prefix')} ${translate(lastResult.answerKey)}`;
        resultEl.style.color = "#720000ff";
    }
}

function renderCurrentState() {
    if (quizFinished) {
        renderFinalResult();
    } else {
        renderQuestionContent();
        renderResultMessage();
    }
}

function checkAnswer(selectedKey) {
    const correctKey = questions[current].answerKey;
    if (selectedKey === correctKey) {
        correctCount++;
        lastResult = { type: 'correct' };
    } else {
        wrongCount++;
        lastResult = { type: 'incorrect', answerKey: correctKey };
    }

    renderResultMessage();

    setTimeout(() => {
        current++;
        if (current < questions.length) {
            lastResult = null;
            renderQuestionContent();
        } else {
            showFinalResult();
        }
    }, 2000);
}

function renderFinalResult() {
    questionEl.textContent = translate('quiz.final.title');
    optionsEl.innerHTML = "";
    resultEl.innerHTML = `
        <p>${translate('quiz.final.success')} <strong>${correctCount}</strong></p>
        <p>${translate('quiz.final.fail')} <strong>${wrongCount}</strong></p>
        <p>${translate('quiz.final.cta')}</p>
    `;
    resultEl.style.color = "inherit";
    progressBar.style.width = "100%";
}

function showFinalResult() {
    quizFinished = true;
    lastResult = null;
    renderFinalResult();
}

document.addEventListener('languageChanged', () => {
    renderCurrentState();
});

renderCurrentState();