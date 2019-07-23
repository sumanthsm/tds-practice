import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        margin: theme.spacing(1),
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
            statusValues: ["Approved", "Pending", "Rejected", "Disputed"],
            projectData: [],
            selectedProject : {},
            isDialogOpen: false
        }
    }


    componentDidMount() {
        this.getProjectData();
    }

    getProjectData = () => {
        axios.get('http://localhost:5000/api/projectdata')
            .then((response) => {
                let data = response.data;
                console.log(response, "res");

                this.setState({ projectData: data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getProjectDataById = (id) => {
        const { projectData } = this.state;
        for(let i=0;i<projectData.length;i++){
            if(projectData[i].id == id){
                this.setState({selectedProject : projectData[i]})
                break;
            }
        }
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
    }

    updateProjectStatus = (id) => {
        this.getProjectDataById(id);
        this.setState({ isDialogOpen: true });
    }

    render() {
        const { classes } = this.props;
        const { projectData, isDialogOpen, selectedProject } = this.state;
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
                    <Paper square={true} elevation={0} style={{ backgroundColor: "#f2f2f2", padding: '12px 0px 0px 10px', height: '45px' }}>
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
                            <Grid item xs={2}>
                                <span>Status</span>
                            </Grid>
                            <Grid item xs={2}>
                                <span>Take Action</span>
                            </Grid>
                        </Grid>
                    </Paper>
                    {
                        projectData.map((project, i) => {
                            return (
                                <Paper square={true} elevation={0} style={{ padding: '14px 0px 0px 10px', marginTop: '2px', height: '45px' }}>
                                    <Grid container >
                                        <Grid item xs={1}>
                                            <span>{project.id}</span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span>{project.name}</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>{project.dataSource}</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>{project.type}</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <span>{project.status}</span>
                                        </Grid>
                                        <Grid item xs={2} style={{ marginTop: '-18px' }}>
                                            <Fab aria-label="Edit" style={{ backgroundColor: '#00b3b3', color: 'white', width: '35px', height: '35px' }} className={classes.fab} onClick={() => this.updateProjectStatus(project.id)}>
                                                <EditIcon style={{ width: '15px' }} />
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )
                        })
                    }
                </Paper>
                <Dialog
                    open={isDialogOpen}
                    onClose={this.handleClose}
                >
                    <Paper>
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Update Status
                        </DialogTitle>
                        <DialogContent>
                            <Divider />
                            <p style={{ paddingLeft: '10px' }}>Project name</p>
                            <InputBase
                                id="projectName"
                                value={selectedProject.name}
                                variant="outlined"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    width: '100%',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    padding: '5px 10px'

                                }}
                                onChange={""}
                                inputProps={{
                                    readOnly: true
                                  }}
                            />
                            <p style={{ paddingLeft: '10px' }}>Status *</p>
                            <select
                                id="status"
                                defaultValue={selectedProject.status}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    width: '300px',
                                    alignItems: 'left',
                                    padding: '12px',
                                    margin: '3px',
                                    border: '1px solid rgba(0, 0, 0, 0.12)'
                                }}
                                onChange={this.onEnvChange}
                            >
                                <option value="Approved">Approved</option>
                                <option value="Disputed">Disputed</option>
                                <option value="Test Stage">Test Stage</option>
                                <option value="In Review">In Review</option>
                            </select>
                            <p style={{ paddingLeft: '10px' }}>Comment *</p>
                            <textarea
                                rows={8}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    width: '100%',
                                    border: '1px solid rgba(0, 0, 0, 0.12)'
                                }}
                            ></textarea>
                            <p style={{ paddingLeft: '10px' }}>Comment about the resolution of the status</p>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={this.handleClose}>
                                <span style={{ padding: '0 15px' }}>Cancel</span>
                            </Button>
                            <Button
                                variant="outlined"
                                style={{ backgroundColor: '#00b3b3', color: 'white' }}
                                onClick={""}
                            >
                                <span style={{ padding: '0 15px' }}>Submit</span>
                            </Button>
                        </DialogActions>
                    </Paper>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Home);