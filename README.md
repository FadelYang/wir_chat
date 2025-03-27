# WIR Chat
A ChatGPT-like website that you can use to learn more about WIR Group. This repository contain their frontend source code

# How to Install
## System Requirement
- node v18.18.0
- npm v9.8.1
## Installation Step
- clone or download this repository
- run `npm install` to install all package needs
- run `npm run dev` to run the app locally
- all firebase service or function to communicate with firebase are store in `/src/firebase`

# How to Contribute
## Knowledge Requirement
Before contribute to this project, you need to know about these tools:
- HTML
- CSS
- TailwindCSS
- JavaScript
- Firebase
- React 18 or higher
- react-router-dom

## Project Structure
- this project follows **atomic design** guideline to structure the folder, especially the components folder. You can read about **atomic design** [here](https://medium.com/galaxy-ux-studio/principles-of-atomic-design-7b03a30c3cb6)
- make sure you know how to manage state in React, some state manage with useContext API
- datatable in this project are build with tanstack react-table

# Versioning
## Version 1.0.0
- User only can chating with Bahasa Indonesia
- Responsive in mobile screen
- Response 20 Questions per day
- Low level of accuracy in responding to the questions.
## Version 2.0.0
- More comprehensive ai engine update
- answer the questions briefly
## Version 2.0.1
- Improve response time in answering question
- Answering the questions with more relevance
## Version 2.1.0
- Add chat memory
- User can restart their session to start a new chat
- Add Negative prompt
- Add Session ID
## Version 3.0.0
- Add Languange options (English, Japan, Chineese)
- Add ui versioning
## Version 3.1.0
- Add CMS for update languange and selected collection for each language

