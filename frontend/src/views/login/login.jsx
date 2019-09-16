import React, { Component } from "react"
import { Form, Icon, Input, Button } from "antd"
import { Link } from "react-router-dom"
import { authServices } from "../../services"
import { translate } from "react-translate"
import "./login.css"
import Layout from "../../components/Layout"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmDirty: false
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const user = values
          const res = await authServices.login(user)
          if (res.token_type === "bearer") {
            this.loginSuccess(res)
          }
        } catch (error) {
          this.handleLoginErrors()
          this.setState({
            loading: false
          })
        }
      }
    })
  }

  async loginSuccess(res) {
    await localStorage.setItem("user", JSON.stringify(res))
    setTimeout(() => {
      this.props.history.push("dashboard")
    }, 1000)
  }

  handleLoginErrors() {
    const { t } = this.props
    this.setState({
      errorMsg: t("validatePasswordLogin"),
      error: true
    })
  }

  showDrawer = () => {
    this.setState({ visible: true })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Layout>
        <p>Login</p>
        <div className="main">
          <div className="section">
            <span>
              <h2>Bienvenido al challenger</h2> 🏁
            </span>
          </div>
          <div className="section">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                    style={{ width: "60%" }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    style={{ width: "60%" }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>{" "}
                Or{" "}
                <Link to={{ pathname: "register" }}>
                  <strong>register now!</strong>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login)

export default translate("Login")(WrappedNormalLoginForm)
