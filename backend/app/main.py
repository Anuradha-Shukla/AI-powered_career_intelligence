# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# # Routers
# from app.routers import auth
# from app.routers import resume
# from app.routers import milestone4


# # =========================================================
# # CREATE FASTAPI APP
# # =========================================================

# app = FastAPI(
#     title="AI Career Intelligence Platform",
#     description="AI-powered career intelligence and resume analysis platform",
#     version="1.0.0"
# )


# # =========================================================
# # CORS
# # =========================================================

# app.add_middleware(
#     CORSMiddleware,

#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",

#         # In case Vite starts on another port
#         "http://localhost:5174",
#         "http://127.0.0.1:5174",

#         "http://localhost:5175",
#         "http://127.0.0.1:5175",
#     ],

#     allow_credentials=True,

#     allow_methods=["*"],

#     allow_headers=["*"],
# )


# # =========================================================
# # REGISTER ROUTERS
# # =========================================================

# app.include_router(auth.router)

# app.include_router(resume.router)

# app.include_router(milestone4.router)


# # =========================================================
# # ROOT
# # =========================================================

# @app.get("/")
# def root():

#     return {
#         "message": "AI Career Intelligence Platform Backend Running",
#         "status": "success"
#     }


# # =========================================================
# # HEALTH CHECK
# # =========================================================

# @app.get("/health")
# def health():

#     return {
#         "status": "ok",
#         "message": "Backend is healthy"
#     }


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from app.routers import auth
from app.routers import resume
from app.routers import milestone4
from app.routers import ats


# =========================================================
# CREATE FASTAPI APP
# =========================================================

app = FastAPI(
    title="AI Career Intelligence Platform",
    description="AI-powered career intelligence and resume analysis platform",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        "http://localhost:5174",
        "http://127.0.0.1:5174",

        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# REGISTER ROUTERS
# =========================================================

app.include_router(auth.router)

app.include_router(resume.router)

app.include_router(milestone4.router)

app.include_router(ats.router)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "message": "AI Career Intelligence Platform Backend Running",
        "status": "success"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "ok",
        "message": "Backend is healthy"
    }

