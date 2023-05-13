import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTask, getTasks } from '../redux/action/userAction';
import Task from './Task';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Home = () => {



  let dispatch = useDispatch();
  const [err, setError] = useState({});


  let [task, setTask] = useState({
    id: "",
    name: "",
    stage: 1,
    priority: "",
    deadline: ""
  })

  const handleData = (e) => {
    let { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setError(taskValidations(task));
  }

  const taskValidations = (val) => {
    const err = {};

    if (!val.name) {
      err.name = "task name is required";
    } else if (val.name.length < 3) {
      err.name = " name should have atleast 3 characters!";
    } else if (val.name.length >= 100) {
      err.name = "name should have atmax 15 characters!";
    }


    if (!val.priority) {
      err.priority = "task priority is required";
    }


    if (!val.deadline) {
      err.deadline = "task deadline is required";
    }


    return err;
  };

  const handelAddTask = (e) => {
    e.preventDefault();
    if (task.name !== "" && task.priority !== '' && task.deadline !== "") {
      setError(taskValidations(task))
      dispatch(AddTask(task));
      dispatch(getTasks());
      setTask({
        ...task,
        name: "",
        stage: 1,
        priority: "",
        deadline: ""
      })
      handleClose();
    } else {
      setError(taskValidations(task))
    }



  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [task, dispatch, getTasks])
  return (
    <div className='container'>
      <div className='d-flex justify-content-end py-4 align-items-end'>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add New Task</Button>
      </div>
      <Dialog
        fullWidth={'500px'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>Create Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handelAddTask} >
            <label className="form-label">Task name</label>
            <input className="form-control w-100" value={task.name} onChange={(e) => handleData(e)} name="name" placeholder='Enter Task name' />
            <p>{err?.name}</p>
            <label className="form-label">Priority</label>
            <select className="form-control w-100" value={task.priority} name="priority" onChange={(e) => handleData(e)} >
              <option value="" disabled={true}>Choose one..</option>
              <option value="High">High</option>
              <option value="Low" >Low</option>
              <option value="medium" >Medium</option>

            </select>
            <p>{err?.priority}</p>

            <label className="form-label">Deadline</label>
            <input className="form-control w-50" type={"time"} value={task.deadline} name="deadline" onChange={(e) => handleData(e)} />
            <p>{err?.deadline}</p>
            <Button color='primary' variant='contained' type='submit' > + Create Task</Button>
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>

      </Dialog>

      <Task />
    </div>
  )
}

export default Home