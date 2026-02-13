import Auth from './Auth'
import AgendaController from './AgendaController'
import FirstAccessController from './FirstAccessController'
import GamificationAuthController from './GamificationAuthController'
import SchoolEventController from './SchoolEventController'
import ManualController from './ManualController'
import Api from './Api'
import KanbanController from './KanbanController'
import Secretaria from './Secretaria'
import Admin from './Admin'
import Professor from './Professor'
import Student from './Student'
import Responsavel from './Responsavel'
import Public from './Public'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
AgendaController: Object.assign(AgendaController, AgendaController),
FirstAccessController: Object.assign(FirstAccessController, FirstAccessController),
GamificationAuthController: Object.assign(GamificationAuthController, GamificationAuthController),
SchoolEventController: Object.assign(SchoolEventController, SchoolEventController),
ManualController: Object.assign(ManualController, ManualController),
Api: Object.assign(Api, Api),
KanbanController: Object.assign(KanbanController, KanbanController),
Secretaria: Object.assign(Secretaria, Secretaria),
Admin: Object.assign(Admin, Admin),
Professor: Object.assign(Professor, Professor),
Student: Object.assign(Student, Student),
Responsavel: Object.assign(Responsavel, Responsavel),
Public: Object.assign(Public, Public),
Settings: Object.assign(Settings, Settings),
}

export default Controllers