import DemoLoginController from './DemoLoginController'
import MagicLoginController from './MagicLoginController'
const Auth = {
    DemoLoginController: Object.assign(DemoLoginController, DemoLoginController),
MagicLoginController: Object.assign(MagicLoginController, MagicLoginController),
}

export default Auth