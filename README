# 🎓 Learning Tracker

A modern full-stack application to track learning resources, completion status, time spent, and category-based summaries.

---

## 🔧 Tech Stack

| Layer      | Tech                     |
|------------|--------------------------|
| Frontend   | Next.js + Tailwind CSS   |
| Backend    | Django + DRF             |
| Database   | PostgreSQL               |
| Auth       | JWT-based authentication |
| Tools      | Docker, React Query      |

---

## ✨ Features

- Register and log in using JWT auth
- Add resources with type, category, and description
- Mark as completed with time spent
- Dashboard showing all your resources
- Beautiful summary charts by category
- Responsive and pastel-themed UI
- Docker-ready or manual local setup

---

## 📁 Project Structure

```
learning-tracker/
├── backend/              # Django API
├── frontend/             # Next.js app
├── docker-compose.yml    # Docker orchestration
└── .env                  # PostgreSQL env config
```

---

## 🚀 Getting Started

### Option 1: 🐳 Run with Docker (Recommended)

> All services (Postgres, Django, Next.js) run automatically.

### 🔸 Prerequisites
- Docker + Docker Compose installed

### 🔸 Setup Steps

1. Clone the repository

```bash
git clone https://github.com/tapish97/Teachedison.git
cd Teachedison
```

2. Create a `.env` file in the root (same directory as `docker-compose.yml`):

```env
POSTGRES_DB=learning_tracker_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

3. Start all services:

```bash
docker-compose down -v  # Optional: reset DB if needed
docker-compose up --build
```

4. Open:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api/](http://localhost:8000/api/)

---

### Option 2: ⚙️ Manual Setup (Without Docker)

#### 🔹 Backend Setup (Django)

```bash
cd backend
python -m venv env
env\Scripts\activate       # or source env/bin/activate on macOS/Linux
pip install -r requirements.txt

# Create database manually in Postgres:
# DB: learning_tracker_db | User: postgres | Password: postgres

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend runs at: http://localhost:8000

---

#### 🔹 Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

---

## 🔐 Auth & Testing

1. Go to `/register` to create a new user
2. Log in via `/login`
3. Start adding resources from the dashboard

---

## 📊 Summary Page

- View resources by category
- Total count, completed count, time spent
- Dynamic completion bar per category
- Sorting options included

---

## 🧪 API Endpoints (Key)

| Method | Endpoint                          | Purpose                        |
|--------|-----------------------------------|--------------------------------|
| POST   | `/api/register/`                  | Register a new user            |
| POST   | `/api/token/`                     | Get access/refresh tokens      |
| GET    | `/api/resources/`                 | Get all your resources         |
| POST   | `/api/resources/`                 | Add a new resource             |
| POST   | `/api/resources/<id>/mark-complete/` | Mark a resource as complete |
| GET    | `/api/resources/summary/`         | Get summary by category        |

---

## 📦 Dependencies Overview

### Frontend
- Next.js
- React
- Tailwind CSS
- @tanstack/react-query
- Axios

### Backend
- Django
- Django REST Framework
- djangorestframework-simplejwt
- psycopg2-binary

---

## 📝 .env Template

Example `.env` file for root directory:

```env
POSTGRES_DB=learning_tracker_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## 📃 License

MIT © [tapish97](https://github.com/tapish97)

---

## ✅ Todo (optional roadmap)

- [x] Add JWT auth
- [x] Resource CRUD + completion
- [x] Summary charts
- [ ] Add dark mode toggle
- [ ] Export data to CSV
