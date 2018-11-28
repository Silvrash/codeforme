""" Dependency injection microframework """
import re
from logging import debug as log_debug

from Utils import is_in_development_environment
from .di import DIContainer
from .config import DEPENDENCY_INJECTION_CONFIG as _DEPENDENCY_INJECTION_CONFIG

__all__ = ('DependencyInjector', )


def _camel_case_to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


class DependencyInjector(object):
    """Dependency Injection provider.

        For example, to create an instance of an injectable class:

            dependency_injector().provide(__class__) # type: __class__
    """

    def __init__(self, singleton=False, lazy=True):
        self.dependency_injection_container = DIContainer(
            _DEPENDENCY_INJECTION_CONFIG,
            singleton=singleton,  # False means, create new instance every time resolve('key) is called
            lazy=lazy,  # True means, do not immediately create instances; wait until resolve('key') is called
            debug=is_in_development_environment()
        )

    def provide(self, _cls, *args, **kwargs):
        # type: (__class__): __class__
        """Create an instance of a class.

        Keyword Arguments:
            kwargs: Parameters that will be passed to the constructor of the class

        Returns:
            _cls -- An instance of the class
        """
        class_name = str(_cls.__name__)
        instance_key = _camel_case_to_snake_case(class_name)

        log_debug("** DependencyInjector: Resolving instance with key: '%s' **" % instance_key)

        class_instance = self.dependency_injection_container.resolve(instance_key, *args, **kwargs)
        return class_instance
