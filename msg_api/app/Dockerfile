
FROM python:3.11

ENV SCHED_URL='http://scheduler:5053'

WORKDIR /Messages_app

EXPOSE 5051

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD ["flask", "run", "--host=0.0.0.0", "--port=5051"]