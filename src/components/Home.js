import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ProjectData from '../data/data.json';

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
        this.state = {
            statusValues: ["Approved", "Pending", "Rejected", "Disputed"]
        }
    }

    handleChange = () => {
        // this.setState({ statusValues : ["Approved", "Pending", "Rejected", "Disputed"]})
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
                                id="search"
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
                <Paper className={classes.root} style={{ margin: "15px 30px", backgroundColor: "#f2f2f2" }}>
                    <h4 style={{ padding: '10px 0px 10px 10px', margin: 'auto' }}>Tableau Project Status</h4>
                    <Paper square={true} style={{ height: "35px" }} elevation={0}></Paper>
                    <Paper square={true} elevation={0} style={{ backgroundColor: "#f2f2f2", padding: '10px 0px 0px 10px' }}>
                        <Grid container >
                            <Grid item xs={1}>
                                <span>#</span>
                            </Grid>
                            <Grid item xs={3}>
                                <span>Project Name</span>
                            </Grid>
                            <Grid item xs={2}>
                                <span>Data Source</span>
                            </Grid>
                            <Grid item xs={2}>
                                <span>Type</span>
                            </Grid>
                            <Grid item xs={4}>
                                <span>Take Action</span>
                            </Grid>
                        </Grid>
                    </Paper>
                    {
                        ProjectData.data.map((item, i) => {
                            return (
                                <Paper square={true} elevation={0} style={{ padding: '5px 0px 0px 10px', marginTop: '2px', height: '30px' }}>
                                    <Grid container >
                                        <Grid item xs={1}>
                                            <span>{item.sl_no}</span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span>{item.project_name}</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>{item.data_source}</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>{item.type}</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span>Take Action</span>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )
                        })
                    }
                </Paper>
                <Paper square={true} style={{ width: "300px", margin: '0 auto'}}>
                    <h4 style={{ padding: '10px 0px 10px 10px', margin: 'auto' }}>Update Status</h4>
                    <Divider />
                    <p style={{paddingLeft: '10px'}}> 
                        Project name
                    </p>
                    <InputBase
                        id="svnLink"
                        value={"Siebel SR Report"}
                        variant="outlined"
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '100%',
                            border: '1px solid rgba(0, 0, 0, 0.12)'
                        }}
                        onChange={""}
                    />
                    <p style={{paddingLeft: '10px'}}>
                        Status *
                    </p>
                    <TextField
                        select
                        style={{flexBasis: 200, width: 'inherit' }}
                        value={""}
                        onChange={this.handleChange()}
                    >
                        
                        <MenuItem value="Approved">
                                Approved
                            </MenuItem>
                            <MenuItem value="Disputed">
                                Disputed
                            </MenuItem>
                            <MenuItem value="Pending">
                                Pendig
                            </MenuItem>
                    </TextField>
                    <p style={{paddingLeft: '10px'}}>Comment *</p>
                    <textarea
                        rows={8}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            width: '100%',
                            border: '1px solid rgba(0, 0, 0, 0.12)'
                        }}
                        ></textarea>
                    <p style={{paddingLeft: '10px'}}>Comment about the resolution of the status</p>
                    <div style={{ width: '100%' }}>
                        <div style={{padding: '0px 10px 20px 10px'}}>
                            <Button variant="outlined" style={{marginLeft: "5px"}} onClick={""}>
                            <span style={{padding: '0 15px'}}>Cancel</span>    
                            </Button>
                            <Button 
                                variant="outlined" 
                                style={{margin: '0px 0px 0px 30px', backgroundColor: '#00b3b3', color: 'white'}}
                                onClick={""}
                            >
                            <span style={{padding: '0 15px'}}>Submit</span>    
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Home);