import React from "react"
import { Card } from "antd"
import { withRouter } from "react-router-dom"
import { productsServices } from "../../services/"
import { translate } from "react-translate"

const { Meta } = Card

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getProducts()
  }

  /* Function to get products  */
  getProducts = async () => {
    let { data } = await productsServices.getProdutcsById("mpm00002117320")
    console.log(data)
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <div style={{ margin: "5%" }}>Ripley labs</div>
        <div
          style={{
            padding: "1%",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap"
          }}
        >
          <Card
            hoverable
            size="small"
            onClick={() => console.log("tabs")}
            style={{ width: "20%", padding: "1%" }}
            cover={
              <img
                style={{ width: "100%" }}
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            size="small"
            onClick={() => console.log("tabs")}
            style={{ width: "20%", padding: "1%" }}
            cover={
              <img
                style={{ width: "100%" }}
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(translate("Products")(Products))
