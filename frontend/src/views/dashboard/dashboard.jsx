import React from "react"

import { withRouter } from "react-router-dom"
import { Table, Modal, Divider, Tag, Select, Button } from "antd"
import { authServices, misc, tickets } from "../../services"
import { translate } from "react-translate"
import "./dashboard.css"
import Layout from "../../components/Layout"

const { Option } = Select

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      profiles: [],
      users: [],
      modal1: false,
      modal2: false,
      userSelected: null,
      ticketSelected: null,
      me: {}
    }
  }

  componentDidMount() {
    this.getMe()
    this.getProfiles()
  }

  getProfiles = async () => {
    let profiles = JSON.parse(localStorage.getItem("profiles"))

    if (profiles) {
      this.setState({ profiles })
    } else {
      let { data } = await misc.getProfiles()
      await localStorage.setItem("profiles", JSON.stringify(data))
      this.setState({ profiles: data })
    }
  }

  getMe = async () => {
    let me = JSON.parse(localStorage.getItem("me"))
    let profile

    if (me) {
      profile = me.profile_id === 1 ? "inheritor" : "admin"
      this.setState({ me, profile })
    } else {
      me = await authServices.me()
      await localStorage.setItem("me", JSON.stringify(me))
      profile = me.profile_id === 1 ? "inheritor" : "admin"
      this.setState({ me, profile })
    }

    this.getTickets(profile, me.id)
  }

  getTickets = async (profile, id) => {
    if (profile === "admin") {
      let { data } = await tickets.getTickets()
      this.dataCreator(data)
    } else {
      let { data } = await tickets.getTicketsbyID(id)
      this.dataCreator(data)
    }
  }

  deleteTickets = id => {
    const { profile, me } = this.state
    tickets.deleteTicket(id)
    this.getTickets(profile, me.id)
  }

  dataCreator = data => {
    data = data.map((q, i) => {
      return {
        key: i,
        id: q.id,
        name: q.user && q.user.name,
        requested: q.requested
      }
    })

    this.setState({ data })
  }

  logout = async () => {
    authServices.logout()
    localStorage.removeItem("user")
    localStorage.removeItem("profiles")
    localStorage.removeItem("me")
    this.props.history.push("/")
  }

  RequestTicket = async record => {
    const { profile, me } = this.state
    tickets.requestTicket(record.id, { requested: true })
    this.getTickets(profile, me.id)
  }

  //MODAL 1
  showModalAsign = async record => {
    this.setState({ modal1: true })
    let { data } = await misc.getUsers(1)
    this.setState({ users: data, ticketSelected: record.id })
  }

  handleOkAsign = e => {
    const { profile, me, userSelected, ticketSelected } = this.state

    tickets.updateUserTicket(ticketSelected, { user_id: userSelected })
    this.getTickets(profile, me.id)
    this.setState({ modal1: false })
  }

  handleCancelAsign = e => {
    this.setState({ modal1: false })
  }

  handleChangeAsign = value => {
    console.log(`selected ${value}`)
    this.setState({ userSelected: value })
  }

  //MODAL 2

  showModalCreate = async () => {
    this.setState({ modal2: true })
    let { data } = await misc.getUsers(1)
    this.setState({ users: data })
  }

  handleOkCreate = async () => {
    const { profile, me, userSelected } = this.state

    await tickets.AddTicket({ requested: false, user_id: userSelected })
    this.getTickets(profile, me.id)
    this.setState({ modal2: false })
  }

  handleCancelCreate = e => {
    this.setState({ modal2: false })
  }

  handleChangeCreate = value => {
    console.log(`selected ${value}`)
    this.setState({ userSelected: value })
  }

  render() {
    const { profile, data, users, me } = this.state

    const admminColumn = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Requested",
        key: "requested",
        dataIndex: "requested",
        render: request => {
          let color = request === 0 ? "volcano" : "green"
          let tag = request === 0 ? "NO" : "YES"
          return (
            <span>
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </span>
          )
        }
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="#true" onClick={() => this.showModalAsign(record)}>
              Re asign
            </a>
            <Divider type="vertical" />
            <a href="#true" onClick={() => this.deleteTickets(record.id)}>
              Delete
            </a>
          </span>
        )
      }
    ]

    const inheritorColumn = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Requested",
        key: "requested",
        dataIndex: "requested",
        render: request => {
          let color = request === 0 ? "volcano" : "green"
          let tag = request === 0 ? "NO" : "YES"
          return (
            <span>
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </span>
          )
        }
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="#true" onClick={() => this.RequestTicket(record)}>
              Request
            </a>
          </span>
        )
      }
    ]

    let columns = profile === "admin" ? admminColumn : inheritorColumn

    return (
      <Layout>
        <p>Dashboard de{" " + me.name + ", " + profile}</p>
        <div className="">
          <div className="sectiond">
            {profile === "admin" && (
              <Button onClick={() => this.showModalCreate()}>
                Creat ticket
              </Button>
            )}
            <h2>Mi tabla de tickets</h2>
            <a href="#true" onClick={this.logout.bind(this)}>
              Logout
            </a>
          </div>
          <div className="">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>

        <Modal
          title="Reasignación de ticket"
          visible={this.state.modal1}
          onOk={this.handleOkAsign}
          onCancel={this.handleCancelAsign}
        >
          <p>Seleccione a un nuevo usuario</p>
          <Select style={{ width: 120 }} onChange={this.handleChangeAsign}>
            {users.map((q, i) => {
              return (
                <Option key={i} value={q.id}>
                  {q.name}
                </Option>
              )
            })}
          </Select>
        </Modal>

        <Modal
          title="Nuevo ticket"
          visible={this.state.modal2}
          onOk={this.handleOkCreate}
          onCancel={this.handleCancelCreate}
        >
          <div style={{ display: "flex" }}>
            <p>Nuevo ticket para </p>
            <Divider type="vertical" />
            <Select style={{ width: 120 }} onChange={this.handleChangeCreate}>
              {users.map((q, i) => {
                return (
                  <Option key={i} value={q.id}>
                    {q.name}
                  </Option>
                )
              })}
            </Select>
          </div>
        </Modal>
      </Layout>
    )
  }
}

export default withRouter(translate("Dashboard")(Dashboard))
