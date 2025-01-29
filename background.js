// Show a notification
function showDailyFactNotification(fact) {
    chrome.notifications.create('dailyFact', {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Daily Ewe Fact',
      message: `Ewe Culture Daily: ${fact}`,
    });
}
chrome.action.onClicked.addListener(() => {
    // Open the side panel when the extension icon is clicked
    chrome.sidePanel.setOptions({
      path: 'sidepanel.html',  // Path to your side panel content
      enabled: true
    });
  });
  
// Get a random daily fact
function getRandomFact() {
  chrome.storage.local.get(['daily_facts'], function(result) {
    if (result.daily_facts) {
      const facts = result.daily_facts;
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      showDailyFactNotification(randomFact.fact);  // Show a random fact from daily_facts array
    } else {
      console.log('No daily facts found!');
    }
  });
}

// Store all quiz questions and daily facts
function storeQuizAndFacts() {
    const quizData = [
      { question: "What does the proverb 'A person in a river does not say the crocodile is suffering from stomachache' mean in Ewe philosophy?", 
        options: ["It emphasizes that personal experience is valuable", "It suggests that those with no experience should challenge experts", "It highlights trusting others"], 
        correctAnswer: 0 },
      { question: "What is the Ewe concept of 'adanu/anyasa'?", 
        options: ["Knowledge gained through reading", "Wisdom used to discern truth", "Practical knowledge acquired through formal education"], 
        correctAnswer: 1 },
      { question: "Which of the following is considered a 'bad job' according to Ewe cultural values?", 
        options: ["Farming", "Stealing", "Teaching"], 
        correctAnswer: 1 },
      { question: "What does the Ewe proverb 'Nunya adidoe, asi metune o' suggest about wisdom?", 
        options: ["Wisdom is limitless and always accessible", "Wisdom is like a baobab tree, and no one person can fully grasp it", "Wisdom is only acquired through written documentation"], 
        correctAnswer: 1 },
      { question: "What does the Ewe concept of 'Mawu/Se' represent?", 
        options: ["The concept of Supreme God", "The concept of death and eternity", "The concept of siblinghood"], 
        correctAnswer: 0 },
      { question: "What is the Ewe concept of 'Dzogbese'?",
        options: ["Destiny/Fate", "Wisdom", "Life After Death", "Reincarnation"],
        correctAnswer: 0 },
      { question: "In Ewe philosophy, what does 'Mawu/Se' represent?", 
        options: ["Supreme God", "Ancestor Worship", "Spiritual Communication", "Life and Death"],
        correctAnswer: 0 },
      { question: "What does 'Amegbeto' refer to in Ewe ontology?",
        options: ["The concept of human being", "The concept of the Supreme God", "Life and Death", "Spiritual Communication"], 
        correctAnswer: 0 },
      { question: "Which of the following is considered a 'bad job' in Ewe cultural values?",
        options: ["Farming", "Stealing", "Teaching", "Craftsmanship"],
        correctAnswer: 1 },
      { question: "What does 'Ku and Tsiefe' refer to in Ewe culture?",
        options: ["Death and Eternity", "Supreme Being", "Wisdom and Knowledge", "Fate and Destiny"],
        correctAnswer: 0 },
      { question: "What does the Ewe concept of 'Ame' mean?",
        options: ["Human Being", "Spiritual Leader", "Wisdom", "Community"],
        correctAnswer: 0 },
      { question: "Which tree is compared to wisdom in Ewe philosophy?",
        options: ["Baobab", "Palm Tree", "Mango Tree", "Fig Tree"],
        correctAnswer: 0 },
      { question: "What is the meaning of 'Fiadodo' in Ewe society?",
        options: ["The process of installing a king", "A traditional song", "A spiritual ritual", "A type of dance"],
        correctAnswer: 0 },
      { question: "What does the Ewe proverb 'A person in a river does not say the crocodile is suffering from stomachache' mean?",
        options: ["A person who has not experienced an event should not doubt others' experiences", "Knowledge is only gained through formal education", "Only the young should challenge the elderly"],
        correctAnswer: 0 },
      { question: "What is 'Amewuga' in Ewe culture?",
        options: ["Human is more valuable than riches", "Wisdom is supreme", "A form of community greeting", "A spiritual ritual"],
        correctAnswer: 0 },
      { question: "In Ewe society, what is more valuable than money?",
        options: ["Human life", "Land", "Wealth", "Status"],
        correctAnswer: 0 },
      { question: "What does 'Ame la ku' mean in Ewe culture?",
        options: ["The person is dead", "The person is wise", "The person is blessed", "The person is a leader"],
        correctAnswer: 0 },
      { question: "What is the role of 'Novi' in Ewe society?",
        options: ["Sibling", "Wisdom", "Leader", "Ancestor"],
        correctAnswer: 0 },
      { question: "Which concept in Ewe society emphasizes the value of human life over riches?",
        options: ["Ame", "Mawu", "Efe", "Dzogbese"],
        correctAnswer: 0 },
      { question: "What does 'Gbadoname' refer to in Ewe culture?",
        options: ["The humanistic value of greeting", "The humanistic value of respect", "The humanistic value of love", "The humanistic value of leadership"],
        correctAnswer: 0 },
      { question: "What does 'Fiadodo' represent?",
        options: ["A ceremony to install leaders", "A type of traditional song", "A form of community dance", "A spiritual act"],
        correctAnswer: 0 },
      { question: "Which animal represents resilience in Ewe culture?",
        options: ["Lion", "Elephant", "Crocodile", "Snake"],
        correctAnswer: 2 },
      { question: "In Ewe culture, what is the concept of 'Fowo lable miawoa'?",
        options: ["Will the Fon deceive us?", "Is the king angry?", "Can a child lead?", "What is the meaning of wisdom?"],
        correctAnswer: 0 },
      { question: "What does the Ewe concept of 'Ame la ku' suggest about death?",
        options: ["The person is dead", "Death is not the end", "The person has passed on to a better place", "Life continues in other forms"],
        correctAnswer: 0 }              
      // Add 45 more quiz questions here...
    ];
  
    const dailyFacts = [
      { fact: "Ewe culture emphasizes wisdom like a baobab tree.", explanation: "It grows with time and experience." },
      { fact: "The Ewe Supreme Being is Mawu/Se.", explanation: "Mawu/Se embodies all creation and existence." },
      { fact: "The Ewe have a trinity concept that is expressed in multiple aspects of their belief system.", explanation: "Ewe metaphysical knowledge includes a trinity that connects the Supreme God, the world of spirits, and nature." },
      { fact: "Ewe music plays an important role in education, transmitting cultural knowledge through songs, proverbs, and storytelling.", explanation: "Ewe musical traditions serve as a means of preserving and sharing indigenous knowledge." },
      { fact: "The Ewe people are primarily located in Ghana, Togo, and Benin.", explanation: "The Ewe's historical and geographical presence is spread across these three countries." },
      { fact: "Ewe culture emphasizes wisdom like a baobab tree, which grows with time and experience.", explanation: "This reflects the deep-rooted cultural respect for knowledge." },
      { fact: "The Ewe Supreme Being is Mawu/Se, embodying all creation and existence.", explanation: "Mawu/Se is central to Ewe spiritual beliefs." },
      { fact: "In Ewe culture, human life is seen as more valuable than material possessions like money.", explanation: "This humanistic value is fundamental to Ewe culture." },
      { fact: "In Ewe philosophy, death (ku) is not just the end but part of a larger concept of life's continuity.", explanation: "Death is viewed as an inevitable transition in the cycle of existence." },
      { fact: "The concept of 'Dzogbese' is deeply connected to Ewe understanding of destiny and fate.", explanation: "It reflects the belief that one's life path is predetermined." },
      { fact: "The proverb 'The beard does not tell the eyelid about historical events' teaches that older generations influence younger ones.", explanation: "This reflects the transmission of wisdom and cultural values." },
      { fact: "Ewe music, such as the agbadza, often carries philosophical meanings and moral lessons.", explanation: "Songs and rhythms convey societal teachings and beliefs." },
      { fact: "In Ewe culture, the concept of age is tied to wisdom rather than simply years lived.", explanation: "Elderly individuals are respected for their accumulated knowledge." },
      { fact: "Ewe people believe that wisdom is passed down through generations, much like a seed grows into a tree.", explanation: "This highlights the importance of oral tradition in preserving knowledge." },
      { fact: "The concept of 'Amegbeto' in Ewe society emphasizes the importance of being human and one's role in society.", explanation: "Human beings are seen as central to the Ewe worldview." },
      { fact: "Ewe greetings are considered a moral obligation, expressing respect and acknowledging the humanity of others.", explanation: "Greetings like 'Gbadoname' promote social harmony." },
      { fact: "The Ewe consider the human being as more valuable than material wealth.", explanation: "This value is reflected in the names they give their children, such as Amewuga (Human is more valuable than riches)." },
      { fact: "Ewe culture teaches that the actions of the elders influence the younger generations, especially in moral and ethical behavior.", explanation: "This generational influence is central to their understanding of wisdom." },
      { fact: "The Ewe place great importance on music and dance as expressions of identity and cultural values.", explanation: "These art forms are used to communicate social norms and history." },
      { fact: "In Ewe society, human relationships are seen as sacred and are celebrated through music and communal activities.", explanation: "Ewe culture places high value on kinship and solidarity." },
      { fact: "Ewe proverbs are often used to teach moral lessons and convey wisdom about life and the world.", explanation: "Proverbs are a key part of oral tradition and cultural transmission." },
      { fact: "Ewe spiritual beliefs are deeply rooted in nature, with animals, rivers, and trees often seen as sacred.", explanation: "Nature is central to their understanding of the divine and the spiritual world." },
      { fact: "The Ewe believe in the concept of 'Ku and Tsiefe,' which connects death and eternity.", explanation: "This philosophy helps them understand the cyclical nature of life." },
      { fact: "In Ewe philosophy, knowledge is not just theoretical but also practical, with an emphasis on using wisdom to solve real-life problems.", explanation: "Practical knowledge is valued for its ability to address everyday challenges." }
      // Add 45 more daily facts here...
    ];
  
    // Store both quiz data and daily facts in chrome.storage.local
    chrome.storage.local.set({ 'quiz_data': quizData, 'daily_facts': dailyFacts }, function() {
      console.log('Quiz data and daily facts stored successfully!');
    });
  }
  
// Show notification when the browser is opened
chrome.runtime.onStartup.addListener(() => {
  getRandomFact();  // Retrieve a random fact from the stored daily facts
});

// Trigger notification when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    getRandomFact();  // Retrieve a random fact from the stored daily facts
  
    // Set up a daily alarm
    chrome.alarms.create('dailyFactAlarm', { periodInMinutes: 1 });
  
    // Store quiz and daily facts on installation
    storeQuizAndFacts();
});
  
// Show notification when the alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyFactAlarm') {
    getRandomFact();  // Retrieve and show a random fact from the stored daily facts
  }
});