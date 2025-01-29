// Google Cloud Translation API Key 
const API_KEY = 'process.env.GOOGLE_API_KEY'; //  API key

// Define initial translation direction (English to Ewe by default)
let translationDirection = 'en-to-ee'; // 'en-to-ee' for English to Ewe, 'ee-to-en' for Ewe to English

// Function to translate text using Google Cloud Translation API
async function translateText(text) {
  const targetLanguage = translationDirection === 'en-to-ee' ? 'ee' : 'en'; // Choose target language based on direction
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
    }),
  });
  
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

// Language Widget
const translateBtn = document.getElementById('translate-btn');
const translationResult = document.getElementById('translation-result');
const toggleTranslateBtn = document.getElementById('toggle-translate');
const translateTitle = document.getElementById('translate-title');
const eweInput = document.getElementById('ewe-input');

translateBtn.addEventListener('click', async () => {
  const input = eweInput.value;
  if (input.trim() === '') {
    translationResult.textContent = 'Please enter a word or phrase.';
    return;
  }

  // Show loading spinner
  translationResult.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';

  try {
    const translatedText = await translateText(input);
    translationResult.textContent = `Translated: ${translatedText}`;
  } catch (error) {
    console.error('Translation error:', error);
    translationResult.textContent = 'Translation failed. Please try again.';
  }
});

// Toggle translation direction (Ewe to English or English to Ewe)
toggleTranslateBtn.addEventListener('click', () => {
  if (translationDirection === 'en-to-ee') {
    translationDirection = 'ee-to-en';
    translateTitle.textContent = 'Ewe to English Translator';
    toggleTranslateBtn.textContent = '⇄ Switch to English to Ewe';
  } else {
    translationDirection = 'en-to-ee';
    translateTitle.textContent = 'English to Ewe Translator';
    toggleTranslateBtn.textContent = '⇄ Switch to Ewe to English';
  }

  // Clear the input field when the direction is toggled
  eweInput.value = '';
  translationResult.textContent = '';
});

// Load and Display Quiz Data from chrome.storage.local
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizQuestionsDiv = document.getElementById('quiz-questions');
const quizOptionsDiv = document.getElementById('quiz-options');
const quizNextBtn = document.getElementById('quiz-next');
const quizScoreText = document.getElementById('quiz-score');

// Retrieve quiz questions from chrome.storage.local
function loadQuizQuestions() {
  chrome.storage.local.get(['quiz_data'], function(result) {
    if (result.quiz_data) {
      quizQuestions = result.quiz_data;
      shuffleAndSelectQuestions();
      displayQuestion();
      loadLeaderboard();  // Load the leaderboard when the quiz starts
    } else {
      console.log('No quiz data found!');
    }
  });
}

// Shuffle the quiz questions and pick 15 random questions
function shuffleAndSelectQuestions() {
  quizQuestions = quizQuestions.sort(() => Math.random() - 0.5); // Shuffle the questions
  quizQuestions = quizQuestions.slice(0, 15);  // Select the first 15 questions
}

// Display a Question
function displayQuestion() {
  const questionData = quizQuestions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  quizQuestionsDiv.textContent = `Question ${questionNumber}: ${questionData.question}`;
  quizOptionsDiv.innerHTML = '';

  questionData.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('quiz-option');
    button.addEventListener('click', () => checkAnswer(index, questionData)); 
    quizOptionsDiv.appendChild(button);
  });

  quizNextBtn.style.display = 'none'; // Hide next button initially
}

// Check the Answer
function checkAnswer(selectedIndex, questionData) {
  const optionButtons = document.querySelectorAll('.quiz-option');
  
  if (selectedIndex === questionData.correctAnswer) {
    score++;
    quizScoreText.textContent = `Score: ${score} (Correct!)`;
  } else {
    quizScoreText.textContent = `Score: ${score} (Wrong! Correct answer: ${questionData.options[questionData.correctAnswer]})`;
  }

  // Disable buttons after answering
  optionButtons.forEach(button => button.disabled = true);
  
  quizNextBtn.style.display = 'block'; // Show next button
}

// Move to Next Question
quizNextBtn.addEventListener('click', () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    // End the quiz, show final score
    document.getElementById('user-score').textContent = score;
    showResultSection();
  }
});

// Submit Score and Name/Email
document.getElementById('submit-score').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (name && email) {
    // Retrieve leaderboard data and add the new score
    chrome.storage.local.get(['leaderboard'], function(result) {
      let leaderboard = result.leaderboard || [];
      leaderboard.push({ name, email, score });
      leaderboard.sort((a, b) => b.score - a.score);
      leaderboard = leaderboard.slice(0, 5); // Keep top 5 scores
      chrome.storage.local.set({ leaderboard }, function() {
        console.log('Leaderboard updated!');
        displayLeaderboard(); // Display updated leaderboard
      });
    });

    // Disable the submit button after first submission
    document.getElementById('submit-score').disabled = true;
  }
});

// Show Result Section and Display Final Score
function showResultSection() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
}

// Display the leaderboard (top 5)
function displayLeaderboard() {
  chrome.storage.local.get(['leaderboard'], function(result) {
    let leaderboard = result.leaderboard || [];

    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = ''; // Clear current leaderboard

    // Display the top 5 scores
    leaderboard.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score}`; // Display name and score only
      leaderboardDiv.appendChild(li);
    });
  });
}

// Load leaderboard when quiz starts
function loadLeaderboard() {
  chrome.storage.local.get(['leaderboard'], function(result) {
    let leaderboard = result.leaderboard || [];
    
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = ''; // Clear existing leaderboard

    // Display top 5 scores immediately after loading
    leaderboard.slice(0, 5).forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score}`;
      leaderboardDiv.appendChild(li);
    });
  });
}

// Reset the quiz state and reload the quiz
document.getElementById('retake-quiz').addEventListener('click', () => {
  // Reset score, current question index and enable the submit button again
  score = 0;
  currentQuestionIndex = 0;

  document.getElementById('submit-score').disabled = false;

  // Hide the result section and show the quiz section again
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';

  // Clear the leaderboard and reset the score text
  document.getElementById('quiz-score').textContent = 'Score: 0';
  document.getElementById('leaderboard').innerHTML = '';

  // Reload quiz questions and start over
  loadQuizQuestions();
});

loadQuizQuestions();
