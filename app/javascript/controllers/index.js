// app/javascript/controllers/index.js
import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import PasswordConfirmationController from "./password_confirmation_controller"
application.register("password-confirmation", PasswordConfirmationController)

import PasswordStrengthController from "./password_strength_controller"
application.register("password-strength", PasswordStrengthController)

import PasswordVisibilityController from "./password_visibility_controller"
application.register("password-visibility", PasswordVisibilityController)

import TabsController from "./tabs_controller"
application.register("tabs", TabsController)

import FlashController from "./flash_controller"
application.register("flash", FlashController)
