import es from "./locales/default.json"
import en from "./locales/default.en.json"

import { DashboardEs, DashboardEn } from "../views/dashboard/locales"
import { LoginEs, LoginEn } from "../views/login/locales"

/* Set the translation files in a key ViewComponent */

// Dashboard transalations
es["Dashboard"] = DashboardEs
en["Dashboard"] = DashboardEn

// Login transalations
es["Login"] = LoginEs
en["Login"] = LoginEn

export { es, en }
