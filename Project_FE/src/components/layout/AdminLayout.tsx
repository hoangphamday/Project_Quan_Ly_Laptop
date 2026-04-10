import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Input, Badge, Button } from 'antd';
import { 
  LaptopOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  BarChartOutlined, 
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SearchOutlined,
  BankOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/admin', icon: <BarChartOutlined />, label: 'Tổng quan' },
    { key: '/admin/laptops', icon: <LaptopOutlined />, label: 'Sản phẩm' },
    { key: '/admin/orders', icon: <ShoppingCartOutlined />, label: 'Đơn hàng' },
    { key: '/admin/customers', icon: <UserOutlined />, label: 'Khách hàng' },
    { key: '/admin/suppliers', icon: <BankOutlined />, label: 'Nhà cung cấp' },
    { key: '/admin/imports', icon: <FileTextOutlined />, label: 'Nhập hàng' },
    { key: '/admin/settings', icon: <SettingOutlined />, label: 'Cài đặt' },
  ];

  return (
    <Layout className="min-h-screen bg-slate-50">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="dark"
        className="shadow-xl z-20 h-screen overflow-y-auto custom-scrollbar"
        style={{ position: 'fixed', left: 0, top: 0, bottom: 0 }}
        width={260}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          {!collapsed ? (
            <div className="flex items-center gap-2 px-4 transition-all duration-300">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                LT
              </div>
              <span className="text-white font-semibold text-lg truncate">Laptop Admin</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              LT
            </div>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="mt-4 border-none"
        />
      </Sider>
      
      <Layout 
        className="bg-slate-50 transition-all duration-300 min-h-screen" 
        style={{ marginLeft: collapsed ? 80 : 260 }}
      >
        <Header className="bg-white px-6 h-16 flex items-center justify-between shadow-sm z-10 sticky top-0 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined className="text-lg" /> : <MenuFoldOutlined className="text-lg" />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 w-10 h-10 flex items-center justify-center rounded-lg"
            />
            
            <div className="hidden md:flex items-center">
              <Input 
                prefix={<SearchOutlined className="text-slate-400" />} 
                placeholder="Tìm kiếm..." 
                className="w-64 rounded-lg border-slate-200 hover:border-blue-400 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Badge count={5} size="small" className="cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                <BellOutlined className="text-lg" />
              </div>
            </Badge>
            
            <Dropdown menu={{
              items: [
                { key: '1', label: 'Tài khoản' },
                { key: '2', label: 'Cài đặt' },
                { type: 'divider' },
                { key: '3', label: 'Đăng xuất', danger: true },
              ]
            }} trigger={['click']}>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-slate-700 leading-tight">Admin Hoàng</div>
                  <div className="text-xs text-slate-500">Quản trị viên</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="p-6 md:p-8 overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
