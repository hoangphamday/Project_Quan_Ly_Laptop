import React from 'react';
import { Card, Table, Tag, Button, Input, Select, DatePicker, Space, Typography, Tooltip, Badge, Row, Col } from 'antd';
import { SearchOutlined, EyeOutlined, PlusOutlined, FileTextOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const mockImports = [
  { id: 'IMP-2023-001', supplier: 'Công ty TNHH Apple Việt Nam', date: '2023-11-15', items: 150, total: '2.500.000.000đ', status: 'Completed', creator: 'Admin Hoàng' },
  { id: 'IMP-2023-002', supplier: 'Dell Technologies VN', date: '2023-11-20', items: 45, total: '850.000.000đ', status: 'Processing', creator: 'Admin Hoàng' },
  { id: 'IMP-2023-003', supplier: 'ASUS Vietnam', date: '2023-11-22', items: 100, total: '1.200.000.000đ', status: 'Pending', creator: 'NV Kho' },
  { id: 'IMP-2023-004', supplier: 'Lenovo Vietnam', date: '2023-11-23', items: 80, total: '950.000.000đ', status: 'Completed', creator: 'Admin Hoàng' },
  { id: 'IMP-2023-005', supplier: 'FPT Synnex', date: '2023-11-24', items: 200, total: '3.150.000.000đ', status: 'Processing', creator: 'NV Kho' },
];

export const ImportList: React.FC = () => {
  const columns = [
    { title: 'Mã Phiếu', dataIndex: 'id', key: 'id', render: (text: string) => <span className="font-semibold text-blue-600">{text}</span> },
    { title: 'Nhà cung cấp', dataIndex: 'supplier', key: 'supplier', className: 'font-medium text-slate-700' },
    { title: 'Người tạo', dataIndex: 'creator', key: 'creator', render: (text: string) => <div className="flex items-center gap-2 text-slate-600"><TeamOutlined /> {text}</div> },
    { title: 'Ngày nhập', dataIndex: 'date', key: 'date' },
    { title: 'Số lượng SP', dataIndex: 'items', key: 'items', align: 'center' as const, render: (val: number) => <Badge count={val} showZero color="#8b5cf6" /> },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = status === 'Completed' ? 'success' : status === 'Processing' ? 'processing' : 'warning';
        let text = status === 'Completed' ? 'Đã nhập kho' : status === 'Processing' ? 'Đang giao' : 'Chờ duyệt';
        return <Tag color={color} className="rounded-md px-2 py-0.5">{text}</Tag>;
      }
    },
    { title: 'Tổng tiền', dataIndex: 'total', key: 'total', align: 'right' as const, render: (text: string) => <span className="font-bold text-slate-800">{text}</span> },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: () => (
        <Space>
          <Tooltip title="Xem chi tiết phiếu nhập">
            <Button type="text" icon={<EyeOutlined className="text-blue-600" />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Quản lý Nhập hàng</Title>
          <Text className="text-slate-500">Lịch sử phiếu nhập và tình trạng hàng hóa</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 rounded-lg h-10">Tạo phiếu nhập mới</Button>
      </div>

      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <p className="text-slate-500 text-sm font-medium mb-1">Tổng tiền nhập (Tháng này)</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><DollarOutlined className="text-blue-500" /> 8.65 Tỉ đ</h3>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <p className="text-slate-500 text-sm font-medium mb-1">Số lượng phiếu nhập</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FileTextOutlined className="text-emerald-500" /> 12 phiếu</h3>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <p className="text-slate-500 text-sm font-medium mb-1">Nhà cung cấp đang giao hàng</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><TeamOutlined className="text-purple-500" /> 2 đối tác</h3>
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-sm rounded-xl">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input 
            prefix={<SearchOutlined className="text-slate-400" />} 
            placeholder="Mã phiếu nhập, nhà cung cấp..." 
            className="w-64 h-10 rounded-lg hover:border-blue-400 focus:border-blue-500"
          />
          <Select 
            defaultValue="all" 
            className="w-40 h-10"
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'pending', label: 'Chờ duyệt' },
              { value: 'processing', label: 'Đang giao' },
              { value: 'completed', label: 'Đã nhập kho' },
            ]}
          />
          <RangePicker className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-500" placeholder={['Từ ngày', 'Đến ngày']} />
        </div>

        <Table 
          columns={columns} 
          dataSource={mockImports} 
          rowKey="id"
          pagination={{ pageSize: 8 }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};
