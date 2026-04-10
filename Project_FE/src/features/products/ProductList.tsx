import React, { useState } from 'react';
import { Card, Button, Input, Select, Tag, Dropdown, Typography, Tooltip, Badge, Table, Space } from 'antd';
import type { MenuProps } from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  LaptopOutlined,
  AppstoreOutlined,
  BarsOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock data cho danh sách sản phẩm
const initialProducts = [
  {
    id: 'MAC-M3-16',
    name: 'MacBook Pro 16" M3 Max 2023',
    brand: 'Apple',
    price: '99.990.000₫',
    originalPrice: '102.990.000₫',
    specs: 'M3 Max / 36GB / 1TB SSD',
    stock: 12,
    status: 'In Stock',
    color: '#f5f5f7',
  },
  {
    id: 'XPS-15-9530',
    name: 'Dell XPS 15 9530',
    brand: 'Dell',
    price: '54.990.000₫',
    originalPrice: '',
    specs: 'i7-13700H / 16GB / 512GB / RTX 4050',
    stock: 5,
    status: 'Low Stock',
    color: '#e2e8f0',
  },
  {
    id: 'ROG-G14-24',
    name: 'ASUS ROG Zephyrus G14 2024',
    brand: 'ASUS',
    price: '48.990.000₫',
    originalPrice: '52.990.000₫',
    specs: 'Ryzen 9 8945HS / 32GB / 1TB / RTX 4060',
    stock: 24,
    status: 'In Stock',
    color: '#1e293b',
  },
  {
    id: 'TP-X1-G11',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    brand: 'Lenovo',
    price: '42.990.000₫',
    originalPrice: '',
    specs: 'i7-1355U / 16GB / 512GB SSD',
    stock: 0,
    status: 'Out of Stock',
    color: '#0f172a',
  },
  {
    id: 'LGN-5-PRO',
    name: 'Lenovo Legion 5 Pro',
    brand: 'Lenovo',
    price: '38.490.000₫',
    originalPrice: '40.990.000₫',
    specs: 'i7-13700HX / 16GB / 512GB / RTX 4060',
    stock: 18,
    status: 'In Stock',
    color: '#334155',
  },
  {
    id: 'HP-ENVY-14',
    name: 'HP Envy 14',
    brand: 'HP',
    price: '28.990.000₫',
    originalPrice: '',
    specs: 'i5-1335U / 16GB / 512GB',
    stock: 8,
    status: 'Low Stock',
    color: '#cbd5e1',
  }
];

export const ProductList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const getStatusTag = (status: string) => {
    switch(status) {
      case 'In Stock':
        return <Tag color="success" className="rounded-md border-transparent font-medium">Còn hàng</Tag>;
      case 'Low Stock':
        return <Tag color="warning" className="rounded-md border-transparent font-medium">Sắp hết</Tag>;
      case 'Out of Stock':
        return <Tag color="error" className="rounded-md border-transparent font-medium">Hết hàng</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const actionItems: MenuProps['items'] = [
    { key: 'edit', icon: <EditOutlined />, label: 'Chỉnh sửa' },
    { key: 'delete', icon: <DeleteOutlined className="text-red-500" />, label: <span className="text-red-500">Xóa sản phẩm</span> },
  ];

  const columns = [
    {
      title: 'Sản phẩm',
      key: 'product',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
            <LaptopOutlined className="text-xl text-slate-400" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 line-clamp-1" title={record.name}>{record.name}</div>
            <div className="text-xs text-blue-600 font-medium uppercase mt-0.5">{record.brand}</div>
          </div>
        </div>
      )
    },
    { title: 'Cấu hình', dataIndex: 'specs', key: 'specs', render: (text: string) => <span className="text-sm text-slate-500">{text}</span> },
    { 
      title: 'Giá bán', 
      key: 'price',
      render: (_: any, record: any) => (
        <div>
          <div className="font-bold text-slate-800">{record.price}</div>
          {record.originalPrice && <div className="text-xs text-slate-400 line-through mt-0.5">{record.originalPrice}</div>}
        </div>
      )
    },
    { 
      title: 'Kho', 
      dataIndex: 'stock', 
      key: 'stock',
      align: 'center' as const,
      render: (val: number) => <Badge count={val} showZero color={val > 10 ? '#10b981' : val > 0 ? '#f59e0b' : '#ef4444'} />
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      render: (status: string) => getStatusTag(status)
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: () => (
        <Space>
          <Tooltip title="Sửa">
            <Button type="text" icon={<EditOutlined className="text-blue-600" />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Danh mục Sản phẩm</Title>
          <Text className="text-slate-500">Quản lý và trưng bày các mẫu laptop hiện có</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700 shadow-md h-10 px-4 rounded-lg">
          Thêm sản phẩm
        </Button>
      </div>

      {/* Toolbar Area */}
      <Card bordered={false} className="shadow-sm rounded-xl" bodyStyle={{ padding: '16px 24px' }}>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-3 flex-wrap">
            <Input 
              prefix={<SearchOutlined className="text-slate-400" />} 
              placeholder="Tìm kiếm theo tên, mã sản phẩm..." 
              className="max-w-md h-10 rounded-lg hover:border-blue-400 focus:border-blue-500"
            />
            <Select 
              defaultValue="all_brands" 
              className="w-40 h-10"
              options={[
                { value: 'all_brands', label: 'Tất cả hãng' },
                { value: 'apple', label: 'Apple' },
                { value: 'dell', label: 'Dell' },
                { value: 'asus', label: 'ASUS' },
                { value: 'lenovo', label: 'Lenovo' },
                { value: 'hp', label: 'HP' },
              ]}
            />
            <Button icon={<FilterOutlined />} className="h-10 rounded-lg text-slate-600">Bộ lọc khác</Button>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg self-start lg:self-auto">
            <Tooltip title="Chế độ lưới">
              <Button 
                type={viewMode === 'grid' ? 'primary' : 'text'} 
                icon={<AppstoreOutlined />} 
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 flex items-center justify-center p-0 ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              />
            </Tooltip>
            <Tooltip title="Chế độ danh sách">
              <Button 
                type={viewMode === 'list' ? 'primary' : 'text'} 
                icon={<BarsOutlined />} 
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 flex items-center justify-center p-0 ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              />
            </Tooltip>
          </div>
        </div>
      </Card>

      {/* Product View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {initialProducts.map((product) => (
          <Card 
            key={product.id}
            bordered={false} 
            className="shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100"
            bodyStyle={{ padding: 0 }}
          >
            {/* Image Section Mockup */}
            <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center p-6 group-hover:bg-slate-200 transition-colors">
              <div className="absolute top-3 right-3 z-10">
                <Dropdown menu={{ items: actionItems }} trigger={['click']} placement="bottomRight">
                  <Button type="text" icon={<MoreOutlined className="text-xl rotate-90 text-slate-500 hover:text-slate-800" />} className="w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full backdrop-blur-sm shadow-sm" onClick={(e) => e.stopPropagation()} />
                </Dropdown>
              </div>
              <div className="absolute top-3 left-3 z-10">
                {getStatusTag(product.status)}
              </div>
              
              <LaptopOutlined style={{ fontSize: '80px', color: product.color }} className="opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-transform duration-500" />
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">{product.brand}</div>
              <h3 className="text-base font-bold text-slate-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
              <Text className="text-slate-500 text-sm mb-4 block line-clamp-1" title={product.specs}>{product.specs}</Text>
              
              <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="text-lg font-bold text-slate-800">{product.price}</div>
                  {product.originalPrice && (
                    <div className="text-xs text-slate-400 line-through mt-0.5">{product.originalPrice}</div>
                  )}
                </div>
                <div className="text-right">
                  <Text className="text-slate-500 text-xs block mb-1">Kho hàng</Text>
                  <Badge count={product.stock} showZero color={product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f59e0b' : '#ef4444'} />
                </div>
              </div>
            </div>
          </Card>
        ))}
        </div>
      ) : (
        <Card bordered={false} className="shadow-sm rounded-xl">
          <Table 
            columns={columns} 
            dataSource={initialProducts} 
            rowKey="id"
            pagination={{ pageSize: 12 }}
            className="custom-table"
          />
        </Card>
      )}
    </div>
  );
};
