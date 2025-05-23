const questions = [
    {
        question: "Qual é o principal objetivo da plataforma StudyPlaza?",
        options: [
            "Oferecer videoaulas para concursos",
            "Criar uma rede social para professores",
            "Promover o aprendizado colaborativo entre estudantes",
            "Fornecer apenas cursos pagos"
        ],
        answer: "Promover o aprendizado colaborativo entre estudantes"
    },
    {
        question: "Como a IA é usada na StudyPlaza?",
        options: [
            "Para corrigir provas escritas automaticamente",
            "Para sugerir temas de redação",
            "Para gerar quizzes personalizados com base no conteúdo compartilhado",
            "Para gravar vídeos explicativos com avatares"
        ],
        answer: "Para gerar quizzes personalizados com base no conteúdo compartilhado"
    },
    {
        question: "Por que a StudyPlaza é considerada acessível para diferentes perfis de estudantes?",
        options: [
            "Porque só funciona em escolas conveniadas",
            "Porque exige dedicação em horário fixo",
            "Porque oferece recursos acessíveis e flexíveis em diferentes dispositivos",
            "Porque obriga o uso de computador avançado"
        ],
        answer: "Porque oferece recursos acessíveis e flexíveis em diferentes dispositivos"
    }
];

let current = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    resultEl.textContent = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const correct = questions[current].answer;
    if (selected === correct) {
        resultEl.textContent = "✅ Resposta correta!";
        resultEl.style.color = "#2e7d32";
    } else {
        resultEl.textContent = `❌ Resposta incorreta. Resposta correta: ${correct}`;
        resultEl.style.color = "#c62828";
    }

    setTimeout(() => {
        current++;
        if (current < questions.length) {
            showQuestion();
        } else {
            questionEl.textContent = "Parabéns, você completou o quiz!";
            optionsEl.innerHTML = "";
            resultEl.innerHTML = "";
        }
    }, 2000);
}

showQuestion();