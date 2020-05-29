import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/selectors";
import CheckoutItem from "./CheckoutItem";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { QRCode } from "react-qr-svg";
import CheckMessege from "./CheckMessege";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  total: {
    fontFamily: "Poppins",
    fontSize: "30px",
    margin: "20px",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  section: {
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "2px solid grey",
  },
  icon: {
    backgroundColor: "#e4e4e4",
    borderRadius: "20px",
    padding: "10px",
    fontSize: "40px",
    verticalAlign: "middle",
    margin: "5px",
    cursor: "pointer",
  },
}));

const Checkout = ({ cartItems, total }) => {
  const [transactionSuccessful, settransactionSuccessful] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (transactionSuccessful) {
      fetch(`/api/Transactions`)
        .then((res) => res.json())
        .then((response) => {
          let qrcodeobj = [];
          let myJsonConst = response[response.length - 1];
          qrcodeobj.push({ CartId: myJsonConst.cartId });
          qrcodeobj.push({ TransId: myJsonConst.id });
          let itemsDto = [];

          for (var i = 0; i < myJsonConst.itemsDto.length; i++) {
            let sizeName,
              farmFieldName,
              quantity = "";
            sizeName = myJsonConst.itemsDto[i].sizeName;
            farmFieldName = myJsonConst.itemsDto[i].farmFieldName;
            quantity = myJsonConst.itemsDto[i].quantity;
            console.log("This is Quantity", quantity);
            itemsDto.push({
              SizeName: sizeName,
              FarmFieldName: farmFieldName,
              Quantity: quantity,
            });
          }
          qrcodeobj.push({ TotalPrice: myJsonConst.totalPrice });
          qrcodeobj.push(itemsDto);
          let newArr = [...qrcodeobj];
          console.log(newArr);
          var testArr = [...newArr];
          setItemsInCart(testArr);
        });
    }
  }, [transactionSuccessful]);

  const handleClick = (productObject) => {
    var temp = [];
    for (var i = 0; i < productObject.cartItems.length; i++) {
      temp.push(productObject.cartItems[i]);
    }
    let postObj = [];
    temp.map((t) => {
      postObj.push({
        FarmFieldId: t.id,
        Quantity: t.quantity,
        Price: t.pricee,
      });
      return postObj;
    });
    console.log("this is postObj from handleclick", postObj);
    fetch(`/api/Transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postObj),
    })
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          settransactionSuccessful(true);
          console.log("Response Okay"); // cannot return response.json coz api is sending nothing
        } else {
          settransactionSuccessful(false);
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("error:", error);
        alert(error);
      });
  };

  return (
    <div>
      <Nav />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Shopping Cart
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Print out or Scan your Ticket
        </Typography>
      </Container>
      <Container>
        <div className={classes.root}>
          <Toolbar
            style={{
              backgroundColor: "#047923",
              color: "white",
              margin: "20px",
            }}
          >
            <Typography
              variant="h6"
              className={classes.title}
              style={{ textAlign: "center" }}
            >
              Product{" "}
            </Typography>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ textAlign: "center" }}
            >
              Price{" "}
            </Typography>
            {/* <Typography variant="h6" className={classes.title}>
    Bucket Size </Typography> */}
            <Typography
              variant="h6"
              className={classes.title}
              style={{ textAlign: "right" }}
            >
              Quantity{" "}
            </Typography>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ textAlign: "right" }}
            >
              Remove{" "}
            </Typography>
          </Toolbar>
        </div>

        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <Grid container justify="center" style={{ margin: "10px" }}>
          <Typography className={classes.total}>
            Basket Total: ${total}
          </Typography>

          {/* //{transactionSuccessful && ( */}
          {transactionSuccessful && (
            <QRCode
              level="L"
              style={{ width: "200" }}
              value={JSON.stringify({ itemsInCart })}
            />
          )}
        </Grid>
        <Button
          className="button"
          type="submit"
          id="submitbtn"
          onClick={(event) => {
            handleClick({ cartItems });
          }}
          style={{
            marginTop: "20px",
            background: "#047923",
            marginLeft: "50px",
            color: "white",
            "&:hover": {
              background: "#ffa500",
              color: "black",
            },
          }}
        >
          <CheckMessege />
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(Checkout);
