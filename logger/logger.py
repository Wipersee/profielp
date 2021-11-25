import logging


def set_logger(name: str):
    logger = logging.getLogger(name)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s::%(funcName)s: %(message)s",
        handlers=[logging.StreamHandler()]
    )
    return logger
