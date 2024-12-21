# Todo List Frontend

This repository contains the frontend of the Todo List App built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a user-friendly interface for managing tasks, including creating, editing, marking tasks as completed, and deleting them.

---

## **Features**

- List all tasks with options to edit, mark as completed, or delete.
- Create a new task with a title and color selection.
- Edit existing tasks.
- Summary of total and completed tasks.
- Responsive and clean UI built with Tailwind CSS.

---

## **Tech Stack**

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

---

## **Getting Started**

### Prerequisites

- Node.js (>=16.x)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root of the project and add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   Ensure the `NEXT_PUBLIC_API_URL` points to the backend API.

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## **Scripts**

- `npm run dev`: Start the development server.
- `npm run build` : Build the application for production.
- `npm start` : Start the production server.


---

## **File Structure**

```
.
├── components/          # Reusable UI components (e.g., TaskCard, Header)
├── hooks/               # Custom React hooks (e.g., useTasks.ts)
├── app/                 # Next.js pages (e.g., index.tsx, create.tsx, edit/[id].tsx)
├── public/              # Static assets
├── styles/              # Global and Tailwind CSS files
├── types/               # TypeScript type definitions
├── lib/               # Utility functions (e.g., API functions)
├── .env.local           # Environment variables
├── package.json         # Project configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

---

## **API Integration**

This frontend interacts with a backend API for managing tasks. Ensure the backend server is running and accessible at the URL specified in the `.env.local` file. 
To make it easier i just include the API URL in the `lib/api.ts` file.

### API Endpoints

- `GET /tasks`: Fetch all tasks.
- `GET /tasks/:id`: Fetch a specific task by ID.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update a task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---



