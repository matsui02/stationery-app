import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import PasswordConfirmationController from "./password_confirmation_controller"
application.register("password-confirmation", PasswordConfirmationController)

// import PasswordStrengthController from "./password_strength_controller"
// application.register("password-strength", PasswordStrengthController)

import PasswordVisibilityController from "./password_visibility_controller"
application.register("password-visibility", PasswordVisibilityController)

import TabsController from "./tabs_controller"
application.register("tabs", TabsController)

import FlashController from "./flash_controller"
application.register("flash", FlashController)

import ItemSearchController from "./item_search_controller"
application.register("item-search", ItemSearchController)

import PencilCaseFormController from "./pencil_case_form_controller"
application.register("pencil-case-form", PencilCaseFormController)

import CharacterCountController from "./character_count_controller"
application.register("character-count", CharacterCountController)

import DropdownController from "./dropdown_controller"
application.register("dropdown", DropdownController)

import ItemStatusController from "./item_status_controller"
application.register("item-status", ItemStatusController)

import ImagePreviewController from "./image_preview_controller"
application.register("image-preview", ImagePreviewController)

import CollapseController from "./collapse_controller"
application.register("collapse", CollapseController)

import DrawerController from "./drawer_controller"
application.register("drawer", DrawerController)
