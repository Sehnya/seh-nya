# Use a slim Python base image
FROM python:3.11-slim

# Ensure stdout/stderr are unbuffered
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080

# Install system dependencies (if any). Keep minimal.
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies first (leveraging Docker layer caching)
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app

# Expose the port the app listens on
EXPOSE 8080

# Use gunicorn to serve the Flask app
# app:app -> module:variable
# Use sh -c so $PORT is expanded by the shell, with a default fallback
CMD ["sh", "-c", "gunicorn -w 3 -k gthread -b 0.0.0.0:${PORT:-8080} app:app"]
