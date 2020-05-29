import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Logo from "../../assets/logo.jpg";
import { Redirect } from "react-router";
import Nav from "../features/Nav";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logo: {
    height: "175px",
  },
  color: {
    background: "#047923",
    color: "white",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
//const classes  = useStyles();

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
      isSignup: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlepassword = this.handlepassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }
  handlepassword(event) {
    this.setState({ password: event.target.value });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePhone(event) {
    this.setState({ phone: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    let FormData = {
      Username: this.state.username,
      Email: this.state.email,
      PhoneNumber: this.state.phone,
      Password: this.state.password,
    };
    fetch(`/api/Customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FormData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("invalid signup");
        }
      })
      .then((response) => {
        this.setState({ isSignup: true });
        console.log(response);
      })
      .catch((error) => {
        console.error("error:", error);
        alert(error);
      });
  }
  render() {
    //const theme = createMuiTheme();
    const { classes } = this.props;
    const { username, password, email, phone } = this.state;
    if (this.state.isSignup) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Nav />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src={Logo} className={classes.logo} alt="Logo" />

            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                value={username}
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="current-email"
                value={email}
                onChange={this.handleEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="phone"
                id="phone"
                autoComplete="current-phone"
                value={phone}
                onChange={this.handlePhone}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handlepassword}
              />

              <Button
                className={("button", classes.color)}
                type="submit"
                value="Submit"
                onClick={this.handleClick}
              >
                Register
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
