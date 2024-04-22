import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import "./users.css"
import { DataGrid } from '@mui/x-data-grid';
import {Link} from "react-router-dom";
import { userColumns, userRows } from '../../dataTableResources';
import useFetch from "../../hooks/useFetch"
import axios from 'axios';





export default function Users() {
  const [list, setList] = useState();
  const {data, loading, error} = useFetch(`http://localhost:5000/api/users`)
  console.log("data", data);

  useEffect(()=>{
    setList(data)
  },[data])
  const deleteUser = async(id)=>{
    const token = localStorage.getItem('token');
    console.log("toke", token);
   try{
    await axios.delete(`http://localhost:5000/api/users/${id}`,{
      headers: {
          'Authorization': `${token}`
      }})
    setList(list.filter((item)=> item._id !== id))
   }catch(err){
    console.log(err);
   }
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => deleteUser(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  console.log("list",list);

  
  
  return (
    <div>
      <DataGrid
        rows={list || []}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={row => row._id}
      />
      </div>
   
  );
}