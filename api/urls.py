from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'role', viewsets.RoleViewset)
router.register(r'profession', viewsets.ProfessionViewset)
router.register(r'level', viewsets.LevelViewset)
router.register(r'section', viewsets.SectionViewset)
router.register(r'course', viewsets.CourseViewset)
router.register(r'school_cycle', viewsets.SchoolCycleViewset)

router.register(r'professor', viewsets.ProfessorViewset)
router.register(r'student', viewsets.StudentViewset)
router.register(r'grade', viewsets.GradeViewset)
router.register(r'assignment', viewsets.AssignmentViewset)
router.register(r'homework', viewsets.HomeworkViewset)

router.register(r'assignment_professor', viewsets.AssignmentProfessorViewset)
router.register(r'assignment_student', viewsets.AssignmentStudentViewset)

router.register(r'class_material', viewsets.ClassMaterialViewset)
router.register(r'homework_student', viewsets.HomeworkStudentViewset)
router.register(r'event', viewsets.EventViewset)


urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
