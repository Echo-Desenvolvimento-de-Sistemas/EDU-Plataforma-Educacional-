import PrivacyTermsController from './PrivacyTermsController'
import PreRegistrationController from './PreRegistrationController'
import DocumentValidationController from './DocumentValidationController'
const Public = {
    PrivacyTermsController: Object.assign(PrivacyTermsController, PrivacyTermsController),
PreRegistrationController: Object.assign(PreRegistrationController, PreRegistrationController),
DocumentValidationController: Object.assign(DocumentValidationController, DocumentValidationController),
}

export default Public