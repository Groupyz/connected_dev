FROM python:3.11.3

ENV BOT_URL='http://bot_api:3001'

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .


# Expose the port that Flask will run on (change it if needed)
EXPOSE 5003

# Run the Flask application
CMD [ "flask", "run", "--host=0.0.0.0", "--port=5053"]
