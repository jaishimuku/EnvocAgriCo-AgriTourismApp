import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import tiers from "./Productinfo";
import { Button } from "@material-ui/core";
import FarmFieldItem from "./FarmFieldItem";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "white",
    fontFamily: "Raleway",
    "&:hover": {
      textDecoration: "none",
    },
  },
  createbutton: {
    background: "#047923",
    color: "white",
    fontFamily: "Raleway",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
  checkoutbutton: {
    marginTop: "20px",
    background: "#047923",
    color: "white",
    "&:hover": {
      background: "#ffa500",
      color: "black",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  textarea: {
    height: "200px",
    width: "500px",
    border: "1px solid grey",
    margin: "40px",
    fontFamily: "Raleway",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200],
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
    fontFamily: "Raleway",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Farmfield = () => {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment>
        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ fontFamily: "Raleway" }}
          >
            Farm Field
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
            style={{ fontFamily: "Raleway" }}
          >
            Know your Agriculture Products with Envoc Agri Co's Farm Field.
          </Typography>
          <Typography align="center">
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <Button
                size="large"
                className={classes.checkoutbutton}
                style={{ fontFamily: "Raleway" }}
              >
                Go to Cart
              </Button>
            </Link>
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <FarmFieldItem key={tier.id} tier={tier} />
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Farmfield;
