# ShortURL

ShortURL is a simple URL shortening service built with Node.js, Express, MongoDB, and EJS. The app allows users to shorten URLs, track visits, and manage authentication with signup and login features.

## Features
- Shorten long URLs.  
- Track total clicks and visit history.  
- User authentication with signup and login.  
- Simple UI using EJS templates.  

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB  
- **Templating Engine:** EJS  
- **Authentication:** JWT (JSON Web Tokens)  
- **Other Dependencies:** Cookie-parser, Shortid, UUID  

## Installation

**1. Clone the repository:**  
```bash
git clone https://github.com/yourusername/shorturl.git
cd shorturl
```

**2. Install dependencies:**  
```bash
npm install
```

**3. Start the server:**  
```bash
npm start
```
The app will be available at: **http://localhost:8001**

## Usage

**1. Signup/Login:**  
- Access the signup page to create an account.  
- Log in to access URL shortening features.  

**2. Shorten URL:**  
- Enter a long URL and click "Generate" to get a shortened URL.  

**3. Track Analytics:**  
- Each shortened URL tracks the total clicks and visit history.  

## Project Structure

```
shorturl/
├── models/            # Mongoose models
├── routes/            # Express routes
├── views/             # EJS templates (signup, login, home)
├── index.js           # App entry point
└── connection.js      # MongoDB connection setup
```

## Screenshots

**Signup Page:**  
![Signup Page](https://github.com/user-attachments/assets/a709fae8-9fe3-42d1-a63e-70eba662d49d)  

**Login Page:**  
![Login Page](https://github.com/user-attachments/assets/83b02552-50bc-44f0-a393-cf0838b19820)  

**Home Page:**  
![Home Page](https://github.com/user-attachments/assets/9b5e10ea-9765-4ad7-9f30-bfe68d67ef50)  

## License
This project is licensed under the ISC License.  

## Author
- **Mithila**
