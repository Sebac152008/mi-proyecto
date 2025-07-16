# Etapa 2: Backend + archivos estáticos
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./
COPY --from=frontend /app/frontend/build ./static/

EXPOSE 8000

CMD ["python", "app.py"]
