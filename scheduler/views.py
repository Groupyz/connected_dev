from flask import Blueprint, request
from log.log_handler import log
import response_handler
from scheduler_wrapper import scheduler
import datetime

TASK_ROUTE = "/task"

# Create a Blueprint object
views_blueprint = Blueprint("views", __name__)


@views_blueprint.route("/")
@log
def hello():
    run_time = datetime.datetime.now() + datetime.timedelta(seconds=5)
    scheduler.add_job(print_hello_world, "date", run_date=run_time)
    return "Hello, World!"


@views_blueprint.route(TASK_ROUTE, methods=["POST"])
@log
def task():
    return response_handler.post_task(request)


def print_hello_world():
    print("Hello, World!")
