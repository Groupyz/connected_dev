import response
import requests
from message import Message


def post_message(url: str, message: Message) -> response:
    message_as_json = message.to_json()
    res = requests.post(url, json=message_as_json, timeout=10)

    return res
