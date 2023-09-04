import logging
from typing import Callable, Any
from functools import wraps
import os

@staticmethod
def init_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
    log_dir = "log"
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    log_file_path = os.path.join(log_dir, "logs.log")
    if not os.path.exists(log_file_path):
        file_handler = logging.FileHandler(log_file_path)
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    return logger

@staticmethod
def log(func: Callable[..., Any]) -> Callable[..., Any]:
    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        logging.info(f"Calling func: '{func.__name__}'")
        value = func(*args, **kwargs)
        logging.info(f"Value returned by '{func.__name__}': {value}")
        return value

    return wrapper