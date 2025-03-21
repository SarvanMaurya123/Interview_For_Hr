This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# 📅 Interview Scheduling Application

## 🚀 Overview
This is a **full-stack Interview Scheduling Application** built using **Next.js, Prisma, and Supabase**. Users can create, manage, and delete interview scheduling events seamlessly.

## 🛠️ Tech Stack
- **Frontend:** Next.js, TypeScript, TailwindCSS, ShadCN UI
- **Backend:** Next.js API Routes, Prisma, Supabase
- **Database:** Supabase (PostgreSQL) via Prisma ORM
- **Authentication:** NextAuth.js
- **State Management:** React Hooks, Server Actions
- **Notifications:** Sonner (Toast Notifications)

## 🎯 Features
✅ **User Authentication** (Sign in / Sign out)  
✅ **Create, Edit, and Delete Events**  
✅ **Supabase Integration** for Database Management  
✅ **Dynamic Scheduling with Video Call Support** (Google Meet, Zoom, Microsoft Teams)  
✅ **Interactive UI with ShadCN UI Components**  
✅ **Real-time Toast Notifications** (Success, Errors, Confirmations)  

## 🏗️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/interview-scheduling.git
cd interview-scheduling
```

### 2️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Configure Environment Variables
Create a **.env.local** file and add the following:
```env
DATABASE_URL=postgresql://your_supabase_db_url
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run Database Migrations with Prisma
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server
```sh
yarn dev  # or npm run dev
```

## 📌 API Endpoints
### 🔹 **Delete an Event**
**Endpoint:** `DELETE /api/events/:eventId`
```json
{
  "eventId": "84fdc5bd-7176-4697-bb97-b0f05d16ee3a"
}
```
**Response:**
```json
{
  "message": "Event deleted successfully"
}
```

## 🔥 How to Use
1. **Sign in** to your account.
2. **Create a new event** (Select title, duration, URL, and video call provider).
3. **Manage events** (Edit, Delete, Copy Links).
4. **Sync with Google Calendar / Zoom** via Supabase.
5. **Receive real-time notifications** for actions.

## 📄 License
This project is **MIT licensed**.

## 📞 Support & Contributions
For feature requests or issues, open an **Issue** or create a **Pull Request** on GitHub.

Happy coding! 🚀


