import response
import requests
import os
from message import Message

BOT_URL_POST_MESSAGE = os.environ.get("BOT_URL_POST_MESSAGE")


def post_message(url: str = BOT_URL_POST_MESSAGE, message: Message = None) -> response:
    message_as_json = message.to_json()
    res = requests.post(url, json=message_as_json, timeout=10)

    return res
