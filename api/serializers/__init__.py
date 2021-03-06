from .user import UserSerializer, UserReadSerializer
from .role import RoleSerializer, RoleRegisterSerializer
from .profession import ProfessionRegisterSerializer, ProfessionSerializer
from .level import LevelSerializer, LevelRegisterSerializer
from .section import SectionSerializer, SectionRegisterSerializer
from .course import CourseSerializer, CourseRegisterSerializer
from .school_cycle import SchoolCycleSerializer, SchoolCycleRegisterSerializer

from .professor import ProfessorSerializer, ProfessorRegisterSerializer
from .student import StudentSerializer, StudentRegisterSerializer
from .grade import GradeSerializer, GradeRegisterSerializer
from .assignment import AssignmentSerializer, AssignmentRegisterSerializer

from .assignment_student import AssignmentStudentSerializer, AssignmentStudentRegisterSerializer
from .assignment_professor import AssignmentProfessorSerializer, AssignmentProfessorRegisterSerializer

from .class_material import ClassMaterialSerializer, ClassMaterialRegisterSerializer
from .homework import HomeworkSerializer, HomeworkRegisterSerializer
from .homework_student import HomeworkStudentSerializer, HomeworkStudentRegisterSerializer
from .event import EventSerializer, EventRegisterSerializer