import es from "./locales/default.json"
import en from "./locales/default.en.json"

import { ProductsEs, ProductsEn } from "../views/products/locales"

/* Set the translation files in a key ViewComponent */

// SignUp transalations
es["SignUp"] = ProductsEs
en["SignUp"] = ProductsEn

export { es, en }
