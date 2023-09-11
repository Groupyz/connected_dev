from flask import request, jsonify, make_response
from DB.db_handler import messageHandler
from app import app
from DB.db_errors import *
from request_handler import handle_create_msg


MESSAGE_PATH = "message"


@app.route(f"/{MESSAGE_PATH}", methods=["POST"])
def createMessage():
    return handle_create_msg(request)


@app.route(f"/{MESSAGE_PATH}/<id>", methods=["GET", "PUT", "DELETE"])
def handleMessage(id):
    if request.method == "GET":
        return handleData.handle_get(id)

    elif request.method == "PUT":
        return handleData.handle_put(id)

    elif request.method == "DELETE":
        return handleData.handle_delete(id)


class handleData:
    def handle_get(id):
        try:
            allMessages = request.args.get('allMessages')
            if(allMessages == "true"):
                messages_from_db = messageHandler.getAllMessagesDB(id)
                messages_to_return = convert_db_item_to_list(messages_from_db)
                return make_response(jsonify({"messages": messages_to_return}), 200)
            
            else:
                messages_to_return = messageHandler.getMessageDB(id)
            if messages_to_return != ERROR_MESSAGE_NOT_FOUND:
                return make_response(
                    jsonify({"messages": messages_to_return.json()}), 200)
            else:
                return make_response(jsonify({"error": ERROR_MESSAGE_NOT_FOUND}), 404)
        except Exception as e:
            error_message = DbErrors.handle_error(e)
            return make_response(jsonify({"error": error_message}), 500)

    def handle_put(id):
        try:
            message_data = request.get_json()
            updated_message = messageHandler.updateMessageDB(message_data, id)
            if updated_message != ERROR_MESSAGE_NOT_FOUND:
                return make_response(
                    jsonify({"message updated": updated_message.json()}), 200
                )
            else:
                return make_response(jsonify({"error": ERROR_MESSAGE_NOT_FOUND}), 404)
        except Exception as e:
            error_message = DbErrors.handle_error(e)
            return make_response(jsonify({"error": error_message}), 500)

    def handle_delete(id):
        try:
            deleted_message = messageHandler.deleteMessageDB(id)
            if deleted_message != ERROR_MESSAGE_NOT_FOUND:
                return make_response(
                    jsonify({"message deleted": deleted_message.json()}), 204
                )
            else:
                return make_response(jsonify({"error": ERROR_MESSAGE_NOT_FOUND}), 404)
        except Exception as e:
            error_message = DbErrors.handle_error(e)
            return make_response(jsonify({"error": error_message}), 500)

def convert_db_item_to_list(messages):
    messages_list = []
    for message in messages:
        messages_list.append({
            'id': message.id,
            'user_id': message.user_id,
            'repeat': message.repeat,
            'group_ids': message.dest_groups_id,
            'time_to_send': message.time_to_send,
            'message_data': message.message_data,
            'message_title': message.message_title
        })
    return messages_list
    
