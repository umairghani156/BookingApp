import React, { useState } from 'react';
import "./home.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { FaHotel } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";



import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <FaHotel />),
  getItem('Users', 'sub1', <UserOutlined  />),
  getItem('Hotels', 'sub2', <FaHotel />),
  getItem('Rooms', '9', <MdDateRange />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
    <div>
    </div>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='dashboard'style={{padding:"0 5px"}}>
          <button className='btn' style={{width:"100%", display:"flex",gap:"10px", padding:"10px 0 10px 18px", borderRadius:"10px", fontSize:"16px"}}><MdDashboardCustomize size={17}/>Dashboard</button>
        </div>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
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
            Bill is a cat.
          </div>
        </Content>
       
      </Layout>
    </Layout>
    </>
  );
};
export default Home;