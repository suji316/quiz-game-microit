let currentQuiz = [];
let currentIndex = 0;
let score = 0;

// Quiz Data for Different Categories
const quizData = {
  history: [
    {
      question: "Who was the first president of India?",
      answers: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Indira Gandhi", "Mahatma Gandhi"],
      correct: 1
    },
    {
      question: "When did India gain independence?",
      answers: ["1942", "1947", "1950", "1962"],
      correct: 1
    },
    {
      question: "Who was the first woman Prime Minister of India?",
      answers: ["Indira Gandhi", "Sarojini Naidu", "Sonia Gandhi", "Pratibha Patil"],
      correct: 0
    },
    {
      question: "Which battle was fought between the Mughals and the Marathas in 1675?",
      answers: ["Battle of Panipat", "Battle of Plassey", "Battle of Sinhagad", "Battle of Haldighati"],
      correct: 3
    },
    {
      question: "Who wrote the Indian National Congress's first constitution in 1885?",
      answers: ["Lala Lajpat Rai", "Dadabhai Naoroji", "Bal Gangadhar Tilak", "A.O. Hume"],
      correct: 3
    }
  ],
  geography: [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
    },
    {
      question: "Which ocean is the largest in the world?",
      answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: "Which country has the most number of islands?",
      answers: ["USA", "Indonesia", "Sweden", "Philippines"],
      correct: 2
    },
    {
      question: "Which is the longest river in the world?",
      answers: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correct: 0
    },
    {
      question: "What is the largest desert in the world?",
      answers: ["Sahara Desert", "Kalahari Desert", "Arabian Desert", "Antarctic Desert"],
      correct: 3
    }
  ],
  polity: [
    {
      question: "Who is the current Prime Minister of India?",
      answers: ["Narendra Modi", "Manmohan Singh", "Amit Shah", "Rahul Gandhi"],
      correct: 0
    },
    {
      question: "Who is the President of India?",
      answers: ["Ram Nath Kovind", "Pranab Mukherjee", "A.P.J. Abdul Kalam", "Indira Gandhi"],
      correct: 0
    },
    {
      question: "Who was the first Speaker of the Lok Sabha?",
      answers: ["G.V. Mavalankar", "Indira Gandhi", "Jawaharlal Nehru", "Rajendra Prasad"],
      correct: 0
    },
    {
      question: "What is the minimum age for a candidate to be elected as the President of India?",
      answers: ["25", "30", "35", "40"],
      correct: 2
    },
    {
      question: "Who is the head of the Indian Parliament?",
      answers: ["Prime Minister", "President", "Speaker of the Lok Sabha", "Chief Justice"],
      correct: 2
    }
  ],
};

// Start quiz based on the selected category
function startQuiz(category) {
  console.log('Starting quiz for: ' + category); // Debugging line
  currentQuiz = quizData[category];
  currentIndex = 0;
  score = 0;
  document.querySelector("#quiz-title").textContent = category.charAt(0).toUpperCase() + category.slice(1) + " Quiz";
  document.querySelector("#quiz-container").style.display = "block";
  document.querySelector("#quiz-result").style.display = "none";
  showQuestion();
}

// Show questions dynamically
function showQuestion() {
  const questionData = currentQuiz[currentIndex];
  const questionEl = document.querySelector("#question");
  const answerButtons = document.querySelector("#answer-buttons");

  questionEl.textContent = questionData.question;
  answerButtons.innerHTML = "";

  questionData.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(index) {
  const correctIndex = currentQuiz[currentIndex].correct;
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.classList.add("correct");
    } else if (i === index) {
      btn.classList.add("incorrect");
    }
  });

  if (index === correctIndex) {
    score++;
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < currentQuiz.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// Display result after quiz completion
function showResult() {
  document.querySelector("#quiz-container").style.display = "none";
  const resultEl = document.querySelector("#quiz-result");
  resultEl.style.display = "block";

  let resultHtml = `
    <h3>Quiz Completed!</h3>
    <p>Your Score: ${score} / ${currentQuiz.length}</p>
    <h4>Correct Answers:</h4>
    <ul>
  `;

  currentQuiz.forEach((question, index) => {
    resultHtml += `
      <li><strong>${question.question}</strong><br> Your Answer: ${question.answers[index]} <br> Correct Answer: ${question.answers[question.correct]}</li>
    `;
  });

  resultHtml += `
    </ul>
    <button onclick="location.reload()">Start Again</button>
  `;
  resultEl.innerHTML = resultHtml;
}
