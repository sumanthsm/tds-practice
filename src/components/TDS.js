import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { border } from '@material-ui/system';

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
    }
});

class TDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChangeTicketNo : false
        }
    }

    onEnvChange = (event) => {
        console.log(event.target.value);
        if(event.target.value === 'prod'){
            this.setState({showChangeTicketNo : true});
        }   
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                    <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                    <Grid item xs={4}>
                        <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                            Data Source
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <InputBase
                        id="dataSource"
                        value={""}
                        variant="outlined"
                        style={{
                            float: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '300px',
                            alignItems: 'left',
                            padding: '5px',
                            margin: '3px'
                        }}
                        onChange={""}
                        endAdornment = {
                            <InputAdornment position="end">
                            <i class="fa fa-lg fa-paperclip" aria-hidden="true"></i>
                            </InputAdornment>
                        }
                    />
                    
                    </Grid>
                    </Paper>

                    <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                    <Grid item xs={4}>
                        <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                            SVN Link
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <InputBase
                        id="svnLink"
                        value={""}
                        variant="outlined"
                        style={{
                            float: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '300px',
                            alignItems: 'left',
                            padding: '5px',
                            margin: '3px'
                        }}
                        onChange={""}
                    />
                    </Grid>
                    </Paper>

                    <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                    <Grid item xs={4}>
                        <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                            Description
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <InputBase
                        id="description"
                        value={""}
                        variant="outlined"
                        style={{
                            float: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '600px',
                            alignItems: 'left',
                            padding: '5px',
                            margin: '3px'
                        }}
                        onChange={""}
                    />
                    </Grid>
                    </Paper>
                    <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                    <Grid item xs={4}>
                        <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                            Environment
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <select
                        id="environment"
                        value="Select"
                        style={{
                            float: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '300px',
                            alignItems: 'left',
                            padding: '12px',
                            margin: '3px',
                            border: 'none'
                        }}
                        onChange={this.onEnvChange}
                    >
                        <option value="unit">Unit</option>
                        <option value="test_state">Test Stage</option>
                        <option value="prod">Prod</option>
                    </select>
                    </Grid>
                    </Paper>
                    { this.state.showChangeTicketNo && 
                        <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                        <Grid item xs={4}>
                            <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                                Change Ticket No
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                        <InputBase
                            id="changeTicketNo"
                            value={""}
                            variant="outlined"
                            style={{
                                float: 'left',
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                width: '300px',
                                alignItems: 'left',
                                padding: '5px',
                                margin: '3px'
                            }}
                            onChange={""}
                        />
                        </Grid>
                        </Paper>
                    }
                    
                    <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                    <Grid item xs={4}>
                        <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                            Expected PROD Date
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <InputBase
                        id="expectedProdDate"
                        value={""}
                        variant="outlined"
                        type="date"
                        style={{
                            float: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '300px',
                            alignItems: 'left',
                            padding: '5px',
                            margin: '3px'
                        }}
                        onChange={""}
                        endAdornment = {
                            <InputAdornment position="end">
                            <i class="fa fa-lg fa-calendar" aria-hidden="true"></i>
                            </InputAdornment>
                        }
                    />
                    </Grid>
                    </Paper>
                    <Paper className={classes.root} style={{margin: "15px 30px", backgroundColor:"#f2f2f2", height: "50px"}}>
                    <Grid item xs={4}>
                        <Typography component="p" style={{padding: "15px 0px", textAlign: 'center'}}>
                            Email Id
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <InputBase
                        id="emailId"
                        value={""}
                        variant="outlined"
                        style={{
                            float: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: '300px',
                            alignItems: 'left',
                            padding: '5px',
                            margin: '3px'
                        }}
                        onChange={""}
                    />
                    </Grid>
                    </Paper>
                    <div style={{ width: '100%' }}>
                        <div style={{marginTop: '30px', marginRight: "50px", float: 'right'}}>
                            <Button variant="outlined" onClick={""}>
                            <span style={{padding: '0 15px'}}>Cancel</span>    
                            </Button>
                            <Button 
                                variant="outlined" 
                                style={{margin: '0px 20px', backgroundColor: '#00b3b3', color: 'white'}}
                                onClick={""}
                            >
                            <span style={{padding: '0 15px'}}>Submit</span>    
                            </Button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withStyles(styles)(TDS);
