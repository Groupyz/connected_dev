from datetime import datetime
from dataclasses import dataclass, fields
from log.log_handler import log


@dataclass
class Message:

    user_id: str
    group_ids: list
    message_data: str
    time_to_send: str

    @log
    def __post_init__(self):
        for field in fields(self):
            value = getattr(self, field.name)
            if not value:
                raise ValueError(f"{field.name.replace('_', ' ').title()} is required.")
            if field.name == "time_to_send" and not self._is_valid_datetime(value):
                raise ValueError("Time to send is not in correct datetime format.")

    @staticmethod
    def _is_valid_datetime(date_str):
        try:
            datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
            return True
        except ValueError:
            return False

    def __str__(self) -> str:
        return f"Message(user_id={self.user_id}, group_ids={self.group_ids}, message_data={self.message_data}, time_to_send={self.time_to_send})"

    def to_json(self) -> dict:
        return {
            "user_id": self.user_id,
            "group_ids": self.group_ids,
            "message_body": self.message_data,
            "time_to_send": self.time_to_send
        }