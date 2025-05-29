# 🍽️ Poll & Voting App (MERN Stack)

A role-based Poll and Voting App where admins can create polls and users can vote. The app displays live results and supports user authentication and authorization.

---

## 🔧 Project Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/SAGARGUPTA05/W3vila_assignment.git
cd W3vila_assignment
Backend Setup
cd backend
npm install
npm run dev

Frontend Setup

cd frontend
npm install
npm run dev

Environment Variables
# backend/.env
PORT=5000
MONGO_URL=your_mongo_db_connection
JWT_KEY=your_jwt_secret

Technologies Used
| Technology                | Why It Was Chosen                                         |
| ------------------------- | --------------------------------------------------------- |
| **MongoDB**               | NoSQL flexibility for storing polls and votes efficiently |
| **Express.js**            | Lightweight framework for backend API creation            |
| **React.js**              | Fast and component-based frontend development             |
| **Node.js**               | Non-blocking backend runtime                              |
| **JWT**                   | Secure and stateless authentication                       |
| **Tailwind CSS**          | Rapid styling and responsive design                       |

ER Diagram
User
 ├── _id
 ├── name
 ├── email
 ├── password
 ├── role (Admin/User)
 └── createdAt

Poll
 ├── _id
 ├── question
 ├── options: [ { text, voteCount } ]
 ├── createdBy (User _id)
 ├── createdAt

Vote
 ├── _id
 ├── userId (User _id)
 ├── pollId (Poll _id)
 ├── selectedOption
 └── createdAt

API Endpoints
| Method | Route              | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/signup   | Register new user   |
| POST   | /api/auth/login    | Login existing user |

Poll Routes (Admin Only)
| Method | Route           | Description       |
| ------ | --------------- | ----------------- |
| POST   | /api/polls      | Create a new poll |
| GET    | /api/polls      | Get all polls     |
| DELETE | /api/polls/\:id | Delete a poll     |

Vote Routes
| Method | Route               | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | /api/votes/\:pollId | Submit vote for a poll       |
| GET    | /api/votes/\:pollId | Get voting result for a poll |




 Live Demo
https://w3vila-assignment.onrender.com


Live Video
https://drive.google.com/file/d/1uVcxphd9QoQKHBZLPvhUPrvtAr_Nv2BK/view?usp=drivesdk







