import React from 'react';
import { Card, Table, Tag, Button, Input, Space, Typography, Tooltip, Avatar } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, BankOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const mockSuppliers = [
  { id: 'SUP-001', name: 'Công ty TNHH Apple Việt Nam', contact: 'Nguyễn Văn A', phone: '0901 112 222', email: 'contact@apple.vn', status: 'Active' },
  { id: 'SUP-002', name: 'Dell Technologies VN', contact: 'Trần Thị B', phone: '0903 334 444', email: 'sales@dell.com.vn', status: 'Active' },
  { id: 'SUP-003', name: 'ASUS Vietnam', contact: 'Lê Hoàng C', phone: '0905 556 666', email: 'info@asus.vn', status: 'Active' },
  { id: 'SUP-004', name: 'HP Vietnam Co., Ltd', contact: 'Phạm Văn D', phone: '0907 778 888', email: 'distribute@hp.com.vn', status: 'Inactive' },
  { id: 'SUP-005', name: 'Lenovo Vietnam', contact: 'Vũ Văn F', phone: '0909 990 000', email: 'partner@lenovo.vn', status: 'Active' },
];

export const SupplierList: React.FC = () => {
  const columns = [
    {
      title: 'Nhà cung cấp',
      key: 'supplier',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<BankOutlined />} className="bg-blue-100 text-blue-600" />
          <div className="font-semibold text-slate-800">{record.name}</div>
        </div>
      ),
    },
    { 
      title: 'Người liên hệ', 
      dataIndex: 'contact', 
      key: 'contact',
      render: (text: string) => <span className="text-slate-700 font-medium">{text}</span>
    },
    { 
      title: 'Thông tin liên lạc', 
      key: 'contactInfo',
      render: (_: any, record: any) => (
        <div className="text-sm text-slate-500 space-y-1">
          <div className="flex items-center gap-2"><PhoneOutlined className="text-slate-400" /> {record.phone}</div>
          <div className="flex items-center gap-2"><MailOutlined className="text-slate-400" /> {record.email}</div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Active' ? 'success' : 'default';
        let text = status === 'Active' ? 'Đang hợp tác' : 'Ngừng hợp tác';
        return <Tag color={color} className="rounded-md px-2 py-0.5">{text}</Tag>;
      },
      align: 'center' as const
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
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Danh sách Nhà cung cấp</Title>
          <Text className="text-slate-500">Quản lý đối tác phân phối sản phẩm</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 rounded-lg h-10">Thêm nhà cung cấp</Button>
      </div>

      <Card bordered={false} className="shadow-sm rounded-xl">
        <div className="flex gap-4 mb-6">
          <Input 
            prefix={<SearchOutlined className="text-slate-400" />} 
            placeholder="Tìm kiếm theo tên nhà cung cấp, email, SĐT..." 
            className="max-w-md h-10 rounded-lg hover:border-blue-400 focus:border-blue-500"
          />
        </div>
        <Table 
          columns={columns} 
          dataSource={mockSuppliers} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};
