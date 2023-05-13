import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteData, getTasks, updateTask } from "../redux/action/userAction";
import { DELETEDATA } from "../redux/action/userActionType";
import "./Task.css";
import {
  Button,
  Typography,
  Dialog,
  Card
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const Task = () => {
  let TaskData = useSelector((store) => store.taskReducer.userTask);
  let dispatch = useDispatch();
  let [task, setTask] = useState();
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [err, setError] = useState({});
  const [editOpen, setEditOpen] = useState(false)


  let [edittask, setEditTask] = useState({
    id: "",
    name: "",
    stage: 0,
    priority: "",
    deadline: ""
  })

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id)
  };
  const handleClose = () => {
    setOpen(false);
    // render task acc. to stage....
    setEditOpen(false)
  };
  //   console.log(TaskData);

  // handle next..
  const handleNext = (id, stage) => {
    let newStage = TaskData && TaskData.filter((t) => {
      if (t.id == id) {
        t.stage = stage;
      }
      console.log(id, stage)
      return t;
    });
    setTask({ ...task, newStage });
  }
  const handlePrev = (id, stage) => {
    let newStage = TaskData && TaskData.filter((t) => {
      if (t.id == id) {
        t.stage = stage;
      }
      return t;
    });
    setTask({ ...task, newStage });
  }
  const handleDelete = () => {
    dispatch({
      type: DELETEDATA,
      payload: deleteId
    })
    // let newStage = TaskData && TaskData.filter((t) => {
    //   if (t.id == deleteId) {
    //     t.stage = 4;
    //   }
    // })
    // let newStage = TaskData;
    // newStage.splice(deleteId,1)

    // setTask(newStage);
    handleClose()
  }
  // drag_drop....
  var tasks = {
    backlog: [],
    todo: [],
    ongoing: [],
    done: [],
  };

  // render task acc. to stage....
  TaskData &&
    TaskData.map((t) => {
      if (t.stage == 0) {
        tasks.backlog.push(
          <div
            key={t.id}
            onDragStart={(e) => onDragStart(e, t.id)}
            className="card m-1"
            draggable
          >
            <Card className="card p-2">
              <h5>Name: {t.name}</h5>
              <h6>Priority: {t.priority}</h6>
              <h6>Stage: {t.stage}</h6>
              <h6>Deadline: {t.deadline}</h6>
              <div className="small-card">
                <Button size="small" variant="contained" color="primary" disabled onClick={() => handlePrev(t.id, parseInt(t.stage))}>Back</Button>
                <Button size="small" color="primary" onClick={() => handleEditOpen(t.id)}><i className="fas fa-edit"></i></Button>
                <Button size="small" color="secondary" onClick={() => handleClickOpen(t.id)} ><i className="fas fa-trash"></i></Button>
                <Button size="small" variant="contained" color="primary" onClick={() => handleNext(t.id, parseInt(t.stage) + 1)}>Next</Button>
              </div>
            </Card>
          </div>
        );
      }

      if (t.stage == 1) {
        tasks.todo.push(
          <div
            key={t.id}
            onDragStart={(e) => onDragStart(e, t.id)}
            className="card m-1"
            draggable
          >
            <div className="card p-2">
              <h5>Name: {t.name}</h5>
              <h6>Priority: {t.priority}</h6>
              <h6>Stage: {t.stage}</h6>
              <h6>Deadline: {t.deadline}</h6>
              <div className="small-card">
                <Button size="small" variant="contained" color="primary" disabled onClick={() => handlePrev(t.id, parseInt(t.stage) - 1)}>Back</Button>
                <Button size="small" color="primary" onClick={() => handleEditOpen(t.id)}><i className="fas fa-edit"></i></Button>
                <Button size="small" color="secondary" onClick={() => handleClickOpen(t.id)} ><i className="fas fa-trash"></i></Button>
                <Button size="small" variant="contained" color="primary" onClick={() => handleNext(t.id, parseInt(t.stage) + 1)}>Next</Button>
              </div>
            </div>
          </div>
        );
      }
      if (t.stage == 2) {
        tasks.ongoing.push(
          <div
            key={t.id}
            onDragStart={(e) => onDragStart(e, t.id)}
            onDrop={(e, v) => console.log(e, v)}
            className="card m-1"
            draggable

          >
            <div className="card p-2">
              <h5>Name: {t.name}</h5>
              <h6>Priority: {t.priority}</h6>
              <h6>Stage: {t.stage}</h6>
              <h6>Deadline: {t.deadline}</h6>
              <div className="small-card">
                <Button size="small" variant="contained" color="primary" onClick={() => handlePrev(t.id, parseInt(t.stage) - 1)}>Back</Button>
                <Button size="small" color="primary" onClick={() => handleEditOpen(t.id)}><i className="fas fa-edit"></i></Button>
                <Button size="small" color="secondary" onClick={() => handleClickOpen(t.id)} ><i className="fas fa-trash"></i></Button>
                <Button size="small" variant="contained" color="primary" onClick={() => handleNext(t.id, parseInt(t.stage) + 1)}>Next</Button>
              </div>
            </div>
          </div>
        );
      }

      if (t.stage == 3) {
        tasks.done.push(
          <div
            key={t.id}
            onDragStart={(e) => onDragStart(e, t.id)}
            className="card m-1"
            draggable
            onDrop={(e, v) => console.log(e, v)}
          >
            <div className="card p-2">
              <h5>Name: {t.name}</h5>
              <h6>Priority: {t.priority}</h6>
              <h6>Stage: {t.stage}</h6>
              <h6>Deadline: {t.deadline}</h6>
              <div className="small-card">
                <Button size="small" variant="contained" color="primary" onClick={() => handlePrev(t.id, parseInt(t.stage) - 1)}>Back</Button>
                <Button size="small" color="primary" onClick={() => handleEditOpen(t.id)}><i className="fas fa-edit"></i></Button>
                <Button size="small" color="secondary" onClick={() => handleClickOpen(t.id)} ><i className="fas fa-trash"></i></Button>
                <Button size="small" variant="contained" color="primary" disabled onClick={() => handleNext(t.id, parseInt(t.stage) + 1)}>Next</Button>
              </div>
            </div>
          </div>
        );
      }
    });

  function onDragStart(e, id) {
    // console.log(e, id);
    e.dataTransfer.setData("id", id);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(ev, stage) {
    let id = ev.dataTransfer.getData("id");
    //   console.log(ev,id,stage);
    let newStage = TaskData && TaskData.filter((t) => {

      if (t.id == id) {
        // console.log(t.stage,"n");
        t.stage = stage;
      }
      return t;
    });
    setTask({ ...task, newStage });
    // console.log(task,"new");
    //   dispatch(updateTask(id,newStage))
    //   dispatch(getTasks());
  }
  const taskValidations = (val) => {
    const err = {};

    if (!val.name) {
      err.name = "task name is required";
    } else if (val.name.length < 3) {
      err.name = " name should have atleast 3 characters!";
    } else if (val.name.length >= 15) {
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

  const handleData = (e) => {
    let { name, value } = e.target;
    setEditTask({ ...edittask, [name]: value });
    setError(taskValidations(edittask));
  }
  const handleEditOpen = (id) => {
    TaskData.filter(t => {
      if (t.id === id) {
        setEditTask({
          ...edittask,
          id: t.id,
          name: t.name,
          stage: t.stage,
          priority: t.priority,
          deadline: t.deadline
        })
        setEditOpen(true)
      }
    })
  }
  const handleEdit = () => {
    let newStage = TaskData && TaskData.filter((t) => {
      if (t.id == edittask.id) {
        t.name = edittask.name;
        t.priority = edittask.priority;
        t.deadline = edittask.deadline;
        t.stage = edittask.stage;
      }
      return t;
    });
    setTask({ ...task, newStage });
    handleClose()
  }
  // update Task
  function updateTask(id) {
    dispatch(updateTask(id))
  }

  useEffect(() => {
    setTask(TaskData);
    dispatch(getTasks());
  }, [dispatch, getTasks, DeleteData]);
  return (
    <>
      <div className="row align-items-center text-white text-center py-3" style={{ backgroundColor: "#3f51b5" }}>
        {/* <div class="col">BackLog</div> */}
        <div class="col">To Do</div>
        <div class="col">In Progress</div>
        <div class="col">Done</div>
      </div>
      <div className="drop-container">
        {/* <div className="BackLog" onDrop={(e) => onDrop(e, 0)} onDragOver={(e) => onDragOver(e)}>
          {tasks.backlog}
        </div> */}
        <div className="todo" onDrop={(e) => onDrop(e, 1)} onDragOver={(e) => onDragOver(e)}>
          {tasks.todo}
        </div>
        <div className="ongoing" onDrop={(e) => onDrop(e, 2)} onDragOver={(e) => onDragOver(e)}>
          {tasks.ongoing}
        </div>
        <div className="done" onDrop={(e) => onDrop(e, 3)} onDragOver={(e) => onDragOver(e)}>
          {tasks.done}
        </div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={editOpen}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Edit Task
          </DialogTitle>
          <DialogContent dividers style={{ width: '500px' }} >
            <form>
              <label>Task name</label>
              <input value={edittask.name} onChange={(e) => handleData(e)} name="name" placeholder='Enter Task name' />  <br /> <br />
              <p>{err?.task}</p>
              <label>Priority</label>
              <select value={edittask.priority} name="priority" onChange={(e) => handleData(e)} >
                <option value="" >----</option>
                <option value="High">High</option>
                <option value="Low" >Low</option>
                <option value="medium" >Medium</option>

              </select> <br /> <br />
              <p>{err?.priority}</p>

              <label>Deadline</label>
              <input value={edittask.deadline} type={"time"} name="deadline" onChange={(e) => handleData(e)} /> <br /> <br />
              <p>{err?.deadline}</p>
            </form>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => handleClose()} color="secondry">
              Cancel
            </Button>
            <Button autoFocus onClick={() => handleEdit()} color="danger">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Confirmation
          </DialogTitle>
          <DialogContent dividers style={{ width: '500px' }} >
            <Typography gutterBottom> Are you sure, Do you want remove this?</Typography>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => handleClose()} color="secondry">
              Cancel
            </Button>
            <Button autoFocus onClick={() => handleDelete()} color="danger">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Task;
