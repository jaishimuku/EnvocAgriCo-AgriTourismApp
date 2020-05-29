import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    createbutton: {
        background: "#047923",
        color: "white",
        "&:hover": {
            background: "#ffa500",
            color: "white",
        },
    },
}));

export default function CustomizedSnackbars() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Button className={classes.createbutton}
                style={{ marginTop: "5px", fontFamily: 'Raleway' }} onClick={handleClick}>
                CHECKOUT
      </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Checkout Sucessful!
        </Alert>
            </Snackbar>

        </div>
    );
}
