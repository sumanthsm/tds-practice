import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 200,
        width: 200,
        borderRadius: '50%',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    textField: {
        marginLeft: '50px',
        marginRight: '50px',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ marginTop: '-40px' }}>
                <h3 style={{ marginLeft: '30px' }}>List of DataSources</h3>
                <Paper className={classes.root} style={{ margin: "15px 30px", backgroundColor: "#f2f2f2", height: "50px" }}>
                    <Grid container >
                        <Grid item xs={10}>
                            <InputBase
                                id="dataSource"
                                value={""}
                                variant="outlined"
                                style={{
                                    float: 'left',
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    width: '100%',
                                    alignItems: 'left',
                                    marginLeft: '35px',
                                    marginTop: '10px'
                                }}
                                onChange={""}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant="outlined"
                                style={{ margin: '8px 20px', backgroundColor: '#00b3b3', color: 'white', float: 'right' }}
                                onClick={""}
                            >
                                <span style={{ padding: '0 15px' }}>Search</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Home);