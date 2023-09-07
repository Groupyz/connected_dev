import os
from scheduler_wrapper import scheduler
from datetime import datetime
from flask import request, jsonify
from validator import validate_pipeline, is_json, post_task_has_needed_data
from message import Message
from request_handler import post_message
from log.log_handler import log

BOT_URL = os.environ.get("BOT_URL")
BOT_URL_MSG = BOT_URL + '/sendMessage'

post_is_valid = validate_pipeline([is_json, post_task_has_needed_data])


@log
def post_task(request: request):
    json_data = None
    try:
        create_message_post_task(request)
        json_data = jsonify({"message": "Task received successfully"}), 201
    except Exception as e:
        err_msg = "Invalid request." + str(e)
        json_data = jsonify({"message": err_msg}), 400

    return json_data


@log
def create_message_post_task(request: request):

    if post_is_valid(request) is False:
        raise ValueError("Req isn't valid.")

    json_data = request.get_json()
    message = Message(**json_data)

    if message is None:
        raise ValueError("Msg couldn't be init")

    run_time = datetime.strptime(message.time_to_send, "%Y-%m-%d %H:%M:%S")
    scheduler.add_job(
        post_message,
        "date",
        run_date=run_time,
        args=[BOT_URL_MSG, message]
        )
