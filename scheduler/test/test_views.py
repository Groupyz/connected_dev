import pytest
from app import app
from views import TASK_ROUTE
from test_message import create_datetime
from log.log_handler import log, init_logger

init_logger()


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


@log
def test_task_valid_post(client):
    """Test the '/task' route."""
    json_data = message_data_json_dummy()

    response = client.post(TASK_ROUTE, json=json_data)

    assert response.status_code == 201
    assert response.json["message"] == "Task received successfully"


def test_task_route_missing_data(client):
    """Test the '/task' route with missing data."""
    missing_attribute = "group_ids"
    json_data = message_data_json_dummy()
    del json_data[missing_attribute]

    response = client.post(TASK_ROUTE, json=json_data)

    assert response.status_code == 400
    assert response.json.get("message") == "Invalid request."


def test_hello_world():
    response = app.test_client().get("/")
    assert response.status_code == 200
    assert response.data == b"Hello, World!"


@log
def message_data_json_dummy(**kwargs) -> dict:
    date_time_val = create_datetime()
    formatted_string = date_time_val.strftime("%Y-%m-%d %H:%M:%S")
    dummy_data = {
        "user_id": "342342fsd",
        "group_ids": ["sdfds", "2131fsdf"],
        "message_data": "test data",
        "time_to_send": formatted_string,
    }
    dummy_data.update(kwargs)

    return dummy_data
