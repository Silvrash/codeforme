""" Configuration for the dependencies between modules, classes, functions in the project """
from .di import RelationResolver

# this uses the RelationResolver to implicitly bind to resolved instances in the same DIContainer
# See https://pypi.org/project/python-simple-di/#id12 for more information on the RelationResolver


DEPENDENCY_INJECTION_CONFIG = {
    'attendance_service': {
        'type': 'services.attendance_service.AttendanceService',
    },
    'verification_service': {
        'type': 'services.verification_service.VerificationService',
    },
    'results_service': {
        'type': 'services.results_service.ResultsService'
    },
    'announcement_service': {
        'type': 'services.announcement_service.AnnouncementService'
    },
    'fees_service': {
        'type': 'services.fees_service.FeesService'
    },
    'notification_service': {
        'type': 'services.notifications_service.NotificationService'
    }
}
