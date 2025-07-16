# Etapa 1: Build de frontend
FROM node:20 AS frontend

WORKDIR /app

COPY frontend/ ./frontend/

RUN cd frontend && npm install && npm run build


# Etapa 2: Backend + archivos estáticos
FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código backend
COPY backend/ ./

# Copiar build de frontend desde la etapa anterior
COPY --from=frontend /app/frontend/build ./static/

# Expone el puerto (usado por Flask o similar)
EXPOSE 8000

CMD ["python", "app.py"]
