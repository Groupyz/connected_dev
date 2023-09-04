import datetime
import pytest
from app import app
from views import TASK_ROUTE
from test_views import message_data_json_dummy


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_task_endpoint(client, capsys):
    run_time = datetime.datetime.now() + datetime.timedelta(seconds=3)
    formatted_string = run_time.strftime("%Y-%m-%d %H:%M:%S")
    json_data = message_data_json_dummy(time_to_send=formatted_string)
    response = client.post(TASK_ROUTE, json=json_data)
    assert response.status_code == 201
