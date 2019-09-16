import React from "react"
import { withRouter } from "react-router-dom"
import { Form, Button, Col, Row, Input, Select } from "antd"
import { translate } from "react-translate"
import { authServices, misc } from "../../services/"
import "./register.css"
import Layout from "../../components/Layout"

const { Option } = Select

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmDirty: false,
      profiles: []
    }
  }

  componentDidMount() {
    this.getProfiles()
  }

  /* Function to get profiles  */
  getProfiles = async () => {
    let { data } = await misc.getProfiles()
    await localStorage.setItem("profiles", JSON.stringify(data))
    this.setState({
      profiles: data
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values)
        try {
          const user = values
          const res = await authServices.register(user)
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

  onClose = () => {
    this.setState({ visible: false })
  }

  showDrawer = () => {
    this.setState({ visible: true })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!")
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true })
    }
    callback()
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

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout>
        <p>Register</p>
        <div className="main">
          <div className="section">
            <span>
              <h2>Registrate al challenger</h2> 🏁
            </span>
          </div>
          <div className="section">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Name">
                    {getFieldDecorator("name", {
                      rules: [
                        { required: true, message: "Please enter user name" }
                      ]
                    })(<Input placeholder="Please enter user name" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email">
                    {getFieldDecorator("email", {
                      rules: [{ required: true, message: "Please enter email" }]
                    })(<Input placeholder="Please enter email" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        },
                        { validator: this.validateToNextPassword }
                      ]
                    })(<Input.Password />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Please confirm your password!"
                        },
                        { validator: this.compareToFirstPassword }
                      ]
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Profile">
                    {getFieldDecorator("profile_id", {
                      rules: [
                        { required: true, message: "Please choose the profile" }
                      ]
                    })(
                      <Select placeholder="Please choose the profile">
                        {this.state.profiles.map((q, i) => {
                          return (
                            <Option key={i} value={q.id}>
                              {q.name}
                            </Option>
                          )
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
            </Form>
          </div>
        </div>
      </Layout>
    )
  }
}

const WrappedRegisterForm = Form.create({})(Register)

export default withRouter(translate("Register")(WrappedRegisterForm))
