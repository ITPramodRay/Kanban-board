import axios from "axios"
import { ADDDATA, DELETEDATA, GETDATA, GETERROR, LOADDATA,ADD_NEW_USER, UPDATEDATA } from "./userActionType"


export const TaskReq=()=>{
    return{
        type:LOADDATA
    }
}


export const TaskSucc=(payload)=>{
    return{
        type:GETDATA,
        payload
    }
}


export const AddTaskSucc=(payload)=>{
    // console.log(payload)
    return{
        type:ADDDATA,
        payload
    }
}




export const TaskFail=()=>{
    return{
        type:GETERROR,
        
    }
}


export const AddTask=(payload)=>(dispatch)=>{

    dispatch(TaskReq())
    axios.post(`http://localhost:3001/tasks`,payload)
        .then((res)=>dispatch(AddTaskSucc(res.data)))
        .then((r)=>dispatch({type:GETDATA,payload:r.data}))
        .catch(()=>dispatch(TaskFail()))
    }




export const getTasks=(payload)=>(dispatch)=>{
    dispatch({type: LOADDATA })
    return axios.get(`http://localhost:3001/tasks`)
    .then((r)=>dispatch({type:GETDATA,payload:r.data}))
    .catch((e)=>dispatch({type:GETERROR,payload:e}))

}

//update task....

export const updateTask=(id,payload)=>(dispatch)=>{
    console.log(id,payload,"a");
    dispatch({type:LOADDATA})
    return axios.patch(`http://localhost:3001/tasks/${id}`,
    payload).then((r)=>{
        dispatch({type:UPDATEDATA,payload:r.data})
    })
    .catch((e)=>dispatch({type:GETERROR,payload:e}))
}


export const AddNewUser = (data) => {
    return {
        type: ADD_NEW_USER,
        payload: data
    }
}



//dELETE Task.......

export const DeleteData=(id)=>(dispatch)=>{
    dispatch({type:LOADDATA})
   return axios.delete(`http://localhost:3001/tasks/${id}`)
    .then((r)=>dispatch({type:DELETEDATA,r}))
    .catch((e)=>dispatch({type:GETERROR,e}))
}