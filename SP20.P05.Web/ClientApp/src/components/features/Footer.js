import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{ fontFamily: 'Raleway' }}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/" style={{ textDecoration: 'none', color: 'gray', fontFamily: 'Raleway' }}>
                Envoc Agri Co
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column-reverse',

    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        fontFamily: 'Raleway',
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <footer className={classes.footer}>
                <Container maxWidth="md">
                    <Typography variant="body1" align="center" style={{ fontFamily: 'Raleway' }}>
                        Get the best Farm Field Experience with Envoc Agri Co.
                    </Typography>
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}