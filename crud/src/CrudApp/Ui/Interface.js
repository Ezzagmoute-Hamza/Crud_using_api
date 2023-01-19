import React, { useEffect,useState } from 'react';
import Loading from "./Loading";
import { useDispatch,useSelector } from 'react-redux';
import {FetchUser,AddUser,DeleteUser} from '../StoreAndReducer/Reducer';
import {Showadd,ShowEdit,Fill_selectedElement} from "../StoreAndReducer/Reducer";
export default function Interface() {
  const {users,loading}=useSelector(state=>state.users);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(FetchUser());
  },[])

  const toShowAaddForm=()=>{
    dispatch(Showadd(true))
 };

 const toShowAaddForm_Andhold_rowInfo=(ele)=>{
   dispatch(ShowEdit(true));
   dispatch(Fill_selectedElement(ele));
    
 };
 const DeleteUsr=(id)=>{
    dispatch(DeleteUser(id))
 };

 const getData=users.map((ele,index)=>{
    return(
        <tr key={index}>
        <td scope="row" className='text-primary fw-1'>{index + 1}</td>
        <td>{ele.name}</td>
        <td>{ele.username}</td>
        <td>{ele.email}</td>
        <td className='text-center'>
        <button className='btn btn-primary m-1' onClick={()=>{toShowAaddForm_Andhold_rowInfo({...ele,Eleindex:index})}}><i className="bi bi-pencil-square"></i></button>
        <button className='btn btn-danger m-1' onClick={()=>{DeleteUsr(ele.id)}}><i className="bi bi-trash-fill"></i></button></td>
        </tr>
    );
  });

 const Searching=(e)=>{
    const inputContent=e.target.value;
    document.querySelectorAll('table tbody tr').forEach((ele)=>{
        const Name=ele.children[1].textContent.toLowerCase();
        const userName=ele.children[2].textContent.toLowerCase();
        if(Name.includes(inputContent.toLowerCase()) ||userName.includes(inputContent.toLowerCase()) ){
           ele.style.display="table-row";
        }else{
            ele.style.display="none";
        }

    })
}
  
  return (
    <div className='container mybody'>
    <div className="form-group mydiv">
        <input type="text" className="form-control myinput" id="formGroupExampleInput" placeholder="Search" onInput={Searching}/>
        <button className='btn btn-success mx-2 btn-block' onClick={toShowAaddForm} disabled={loading}><i className="bi bi-plus-circle-fill fs-4 fw-4"></i></button>
   </div>
     <table id='mytable' className="table table-hover border ">
            <thead className='thead-dark'>
                <tr>
                <th scope="col">Order</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.length!==0?getData:<tr><td colSpan={5}><Loading/></td></tr>}         
            </tbody> 
     </table>
    </div>
  )
}
