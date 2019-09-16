import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import { TranslatorProvider } from "react-translate"
import { authServices } from "../../services/"
import { es, en } from "../../i18n"

import Login from "../login"
import Dashboard from "../dashboard"
import Register from "../register"

const AppRouter = ({ detectLanguage }) => {
  detectLanguage = () => {
    const langBrowser = navigator.language || navigator.userLanguage
    return langBrowser === "en" ? en : es
  }

  const verifyRoute = Component => {
    return authServices.isLoggedIn() ? <Component /> : <Redirect to="/" />
  }

  return (
    <TranslatorProvider translations={detectLanguage()}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/dashboard"
            render={() => verifyRoute(Dashboard)}
          />
        </Switch>
      </Router>
    </TranslatorProvider>
  )
}

export default AppRouter
