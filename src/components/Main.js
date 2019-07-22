import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TDS from './TDS';
import Home from './Home';

const styles = theme => ({
    paper: {
        width: "240px",
        height: "240px",
        position: "absolute",
        right: "0",
        top: "0",
        marginTop: "150px",
    },
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        width: `calc(100% - 60px)`,
        marginLeft: '60px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: 'black',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: '60px',
        flexShrink: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    drawerPaper: {
        backgroundColor: '#666666',
        width: '60px',
        overflow: 'hidden',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        minHeight: 'calc(100vh - 60px)',
        height: '100%',
        minHeight: '-webkit-fill-available',
    },
    fab: {
        backgroundColor: 'white',
        color: 'black',
        position: 'absolute',
        top: '75px',
        right: theme.spacing(2),
    }
});

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed"
                    className={classes.appBar}
                    style={{ backgroundColor: 'white' }}>
                    <Toolbar>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            onClick={this.onHomeButtonClick}
                            style={{ cursor: 'pointer' }}
                            noWrap>
                            TDS Approval Process
                            </Typography>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div onClick={this.onHomeButtonClick} style={{ cursor: 'pointer' }}>
                        {/* <img src={ImageLogo} style={{ width: '64px', height: '64px' }} alt="logo"></img> */}
                    </div>
                    <Divider />
                    <List>
                        <ListItem button >
                            <ListItemIcon>
                                <MenuIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <i class="fa fa-lg fa-pencil" style={{ color: 'white', padding: "10px 5px" }}></i>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <i class="fa fa-lg fa-database" style={{ color: 'white', padding: "10px 5px" }}></i>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.toolbar} />
                    <Router>
                        <Route path="/" exact component={TDS} />
                        <Route path="/home" component={Home} />
                    </Router>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Main);
