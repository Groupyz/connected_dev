import datetime
from message import Message


def test_valid_create_message_obj():
    message = create_message_obj()

    assert message is not None
    assert message.user_id == "342342fsd"
    assert isinstance(message.group_ids, list)


def test_invalid_create_message_obj():
    try:
        user_id_none = {"user_id": ""}
        create_message_obj(**user_id_none)
    except Exception as e:
        assert str(e) == "User Id is required."
    try:
        current_date = create_datetime().date()
        date_string = current_date.strftime("%Y-%m-%d")
        date_message = {"time_to_send": date_string}
        create_message_obj(**date_message)
    except Exception as e:
        assert str(e) == "Time to send is not in correct datetime format."


def create_message_obj(**kwargs) -> Message:
    date_time_val = create_datetime()
    formatted_string = date_time_val.strftime("%Y-%m-%d %H:%M:%S")
    dummy_data = {
        "user_id": "342342fsd",
        "group_ids": ["sdfds", "2131fsdf"],
        "message_data": "test data",
        "time_to_send": formatted_string,
    }
    dummy_data.update(kwargs)
    message = Message(**dummy_data)
    return message


def create_datetime() -> datetime.datetime:
    current_datetime = datetime.datetime.now()
    time_delta = datetime.timedelta(minutes=5)
    date_time_val = current_datetime + time_delta
    return date_time_val
