# Ewe Culture Daily - Chrome Extension

This Chrome extension allows users to explore Ewe culture, including daily facts, a language translation tool, and a quiz. The extension uses Google Translate API to provide translations between English and Ewe and allows users to take a quiz about Ewe culture.

## Features
- **Daily Ewe Facts**: Random Ewe cultural facts that refresh daily.
- **Translation Tool**: A translator from English to Ewe and vice versa.
- **Ewe Culture Quiz**: A quiz to test knowledge about Ewe culture and traditions.
- **Leaderboard**: Displays the top 5 scores from the quiz.

## How to Test the Chrome Extension Locally

To test the extension locally, follow these steps:

### Prerequisites
- **Google API Key**: This extension uses the [Google Cloud Translation API](https://cloud.google.com/translate) for language translation. You need to generate an API key from a Google Cloud account if you want to test this feature. Follow the steps below to create and store the API key:
  - Go to [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project.
  - Enable the **Cloud Translation API**.
  - Create an API key under **Credentials**.
  - Store your **API key** securely

### Steps to Test Locally

1. **Download or Clone the Repository**
   - Clone this repository to your local machine using Git or download it as a ZIP file.
   - If cloning, run:
     ```bash
     git clone https://github.com/your-username/Ewe-Culture-Daily.git
     ```

2. **Install Google API Key**
   - You need to set your Google Translate API key in the extension for it to function correctly.
   -  Replace **'process.env.GOOGLE_API_KEY'** in script.js with your own API

3. **Load Extension in Chrome**
   - Open **Chrome** and navigate to `chrome://extensions/`.
   - Turn on **Developer Mode** (toggle in the top right).
   - Click on **Load unpacked**.
   - Select the folder where the extension files are located (the folder where you cloned or downloaded the repo).

4. **Test the Extension**
   - Once loaded, you should see the Ewe Culture Daily extension icon in the Chrome toolbar.
   - Click the icon to open the extension popup and start using the translation tool and quiz.
   - For testing purposes, the extension uses the **Google Translate API**. If you’re testing locally, your API key must be set correctly .

5. **Interact with the Quiz and Leaderboard**
   - Answer the quiz questions and submit your score.
   - Your score will be added to the leaderboard, showing the top 5 participants.

### Additional Notes

- **Progress**: This is a work in progress, it will be improved regulary and eventually launched for public use.

## How to Contribute
- Fork the repository and submit pull requests to improve the extension.
- If you have new Ewe culture facts or quiz questions, feel free to add them and contribute.
  
## License
This project is licensed under the MIT License.
