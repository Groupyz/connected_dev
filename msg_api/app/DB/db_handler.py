from sqlalchemy import func
from DB.models import Message
from app import db
from DB.db_errors import *
from datetime import datetime, timedelta


class messageHandler:
    def createMessageDB(msg_data):
        msg_data["time_to_send"] = messageHandler.adjustTiming(msg_data["time_to_send"])
        new_message = Message(
            id=messageHandler.generateId(),
            user_id=msg_data["user_id"],
            repeat=msg_data["repeat"],
            dest_groups_id=msg_data["group_ids"],
            time_to_send=msg_data["time_to_send"],
            message_data=msg_data["message_data"],
            message_title=msg_data["message_title"],
        )

        db.session.add(new_message)
        db.session.commit()
        return new_message

    @staticmethod
    def generateId():
        max_id = db.session.query(func.max(Message.id)).scalar()
        next_id = (max_id or 0) + 1
        return next_id

    def getMessageDB(message_id):
        message_to_return = Message.query.filter_by(id=message_id).first()
        if message_to_return:
            return message_to_return
        else:
            return ERROR_MESSAGE_NOT_FOUND

    def getAllMessagesDB(user_id):
        messages_to_return = Message.query.filter_by(user_id=user_id).all()
        if messages_to_return:
            return messages_to_return
        else:
            return ERROR_MESSAGE_NOT_FOUND
    
    def updateMessageDB(message_data, message_id):
        message_to_update = Message.query.filter_by(id=message_id).first()
        for key, value in message_data.items():
            # Check if the attribute exists in the Message model before updating
            if hasattr(message_to_update, key):
                setattr(message_to_update, key, value)

            db.session.commit()
            return message_to_update
        else:
            return ERROR_MESSAGE_NOT_FOUND

    def deleteMessageDB(message_id):
        message_to_delete = Message.query.filter_by(id=message_id).first()
        if message_to_delete:
            db.session.delete(message_to_delete)
            db.session.commit()
            return message_to_delete
        else:
            return ERROR_MESSAGE_NOT_FOUND
        
    @staticmethod
    def adjustTiming(time_to_send):
        dt_time = datetime.strptime(time_to_send, '%Y-%m-%d %H:%M:%S')
        new_time = dt_time - timedelta(hours=3)
        return new_time.strftime('%Y-%m-%d %H:%M:%S')
