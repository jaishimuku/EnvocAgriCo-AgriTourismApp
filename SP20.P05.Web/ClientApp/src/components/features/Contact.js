import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../../assets/logo.jpg";
import Footer from "./Footer";
import Navbar from "./Nav";
import JotformEmbed from "react-jotform-embed";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contactimage: {
    height: "100px",
  },
}));

export default function Contact() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          style={{ fontFamily: "Raleway" }}
        >
          Contact Us
        </Typography>
        <img src={Logo} className={classes.contactimage} alt="logo" />
      </div>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main">
        <JotformEmbed src="https://form.jotformeu.com/201119192826150" />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
