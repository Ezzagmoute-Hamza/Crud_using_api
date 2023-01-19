import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {ShowEdit,EditUser} from "../StoreAndReducer/Reducer";
export default function Edituser() {
  const {selectedElement}=useSelector(state=>state.users);
  const [formValue,setFormValue]=useState(selectedElement);
  const dispatch=useDispatch()

  const HideEditForm=()=>{
     dispatch(ShowEdit(false));
  }

  const HandleFormValues=(e)=>{
     const {name,value}=e.target;
     setFormValue({...formValue,[name]:value});
  }
  const toChangeInfo=()=>{
        console.log("tt",selectedElement.Eleindex,formValue)
        dispatch(EditUser({id : selectedElement.id, input_value : formValue}));
        dispatch(ShowEdit(false));
  }

  return (
    <div className='AdduserContainer'>
         <div className='border p-4 myForm' onSubmit={(e)=>{e.preventDefault()}}>
         {/* {JSON.stringify(formValue)} */}
              <h1 className='fs-1 fw-2 text-center text-success'>Edit User</h1>
                <div class="form-group">
                    <label for="exampleInputName">Name:</label>
                    <input type="text" class="form-control" id="exampleInputName" name='name' defaultValue={selectedElement.name} placeholder="Enter Name" onChange={HandleFormValues}/>
                </div>
                <div class="form-group">
                  <label for="exampleInputusername">Username:</label>
                    <input type="text" class="form-control" id="exampleInputusername" name='username' defaultValue={selectedElement.username} placeholder="Enter Username" onChange={HandleFormValues}/>
                </div>
                <div class="form-group">
                  <label for="Email">Email:</label>
                    <input type="Email" class="form-control" id="Email" name='email' defaultValue={selectedElement.email} placeholder="Enter Email" onChange={HandleFormValues}/>
                </div>
              <div className='row'>
                  <div className='col-6'><button className='btn btn-success' style={{width:"100%"}} onClick={toChangeInfo}>Edit</button></div>
                  <div className='col-6'><button className='btn btn-danger' style={{width:"100%"}} onClick={HideEditForm}>Cancel</button></div>
              </div>
       </div>
    </div>
  )
}