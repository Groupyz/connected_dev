import requests_mock
import pytest
from request_handler import post_message
from test_message import create_message_obj


BOT_URL_POST_MESSAGE = "http://example.com/api_endpoint"


@pytest.fixture
def api_url():
    return BOT_URL_POST_MESSAGE


def test_post_request(api_url, mocker):
    message = create_message_obj()

    # Mock the response with status code 200 and a custom JSON body
    with requests_mock.Mocker() as m:
        m.post(api_url, status_code=200, json={"message": "success"})

        response = post_message(url=BOT_URL_POST_MESSAGE, message=message)

        assert (
            response.status_code == 200
        ), f"Expected status code 200, but received {response.status_code}"
        assert m.called_once
