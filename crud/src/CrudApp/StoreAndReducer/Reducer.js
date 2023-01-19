import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const FetchUser=createAsyncThunk("users/fetchUser", async()=>{
    const res=await fetch("http://localhost:4000/users").then(res=>res.json());
    return res;
})

export const AddUser=createAsyncThunk("users/AddUser",async(newUser)=>{
    const res=await fetch('http://localhost:4000/users',
    {
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
            "Content-type":"application/json"
        }
    }).then(res=>res.json());
   
    return res;
})

export const DeleteUser=createAsyncThunk("users/DeleteUser",async(userId)=>{
    const res=await fetch(`http://localhost:4000/users/${userId}`).then(res=>res.json());
    await fetch(`http://localhost:4000/users/${userId}`,{method:"DELETE"}).then(res=>res.json());
    return res;
})

export const EditUser=createAsyncThunk("users/EditUser",async({id, input_value})=>{
    const res= await fetch(`http://localhost:4000/users/${id}`,
    {
        method:"PATCH",
        body:JSON.stringify(input_value),
        headers:{
            "Content-type":"application/json"
        }
    }
    ).then(res=>res.json());
    console.log('new res',res);
    return res;
})

const UserSlice = createSlice({
  name:"UserSlice",
  initialState:{
    users:[],
    loading:true,
    added:null,
    deleted:null,
    updated:null,
    selectedElement:{name:"def",username:"def",email:"def"},
    showAadd_Form:false,
    showEdit_Form:false
  },
  reducers:{
     Showadd:(state,{payload})=>{
        return {...state,showAadd_Form:payload}
     },
     ShowEdit:(state,{payload})=>{
        return {...state,showEdit_Form:payload}
     },
     Fill_selectedElement:(state,{payload})=>{
        return {...state,selectedElement:payload}
     }
  },
  extraReducers:{
    // fetch data
    [FetchUser.pending]:(state)=>{
        state.loading='Loading';
    },
    [FetchUser.fulfilled]:(state,{payload})=>{
        state.users=payload;
        state.loading=false;
    },
    [FetchUser.rejected]:(state)=>{
        state.loading='No found data';
    },
  // Add new user
    [AddUser.pending]:(state)=>{
        state.added='sending';
    },
    [AddUser.fulfilled]:(state,{payload})=>{
        console.log(payload);
        state.users=[...state.users,payload];
        state.added='new user added';
    },
    [AddUser.rejected]:(state)=>{
       state.added='No User has added';
    },
     // Delete user
    [DeleteUser.pending]:(state)=>{
        state.deleted='Deleting';
    },
    [DeleteUser.fulfilled]:(state,{payload})=>{
        state.users=state.users.filter(ele=>ele.id !== payload.id);
        state.deleted='user Deleted';
    },
    [DeleteUser.rejected]:(state)=>{
       state.deleted='No User has been deleted';
    },
    // Update user
    [EditUser.pending]:(state)=>{
        state.updated='Updating';
    },
    [EditUser.fulfilled]:(state,{payload})=>{

        state.users[payload.Eleindex]=payload;
        state.updated='user Updated';
    },
    [EditUser.rejected]:(state)=>{
       state.updated='No User has been updated';
    }
  }
})

export const {Showadd,ShowEdit,Fill_selectedElement}=UserSlice.actions;
export default UserSlice.reducer;















