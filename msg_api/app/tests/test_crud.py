import pytest
from app import app, db
from DB.models import Message
from DB.db_handler import *
from routes import MESSAGE_PATH
import json 


@pytest.fixture(scope="module")
def test_client():
    flask_app = app
    flask_app.config["TESTING"] = True

    with flask_app.test_client() as testing_message:
        with flask_app.app_context():
            create_test_message()
            yield testing_message
            delete_test_messages("test")


    #### POSITIVE TESTS ####


def test_create_messages(test_client):
    message = {
        "user_id":"1",
        "repeat":"daily",
        "dest_groups_id":"1, 2, 3",
        "time_to_send":"2023-10-10, 10:10:10",
        "message_data":"test",
        "message_title":"test_create_message"}

    
    response = test_client.post(f'/{MESSAGE_PATH}', json=message)
    delete_test_messages("test_create_message")
    assert response.status_code == 201
    

def test_get_message(test_client):
    message = create_test_message()
    response = test_client.get(f'/{MESSAGE_PATH}/{message.id}')
    delete_test_messages("test")
    assert response.status_code == 200


def test_update_message(test_client):
    new_message = {
        "message_data":"this field changed"
       }

    message = create_test_message()
    response = test_client.put(f'/{MESSAGE_PATH}/{message.id}', json=new_message)
    id = Message.query.filter_by(message_data="this field changed").first().id
    delete_test_messages("test")
    assert response.status_code == 200
    assert  id == message.id


def test_delete_message(test_client):
    message = create_test_message()
    response = test_client.delete(f'/{MESSAGE_PATH}/{message.id}')
    assert response.status_code == 204


   #### NEGATIVE TESTS ####

def test_get_non_existing_message(test_client):
    response = test_client.get(f'/{MESSAGE_PATH}/0', json={})
    assert response.status_code == 404
    assert json.loads(response.data)['error'] == ERROR_MESSAGE_NOT_FOUND


def test_update_non_existing_message(test_client):
    response = test_client.put(f'/{MESSAGE_PATH}/0', json={})
    assert response.status_code == 404
    assert json.loads(response.data)['error'] == ERROR_MESSAGE_NOT_FOUND


def test_delete_non_existing_message(test_client):
    response = test_client.delete(f'/{MESSAGE_PATH}/0', json={})
    assert response.status_code == 404
    assert json.loads(response.data)['error'] == ERROR_MESSAGE_NOT_FOUND



#####


def delete_test_messages(title):
    Message.query.filter_by(message_title=title).delete()
    db.session.commit()


def create_test_message(user_id = "1",
                        repeat = "daily",
                        dest_groups_id = "1, 2, 3",
                        time_to_send = "2023-10-10, 10:10:10",
                        message_data = "test message body",
                        message_title = "test"):
    next_id = messageHandler.generateId()
    new_message = Message(  id = next_id, 
                            user_id = user_id,
                            repeat = repeat,
                            dest_groups_id = dest_groups_id,
                            time_to_send = time_to_send,
                            message_data = message_data,
                            message_title = message_title)
    db.session.add(new_message)
    db.session.commit()
    return new_message


        
