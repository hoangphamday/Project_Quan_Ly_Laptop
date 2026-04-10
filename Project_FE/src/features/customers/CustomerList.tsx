import React from 'react';
import { Card, Table, Tag, Button, Input, Avatar, Space, Typography, Tooltip } from 'antd';
import { SearchOutlined, UserOutlined, EditOutlined, StopOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const mockCustomers = [
  { id: 'CUS-001', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567', totalOrders: 5, totalSpent: '150.000.000đ', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'CUS-002', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0912345678', totalOrders: 2, totalSpent: '45.000.000đ', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'CUS-003', name: 'Lê Hoàng C', email: 'lehoangc@gmail.com', phone: '0987654321', totalOrders: 0, totalSpent: '0đ', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 'CUS-004', name: 'Phạm Văn D', email: 'phamvand@gmail.com', phone: '0976543210', totalOrders: 12, totalSpent: '320.500.000đ', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 'CUS-005', name: 'Đỗ Thị E', email: 'dothie@gmail.com', phone: '0965432109', totalOrders: 1, totalSpent: '35.000.000đ', status: 'Blocked', avatar: 'https://i.pravatar.cc/150?u=5' },
];

export const CustomerList: React.FC = () => {
  const columns = [
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} size="large" icon={<UserOutlined />} />
          <div>
            <div className="font-semibold text-slate-800">{record.name}</div>
            <div className="text-sm text-slate-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Đơn hàng', dataIndex: 'totalOrders', key: 'totalOrders', align: 'center' as const },
    { title: 'Tổng chi tiêu', dataIndex: 'totalSpent', key: 'totalSpent', align: 'right' as const, render: (val: string) => <span className="font-semibold">{val}</span> },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Active' ? 'success' : status === 'Inactive' ? 'default' : 'error';
        let text = status === 'Active' ? 'Hoạt động' : status === 'Inactive' ? 'Chưa mua' : 'Bị khóa';
        return <Tag color={color} className="rounded-md px-2 py-0.5">{text}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'right' as const,
      render: () => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined className="text-blue-600" />} />
          </Tooltip>
          <Tooltip title="Khóa tài khoản">
            <Button type="text" danger icon={<StopOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Danh sách Khách hàng</Title>
          <Text className="text-slate-500">Quản lý thông tin và lịch sử mua hàng của khách</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 rounded-lg h-10">Thêm khách hàng</Button>
      </div>

      <Card bordered={false} className="shadow-sm rounded-xl">
        <div className="flex gap-4 mb-6">
          <Input 
            prefix={<SearchOutlined className="text-slate-400" />} 
            placeholder="Tìm kiếm theo tên, email, SĐT..." 
            className="max-w-md h-10 rounded-lg focus:border-blue-500 hover:border-blue-400"
          />
        </div>
        <Table 
          columns={columns} 
          dataSource={mockCustomers} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};
