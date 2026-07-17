# Full-Stack Next.js TypeScript Blog Application

A modern, high-performance full-stack blog application built with Next.js, TypeScript, and Prisma. The entire ecosystem is fully containerized using Docker, allowing seamless development and deployment across any environment with absolute version parity.

## 🚀 Features

* **Framework:** Next.js (App Router) with TypeScript.
* **Database & ORM:** PostgreSQL managed via Neon Serverless DB, interfaced through Prisma ORM.
* **Authentication:** Secure user sessions powered by Auth.js (NextAuth) with Google OAuth integration.
* **Containerization:** Fully Dockerized setup ensuring a zero-dependency environment setup for developers.
* **Database Isolation:** Connects dynamically to remote cloud databases via secure runtime environment injection.

---

## 🛠️ Tech Stack

* **Frontend/Backend:** Next.js, React, TypeScript
* **Database:** PostgreSQL (Neon)
* **ORM:** Prisma
* **Containerization:** Docker & Docker Compose

---

## 🏃‍♂️ Getting Started (Local Development with Docker)

The beauty of this architecture is that you do not need Node.js, Prisma, or PostgreSQL installed locally on your machine. The only prerequisite is **Docker Desktop**.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
