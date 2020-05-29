import React from "react";
import Card from "@material-ui/core/Card";
import Navbar from "./Nav";
import Footer from "./Footer";
import Toolbar from "@material-ui/core/Toolbar";
import { Container, Typography } from "@material-ui/core";

class Admins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tiers: [],
    };
  }

  componentDidMount() {
    fetch(`/api/Transactions/all`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          isLoaded: true,
          tiers: myJson,
        });
        console.log(myJson);
      });
  }

  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 5,
          marginTop: "15px",
        }}
      />
    );
    let { isLoaded, tiers } = this.state;

    console.log("hello");
    console.log("hy", { tiers });
    if (!isLoaded) {
      return <div>loading......</div>;
    } else {
      return (
        <React.Fragment>
          <Navbar />
          {tiers.map((tier) => (
            <div>
              <div>
                <Container>
                  <h2
                    style={{
                      margin: "30px",
                      fontFamily: "Raleway",
                    }}
                  >
                    Username: {tier.userName}
                  </h2>
                  <div className="{classes.root}" style={{ flexGrow: 1 }}>
                    <Toolbar
                      style={{
                        backgroundColor: "#047923",
                        color: "white",
                        margin: "10px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        className="{classes.title}"
                        style={{
                          flexGrow: 1,
                          textAlign: "center",
                          fontFamily: "Raleway",
                        }}
                      >
                        Name{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="{classes.title}"
                        style={{
                          flexGrow: 1,
                          textAlign: "center",
                          fontFamily: "Raleway",
                        }}
                      >
                        Bucket Size{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="{classes.title}"
                        style={{
                          flexGrow: 1,
                          textAlign: "center",
                          fontFamily: "Raleway",
                        }}
                      >
                        Quantity{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="{classes.title}"
                        style={{
                          flexGrow: 1,
                          textAlign: "center",
                          fontFamily: "Raleway",
                        }}
                      >
                        Price{" "}
                      </Typography>
                    </Toolbar>
                  </div>

                  {tier.transactionDtos.map((cotier) => (
                    <Card
                      variant="outlined"
                      style={{
                        margin: "10px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "18px",
                          padding: "5px",
                          backgroundColor: "lightgrey",
                        }}
                      >
                        Transaction Date: {cotier.date.substr(0, 10)}
                      </Typography>
                      {cotier.itemsDto.map((subtier) => (
                        <div
                          className="{classes.section} "
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            borderBottom: "1x solid grey",
                          }}
                        >
                          <div
                            className="{classes.subsection}"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            <h2>{subtier.farmFieldName}</h2>
                          </div>
                          <div
                            className="{classes.subsection}"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            <h2>{subtier.sizeName}</h2>
                          </div>
                          <div
                            className="{classes.subsection}"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            <h2>{subtier.quantity}</h2>
                          </div>
                          <div
                            className="{classes.subsection}"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            <h2>${subtier.price}.00</h2>
                          </div>
                        </div>
                      ))}
                      <Typography
                        className="{classes.total}"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "25px",
                          margin: "20px",
                        }}
                      >
                        Total Price: ${cotier.totalPrice}.00
                      </Typography>

                      <Typography
                        align="center"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "25px",
                          padding: "5px",
                          backgroundColor: "#ffa500",
                        }}
                      >
                        Redeemed: {cotier.redeemed ? "True" : "False"}
                      </Typography>
                    </Card>
                  ))}
                  <ColoredLine color="#047923" />
                </Container>
              </div>
            </div>
          ))}
          <Footer />
        </React.Fragment>
      );
    }
  }
}
export default Admins;
