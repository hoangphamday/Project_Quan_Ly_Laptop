import React from 'react';
import { Card, Table, Tag, Button, Input, Select, DatePicker, Space, Typography, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const mockOrders = [
  { id: '#ORD-001', customer: 'Nguyễn Văn A', product: 'MacBook Pro M3 Max 16"', date: '2023-11-20', status: 'Completed', amount: '120.000.000đ', payment: 'Thẻ tín dụng' },
  { id: '#ORD-002', customer: 'Trần Thị B', product: 'ThinkPad X1 Carbon Gen 11', date: '2023-11-20', status: 'Processing', amount: '45.000.000đ', payment: 'Chuyển khoản' },
  { id: '#ORD-003', customer: 'Lê Hoàng C', product: 'Dell XPS 15 9530', date: '2023-11-19', status: 'Pending', amount: '52.000.000đ', payment: 'COD' },
  { id: '#ORD-004', customer: 'Phạm Văn D', product: 'ASUS ROG Zephyrus G14', date: '2023-11-19', status: 'Completed', amount: '48.500.000đ', payment: 'Thẻ tín dụng' },
  { id: '#ORD-005', customer: 'Đỗ Thị E', product: 'LG Gram 16 2023', date: '2023-11-18', status: 'Cancelled', amount: '35.000.000đ', payment: 'COD' },
  { id: '#ORD-006', customer: 'Vũ Văn F', product: 'HP Specter x360', date: '2023-11-18', status: 'Completed', amount: '41.000.000đ', payment: 'Chuyển khoản' },
];

export const OrderList: React.FC = () => {
  const columns = [
    { title: 'Mã ĐH', dataIndex: 'id', key: 'id', render: (text: string) => <span className="font-semibold text-blue-600">{text}</span> },
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer', className: 'font-medium text-slate-700' },
    { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
    { title: 'Ngày đặt', dataIndex: 'date', key: 'date' },
    { 
      title: 'Thanh toán', 
      dataIndex: 'payment', 
      key: 'payment',
      render: (payment: string) => <span className="text-slate-500 text-sm">{payment}</span>
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = status === 'Completed' ? 'success' : status === 'Processing' ? 'processing' : status === 'Pending' ? 'warning' : 'error';
        let text = status === 'Completed' ? 'Hoàn thành' : status === 'Processing' ? 'Đang giao' : status === 'Pending' ? 'Chờ xử lý' : 'Đã hủy';
        return <Tag color={color} className="rounded-md px-2 py-0.5">{text}</Tag>;
      }
    },
    { title: 'Tổng tiền', dataIndex: 'amount', key: 'amount', align: 'right' as const, render: (text: string) => <span className="font-bold text-slate-800">{text}</span> },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: () => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button type="text" icon={<EyeOutlined className="text-blue-600" />} />
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
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Quản lý Đơn hàng</Title>
          <Text className="text-slate-500">Theo dõi và xử lý các đơn đặt hàng</Text>
        </div>
        <Button icon={<DownloadOutlined />} className="rounded-lg h-10">Xuất báo cáo</Button>
      </div>

      <Card bordered={false} className="shadow-sm rounded-xl">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input 
            prefix={<SearchOutlined className="text-slate-400" />} 
            placeholder="Mã đơn hàng, tên khách hàng..." 
            className="w-64 h-10 rounded-lg focus:border-blue-500 hover:border-blue-400"
          />
          <Select 
            defaultValue="all" 
            className="w-40 h-10"
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'pending', label: 'Chờ xử lý' },
              { value: 'processing', label: 'Đang giao' },
              { value: 'completed', label: 'Hoàn thành' },
              { value: 'cancelled', label: 'Đã hủy' },
            ]}
          />
          <RangePicker className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-500" placeholder={['Từ ngày', 'Đến ngày']} />
        </div>

        <Table 
          columns={columns} 
          dataSource={mockOrders} 
          rowKey="id"
          pagination={{ pageSize: 8 }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};
