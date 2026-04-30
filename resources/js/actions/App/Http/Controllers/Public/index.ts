import LeadController from './LeadController'
import PreRegistrationController from './PreRegistrationController'
import DocumentValidationController from './DocumentValidationController'
import UserController from './UserController'
const Public = {
    LeadController: Object.assign(LeadController, LeadController),
PreRegistrationController: Object.assign(PreRegistrationController, PreRegistrationController),
DocumentValidationController: Object.assign(DocumentValidationController, DocumentValidationController),
UserController: Object.assign(UserController, UserController),
}

export default Public