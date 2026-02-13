import PreRegistrationController from './PreRegistrationController'
import DocumentValidationController from './DocumentValidationController'
import UserController from './UserController'
const Public = {
    PreRegistrationController: Object.assign(PreRegistrationController, PreRegistrationController),
DocumentValidationController: Object.assign(DocumentValidationController, DocumentValidationController),
UserController: Object.assign(UserController, UserController),
}

export default Public