import pytest
from app import app, db
from DB.models import User
from DB.dbHandler import generate_id
from routes import PATH
from DB.dbErrors import USER_ID_ERROR_MESSAGE, EMAIL_ERROR_MESSAGE


# delete all remaining users in db
@pytest.fixture(scope="session", autouse=True)
def delete_remaining_users():
    yield

    users_emails = ["test_user_1@gmail.com", "test_user_2@gmail.com", "test_user_3@gmail.com", "Terry@gmail.com", "Charles@gmail.com", "Jake@gmail.com"]
    with app.app_context():
        for user_email in users_emails:
            user = User.query.filter_by(email=user_email.lower()).first()
            if user:
                db.session.delete(user)
                db.session.commit()


@pytest.fixture(scope="session")
def test_client():
    flask_app = app
    flask_app.config["TESTING"] = True

    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client


#### SUCCESS TESTS ####


# create 2 users for test and print them to output.txt
def test_create_users(test_client):
    data_1 = create_json_user("Terry", "Jeffords", "10", "Terry@gmail.com")
    data_2 = create_json_user("Charles", "Boyle", "11", "Charles@gmail.com")
    response = test_client.post(f'/{PATH}', json=data_1)
    assert response.status_code == 201
    assert_user_details(data_1, response.get_json().get('message'))
    user_id = get_user_id(response)
    print_user_to_file(test_client, user_id)
    response = test_client.post(f'/{PATH}', json=data_2)
    assert response.status_code == 201
    assert_user_details(data_2, response.get_json().get('message'))
    user_id = get_user_id(response)
    print_user_to_file(test_client, user_id)


# get user details by id
def test_get_user(test_client):
    create_test_user(email_addr="test_user_1@gmail.com")
    user = get_user_by_email("test_user_1@gmail.com")
    response = test_client.get(f'/{PATH}/{user.id}')
    assert response.status_code == 200
    assert_user_details(user, response.get_json().get('user'), False)
    

# update existing user details
def test_update_user(test_client):
    create_test_user(email_addr="test_user_1@gmail.com")
    data = create_json_user("Jake", "Peralta", "11", "Jake@gmail.com")
    user = get_user_by_email("test_user_1@gmail.com")
    response = test_client.put(f'/{PATH}/{user.id}', json=data)
    assert response.status_code == 200
    assert_user_details(data, response.get_json().get('message'))
    print_user_to_file(test_client, user.id)


# delete existing user
def test_delete_user(test_client):
    create_test_user(email_addr="test_user_2@gmail.com")
    user = get_user_by_email("test_user_2@gmail.com")
    response = test_client.delete(f'/{PATH}/{user.id}')
    assert response.status_code == 200
    assert user.id == response.get_json().get('message')


#### FAILURE TESTS ####


# create user that already exists in DB
def test_create_existing_user(test_client):
    create_test_user(email_addr="test_user_3@gmail.com")
    data = create_json_user("test", "user_2", "11", "test_user_3@gmail.com")
    response = test_client.post(f'/{PATH}', json=data)
    assert response.status_code == 400
    assert response.get_json().get('message') == EMAIL_ERROR_MESSAGE


# update user that doesn't exist in DB
def test_update_non_existing_user(test_client):
    data = create_json_user("Jake", "Peralta", "11", "Jake@gmail.com")
    next_id = generate_id()
    response = test_client.put(f'/{PATH}/{next_id}', json=data)
    assert response.status_code == 400
    assert response.get_json().get('message') == USER_ID_ERROR_MESSAGE


# delete user that doesn't exist in DB
def test_delete_non_existing_user(test_client):
    next_id = generate_id()
    response = test_client.delete(f'/{PATH}/{next_id}')
    assert response.status_code == 400
    assert response.get_json().get('message') == USER_ID_ERROR_MESSAGE


# get user that doesn't exist in DB
def test_get_non_existing_user(test_client):
    next_id = generate_id()
    response = test_client.get(f'/{PATH}/{next_id}')
    assert response.status_code == 400
    assert response.get_json().get('message') == USER_ID_ERROR_MESSAGE

# get user id from response message
def get_user_id(response):
    user = response.get_json()
    user_id = user.get('message').get('id')
    return user_id


def get_user_by_email(email_addr):
    user = User.query.filter_by(email=email_addr.lower()).first()
    return user


# print created users to output.txt
def print_user_to_file(test_client, id):
    response = test_client.get(f'/{PATH}/{id}')
    data = response.get_json()
    with open('logs/output.log', 'a') as f:
        if 'Jake' not in str(data):
            f.write("users created:\n" + f'id={id}' + str(data) + '\n')
        else:
            f.write("users updated:\n" + f'id={id}' + str(data) + '\n')


def create_test_user(firstName="first", lastName="last", email_addr="test@gmail.com", password_key="1234"):
    new_user = get_user_by_email(email_addr)
    if new_user is None:
        next_id = generate_id()
        new_user = User(id=next_id, first_name=firstName, last_name=lastName, email=email_addr, password=password_key)
        db.session.add(new_user)
        db.session.commit()


def assert_user_details(user, response, isJson=True):
    if isJson:
        for key in user:
            assert user[key].lower() == response[key].lower()
    else:
        for key in user.json():
            if key != 'id':
                assert user.json()[key].lower() == response[key].lower()

def create_json_user(firstName="first", lastName="last", password_key="1234", email_addr="test@gmail.com"):
    data = {"first_name": firstName, "last_name": lastName, "password": password_key, "email": email_addr}
    return data