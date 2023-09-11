from app import db

ERROR_MESSAGE_NOT_FOUND = "Message not found"


class DbErrors:
    def handle_error(error):
        db.session.rollback()
        error_message = str(error)
        return error_message
