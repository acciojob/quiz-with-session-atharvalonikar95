//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questionsDiv=document.getElementById("questions")
const submitBtn=document.getElementById("submit")
const score=document.getElementById("score")
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
let progress = {};

try {
  const stored = sessionStorage.getItem("progress");
  progress = stored ? JSON.parse(stored) : {};
} catch (e) {
  progress = {};
  sessionStorage.removeItem("progress");
}
// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
	  choiceElement.setAttribute("type", "radio");
	  choiceElement.setAttribute("name", question-${i});
	  choiceElement.setAttribute("value", choice);
	  // sessionStorage.setItem("progress",choice)
      if (progress[i] === choice) {
        choiceElement.checked = true;
        choiceElement.setAttribute("checked", "true");
      }
	  choiceElement.addEventListener("change", () => {
        progress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    // questionElement.appendChild(questionElement);
	questionsDiv.appendChild(questionElement)
  }
}
renderQuestions();
window.onload=function () {
  const savedScore = localStorage.getItem("score"); 
  if (savedScore !== null) {
    score.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

submitBtn.addEventListener('click',()=>{
  let total = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] === questions[i].answer) {
      total++;
    }
  }

  score.textContent = `Your score is ${total} out of 5.`;

  localStorage.setItem("score", total);
})

