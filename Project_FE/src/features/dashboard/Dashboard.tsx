import React from 'react';
import { Card, Row, Col, Table, Tag, Button, Typography, Space } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  ShoppingOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  LaptopOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

const salesData = [
  { name: 'T2', uv: 4000 },
  { name: 'T3', uv: 3000 },
  { name: 'T4', uv: 2000 },
  { name: 'T5', uv: 2780 },
  { name: 'T6', uv: 1890 },
  { name: 'T7', uv: 2390 },
  { name: 'CN', uv: 3490 },
];

const recentOrders = [
  { key: '1', id: '#ORD-001', customer: 'Nguyễn Văn A', product: 'MacBook Pro M3 Max', date: '2023-11-20', status: 'Completed', amount: '120.000.000đ' },
  { key: '2', id: '#ORD-002', customer: 'Trần Thị B', product: 'ThinkPad X1 Carbon Gen 11', date: '2023-11-20', status: 'Processing', amount: '45.000.000đ' },
  { key: '3', id: '#ORD-003', customer: 'Lê Hoàng C', product: 'Dell XPS 15 9530', date: '2023-11-19', status: 'Pending', amount: '52.000.000đ' },
  { key: '4', id: '#ORD-004', customer: 'Phạm Văn D', product: 'ASUS ROG Zephyrus G14', date: '2023-11-19', status: 'Completed', amount: '48.500.000đ' },
  { key: '5', id: '#ORD-005', customer: 'Đỗ Thị E', product: 'LG Gram 16 2023', date: '2023-11-18', status: 'Cancelled', amount: '35.000.000đ' },
];

const topProducts = [
  { name: 'MacBook Pro M3 Max 16"', sales: 120, revenue: '14.4 Tỉ đ', stock: 45 },
  { name: 'Dell XPS 15 9530', sales: 98, revenue: '5.1 Tỉ đ', stock: 12 },
  { name: 'ThinkPad X1 Carbon Gen 11', sales: 85, revenue: '3.8 Tỉ đ', stock: 8 },
  { name: 'ASUS ROG Zephyrus G14', sales: 65, revenue: '3.1 Tỉ đ', stock: 24 },
];

export const Dashboard: React.FC = () => {
  const tableColumns = [
    { title: 'Mã ĐH', dataIndex: 'id', key: 'id', render: (text: string) => <span className="font-semibold text-blue-600">{text}</span> },
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
    { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = status === 'Completed' ? 'success' : status === 'Processing' ? 'processing' : status === 'Pending' ? 'warning' : 'error';
        return <Tag color={color} className="rounded-md px-2 py-0.5">{status}</Tag>;
      }
    },
    { title: 'Tổng tiền', dataIndex: 'amount', key: 'amount', align: 'right' as const, render: (text: string) => <span className="font-semibold">{text}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Tổng quan hệ thống</Title>
          <Text className="text-slate-500">Chào mừng trở lại, xem qua các chỉ số của cửa hàng hôm nay.</Text>
        </div>
        <Space>
          <Button type="primary" className="bg-blue-600 hover:bg-blue-700 shadow-md">Tải báo cáo</Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Tổng doanh thu</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">18.5 Tỉ đ</h3>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                  <ArrowUpOutlined /> 12.5% 
                  <span className="text-slate-400 font-normal ml-1">so với tháng trước</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarOutlined className="text-2xl text-blue-600" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Đơn hàng mới</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">245</h3>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                  <ArrowUpOutlined /> 4.2% 
                  <span className="text-slate-400 font-normal ml-1">so với tháng trước</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShoppingOutlined className="text-2xl text-emerald-600" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Khách hàng mới</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">1,245</h3>
                <span className="text-rose-500 text-sm font-medium flex items-center gap-1">
                  <ArrowDownOutlined /> 1.5% 
                  <span className="text-slate-400 font-normal ml-1">so với tháng trước</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <UsergroupAddOutlined className="text-2xl text-purple-600" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Laptop đang bán</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">4,521</h3>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                  <ArrowUpOutlined /> 8.1% 
                  <span className="text-slate-400 font-normal ml-1">so với tháng trước</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <LaptopOutlined className="text-2xl text-amber-600" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            bordered={false} 
            className="shadow-sm rounded-2xl h-full flex flex-col"
            title={<span className="font-semibold text-slate-800">Biểu đồ doanh thu (7 ngày)</span>}
            extra={<Button type="text" icon={<EllipsisOutlined />} />}
          >
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1677ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1677ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="uv" stroke="#1677ff" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            bordered={false} 
            className="shadow-sm rounded-2xl h-full"
            title={<span className="font-semibold text-slate-800">Sản phẩm bán chạy</span>}
            extra={<Button type="link" className="p-0 text-blue-600">Xem tất cả</Button>}
          >
            <div className="space-y-5">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center p-2 border border-slate-200">
                    <LaptopOutlined className="text-xl text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 truncate" title={product.name}>{product.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Kho: <span className={product.stock < 10 ? "text-rose-500 font-medium" : "text-slate-600"}>{product.stock}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-800">{product.revenue}</div>
                    <div className="text-xs text-emerald-500 font-medium mt-1">{product.sales} sales</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Card 
            bordered={false} 
            className="shadow-sm rounded-2xl"
            title={<span className="font-semibold text-slate-800">Đơn hàng gần đây</span>}
            extra={<Button type="link" className="p-0 text-blue-600">Xem tất cả</Button>}
          >
            <Table 
              columns={tableColumns} 
              dataSource={recentOrders} 
              pagination={false}
              className="custom-table"
              rowClassName="hover:bg-slate-50 transition-colors cursor-pointer"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
