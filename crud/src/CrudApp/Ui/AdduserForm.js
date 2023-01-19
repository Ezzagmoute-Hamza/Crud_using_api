import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Showadd,AddUser} from "../StoreAndReducer/Reducer";
export default function Adduser() {
  const dispatch=useDispatch()
  const [formValue,setFormValue]=useState({name:"",username:"",email:""});

  const HideAddForm=()=>{
     dispatch(Showadd(false));
  }
  const HandleFormValues=(e)=>{
    const {name,value}=e.target;
    setFormValue({...formValue,[name]:value});
 }

 const toPostUser=()=>{
     dispatch(AddUser(formValue));
     dispatch(Showadd(false));
 }
  return (
    <div className='AdduserContainer'>
         <div className='border p-4 myForm' onSubmit={(e)=>{e.preventDefault()}}>
         {/* {JSON.stringify(formValue)} */}
              <h1 className='fs-1 fw-2 text-center text-success'>Add User</h1>
                <div class="form-group">
                    <label for="exampleInputName">Name:</label>
                    <input type="text" class="form-control" id="exampleInputName" name="name" placeholder="Enter Name"  onChange={HandleFormValues}/>
                </div>
                <div class="form-group">
                  <label for="exampleInputusername">Username:</label>
                    <input type="text" class="form-control" id="exampleInputusername" name="username" placeholder="Enter Username" onChange={HandleFormValues}/>
                </div>
                <div class="form-group">
                  <label for="Email">Email:</label>
                    <input type="Email" class="form-control" id="Email" name="email" placeholder="Enter Email" onChange={HandleFormValues}/>
                </div>
              <div className='row'>
                  <div className='col-6'><button className='btn btn-success' style={{width:"100%"}} onClick={toPostUser}>Add</button></div>
                  <div className='col-6'><button className='btn btn-danger' style={{width:"100%"}} onClick={HideAddForm}>Cancel</button></div>
              </div>
       </div>
    </div>
  )
}
