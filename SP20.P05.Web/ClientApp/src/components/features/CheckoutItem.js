import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { addItem, removeItem, clearItemFromCart } from "../../redux/action";
import { connect } from "react-redux";

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
    fontFamily: "Raleway",
  },
  section: {
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "2px solid grey",
    fontFamily: "Raleway",
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

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItem }) => {
  const classes = useStyles();
  const { title, pricee, quantity, src } = cartItem;
  return (
    <div className={classes.section}>
      <div className={classes.subsection}>
        <img
          src={src}
          alt="farmfieldimage"
          style={{ width: "200px", height: "auto", marginTop: "15px" }}
        />
        <h2 style={{ textAlign: "center" }}>{title}</h2>
      </div>
      <div className={classes.subsection} style={{ fontFamily: "Raleway" }}>
        <h2>{pricee}</h2>
      </div>

      <div className={classes.subsection}>
        <ArrowLeftIcon
          className={classes.icon}
          onClick={() => removeItem(cartItem)}
        />
        {quantity}
        <ArrowRightIcon
          className={classes.icon}
          onClick={() => addItem(cartItem)}
        />
      </div>
      <div className={classes.subsection}>
        <HighlightOffIcon
          className={classes.icon}
          onClick={() => clearItem(cartItem)}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
