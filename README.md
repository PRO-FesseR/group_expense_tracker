# Group Expense Tracker

This is a simplified Group Expense Tracker application built using Next.js with TypeScript and Supabase for authentication and database management. The project was completed within the required 4-5 hour timeframe and follows all the given specifications.

## Technologies Used
- **Next.js** with TypeScript (Frontend & API Routes)
- **Supabase** (Authentication & Database)
- **Tailwind CSS** (Minimal Styling)

## Features Implemented
### Authentication
- User registration and login using Supabase Auth.
- Display username/email when logged in.
- Redirect unauthenticated users to the login page.

### Groups
- Create a group with a name.
- View a list of created groups on the dashboard.
- Store groups in Supabase Database.
- Link groups to the creating user.

### Expenses
- Add basic expenses to a group (description and amount only).
- View a list of expenses for a group.
- Store expenses in Supabase Database.
- Link expenses to their group and creating user.

### Pages
- `/` - Login/Register page
- `/dashboard` - List of user’s groups
- `/groups/[groupId]` - Group expenses view with form to add expenses

### API Routes
- `POST /api/groups` - Create a new group
- `GET /api/expenses/[groupId]` - Get expenses for a group
- `POST /api/expenses/[groupId]` - Add an expense to a group

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/PRO-FesseR/group_expense_tracker
   cd group-expense-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

## AI Usage Documentation
AI tools were used to optimize the development process as follows:
- **ChatGPT**: Assisted in giving boiler plate for API's and for refreshing my memory regarding file structuring in Next Js app router. Also helping me in giving boilerplate for read.me. 
- **DeepSeek**: Helped me trobuleshooting in bugfixes in API routes regarding parameters error in getting expenses. Also helped me in getting deeper understanding of how supabase works by understading the examples given, and how it compares with firebase.
- **Supabase AI**: Helped me trobleshoot SQL qurries regading creating tables and policies.


## Video Demonstration
A walkthrough video showcasing the working application, Supabase database structure, and AI usage explanation is included in the submission.

## Notes
- Other then logout button, No extra features were added beyond the specified requirements.
- The project adheres to the 4-5 hour time constraint.
- Supabase is the sole database and authentication provider used.

---
This project strictly follows the take-home assessment guidelines and demonstrates competency in using Next.js, Supabase, and AI tools effectively.

