import React, { Component, Fragment } from "react"

import Container from "../Container"

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Container>{this.props.children}</Container>
      </Fragment>
    )
  }
}
