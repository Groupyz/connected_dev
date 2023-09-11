import os
import requests
from flask import (request, Response, jsonify, make_response)
from DB.db_handler import messageHandler
from DB.db_errors import *

SCHED_URL = os.environ.get("SCHED_URL")
SCHED_URL_TASK = SCHED_URL + '/task'


@staticmethod
def handle_create_msg(req: request) -> Response:
  res = None
  try:
    msg_data = req.get_json()
    new_msg = messageHandler.createMessageDB(msg_data)
    msg_as_json = new_msg.json()
    send_msg_to_queue(msg_as_json)
    res = make_response(msg_as_json,201)
  except Exception as e:
      res = make_response(jsonify({'error': f"queue err {str(e)}"}), 500)

  return res


def send_msg_to_queue(msg_as_json: dict) -> Response:
  del msg_as_json['id']
  del msg_as_json['message_title']
  del msg_as_json['repeat']
  task_url = SCHED_URL_TASK
  res = requests.post(url=task_url, json=msg_as_json)

  return res
