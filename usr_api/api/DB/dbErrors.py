from flask import jsonify, make_response
from app import app

USER_ID_ERROR_MESSAGE = 'ERROR! user id not found'
EMAIL_ERROR_MESSAGE = 'Error! Email already exists'
DUP_ID_ERROR_MESSAGE = 'ERROR! user id already exists'

class UserNotFoundError(Exception):
    pass


class DuplicateIDError(Exception):
    pass


class DuplicateEmailError(Exception):
    pass


class DatabaseError(Exception):
    pass


# Error handlers
@app.errorhandler(UserNotFoundError)
def handle_user_not_found_error(error):
    return make_response(jsonify({'message': USER_ID_ERROR_MESSAGE}), 400)


@app.errorhandler(DuplicateIDError)
def handle_duplicate_id_error(error):
    return make_response(jsonify({'message': DUP_ID_ERROR_MESSAGE}), 400)


@app.errorhandler(DuplicateEmailError)
def handle_duplicate_email_error(error):
    return make_response(jsonify({'message': EMAIL_ERROR_MESSAGE}), 400)


@app.errorhandler(DatabaseError)
def handle_database_error(error):
    return make_response(jsonify({'message': 'ERROR!'}), 500)


def handle_errors(error_message):
    if 'duplicate key value violates unique constraint "users_pkey"' in error_message:
        raise DuplicateIDError()
    elif 'duplicate key value violates unique constraint "users_email_key"' in error_message:
        raise DuplicateEmailError()
    else:
        raise DatabaseError()
