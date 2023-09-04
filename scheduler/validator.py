from typing import Callable


ValidatorFn = Callable[[int], bool]


def validate_pipeline(validators: list[ValidatorFn]) -> ValidatorFn:
    def validator(value: int) -> bool:
        return all(validator(value) for validator in validators)

    return validator

def is_json(request) -> bool:
    return request.is_json


def post_task_has_needed_data(request) -> bool:
    has_needed_data = True
    if (
      (request.json.get('user_id') is None) or
      (request.json.get('group_ids') is None) or
      (request.json.get('message_data') is None) or
      (request.json.get('time_to_send') is None)
      ):
        has_needed_data = False

    return has_needed_data