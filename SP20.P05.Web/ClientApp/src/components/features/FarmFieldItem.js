import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { addItem } from "../../redux/action";
import { connect } from "react-redux";
import Messege from './Messege'

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
    "&:hover": {
      textDecoration: "none",
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
    fontFamily: "Roboto",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200],
    fontFamily: 'Raleway'
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FarmFieldItem = ({ tier, addItem }) => {
  const classes = useStyles();
  const [pricee, setPricee] = React.useState("");
  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    setPricee(event.target.value);
    setSize(event.target.value);
    console.log(event.target.value);
  };

  const tierx = {
    id: tier.id,
    title: tier.title,
    src: tier.src,
    pricee: pricee,
    description: tier.description,
  }; //destructuring

  return (
    <Grid item key={tier.id} xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          title={tier.title}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{ align: "center" }}
          className={classes.cardHeader}
        />
        <CardMedia
          className={classes.cardMedia}
          image={tier.src}
          title="Image title"
        />
        <CardContent>
          <Grid container justify="center">
            <FormControl
              className={classes.formControl}
              style={{ justify: "center" }}
            >
              <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'Raleway' }}>Select a Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                onChange={handleChange}>
                <MenuItem value={tier.price.small}>Small</MenuItem>
                <MenuItem value={tier.price.medium}>Medium</MenuItem>
                <MenuItem value={tier.price.large}>Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <div className={classes.cardPricing}>
            <Typography component="h2" variant="h3" color="textPrimary" style={{ fontFamily: 'Raleway' }}>
              ${pricee}
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ fontFamily: 'Raleway' }}>
              /bucket {size}
            </Typography>
          </div>
          <ul>
            {tier.description.map((line) => (
              <Typography
                component="li" style={{ fontFamily: 'Raleway' }}
                variant="subtitle1"
                align="center"
                key={line}
              >
                {line}
              </Typography>
            ))}
          </ul>

          <Typography align="center">
            <Button
              disabled={!size}
              onClick={() => {
                addItem(tierx);
              }}
            >
              <Messege />
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(FarmFieldItem);
