import React, { useState } from 'react';
import { FaHotel } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { getUserSuccess} from "../../Redux/userSlice"


import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Users from '../user/Users.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Hotel from '../../hotels/Hotel.jsx';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Users', 'user', <UserOutlined/>),
  getItem('Hotels', 'hotel', <FaHotel />),
  getItem('Rooms', 'room', <MdDateRange />),
  getItem('Delivery', 'delivery', <PieChartOutlined />),
];

const Profile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
 dispatch(getUserSuccess({name: "Atiq", age: 34}))
 
  const [isDashboard, setDashboard] = useState(false);
  const [isUser, setUsers] = useState(false);
  const [isHotel, setHotels] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dashboardHandler = ()=>{
    console.log("Running");
    setDashboard(true)
  }
  const helloworld =(e)=>{
    if(e.key == "user"){
      setUsers(true)
      setHotels(false)
      navigate("/")
    }else if(e.key == "hotel"){
      setUsers(false)
      setHotels(true)
      
    }
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <p className='mainPara' style={{color:"white", padding:"0 24px",marginBottom:"2px"}}>MAIN</p>
      <div className='dashboard'style={{padding:"0 5px"}}>
          <button className='btn' style={{width:"100%", display:"flex",gap:"10px", padding:"10px 0 10px 18px", borderRadius:"10px", fontSize:"16px"}} onClick={dashboardHandler}><MdDashboardCustomize size={17}/>Dashboard</button>
        </div>
        <div className="demo-logo-vertical" />
        <p className='mainPara' style={{color:"white", padding:"0 24px",marginBottom:"2px"}}>LISTS</p>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e)=>helloworld(e)}/>
        <p className='mainPara' style={{color:"white", padding:"0 24px",marginBottom:"2px"}}>USER</p>
      <div className='dashboard'style={{padding:"0 5px"}}>
          <button className='btn' style={{width:"100%", display:"flex",gap:"10px", padding:"10px 0 10px 18px", borderRadius:"10px", fontSize:"16px"}}><IoIosLogOut size={17}/>Logout</button>
        </div>
      </Sider>
      <Layout>
        <>{isUser &&
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
             <div className="addUser">
           <h2 className='addUserTitle'>Add New User</h2>
           <button className='addUserButton'>Add New</button>
           </div>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <Users/>
         
          
           
          </div>
        </Content>
}
   <div>
   {isHotel &&
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
             <div className="addUser">
           <h2 className='addUserTitle'>Add New Hotel</h2>
           <button className='addUserButton'>Add Hotel</button>
           </div>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <Hotel/>
         
          
           
          </div>
        </Content>
}
   </div>
</>
      </Layout>
    </Layout>
  );
  
};
export default Profile;