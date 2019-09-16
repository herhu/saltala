import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { TranslatorProvider } from "react-translate"
import { es, en } from "../../i18n"

import products from "../products"

const AppRouter = ({ detectLanguage }) => {
  detectLanguage = () => {
    const langBrowser = navigator.language || navigator.userLanguage
    return langBrowser === "en" ? en : es
  }

  return (
    <TranslatorProvider translations={detectLanguage()}>
      <Router>
        <Switch>
          <Route exact path="/" render={products} />
        </Switch>
      </Router>
    </TranslatorProvider>
  )
}

export default AppRouter
