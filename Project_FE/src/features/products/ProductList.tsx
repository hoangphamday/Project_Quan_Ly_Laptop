import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, Button, Input, Tag, Typography, Tooltip, Badge, Table, Space,
  Modal, Form, InputNumber, Spin, Alert, Popconfirm, message, Select
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  LaptopOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { laptopService } from '../../services/laptopService';
import type { Laptop } from '../../types';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Danh sách thương hiệu phổ biến
const BRANDS = ['Apple', 'Dell', 'ASUS', 'Lenovo', 'HP', 'MSI', 'Acer', 'LG', 'Samsung', 'Microsoft'];

const getStockStatus = (soLuong: number) => {
  if (soLuong === 0) return { label: 'Hết hàng', color: 'error' };
  if (soLuong <= 5) return { label: 'Sắp hết', color: 'warning' };
  return { label: 'Còn hàng', color: 'success' };
};

const formatCurrency = (gia: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(gia);

export const ProductList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [products, setProducts] = useState<Laptop[]>([]);
  const [filtered, setFiltered] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & filter state
  const [searchText, setSearchText] = useState('');
  const [brandFilter, setBrandFilter] = useState('all_brands');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingProduct, setEditingProduct] = useState<Laptop | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // ---- Fetch dữ liệu ----
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await laptopService.getAll();
      setProducts(data);
      setFiltered(data);
      localStorage.setItem('all_products', JSON.stringify(data));
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Không thể tải danh sách laptop. Kiểm tra BE đã chạy chưa.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ---- Search & Filter ----
  useEffect(() => {
    let result = products;
    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      result = result.filter(
        (p) =>
          p.tenLaptop.toLowerCase().includes(keyword) ||
          p.maLaptop.toLowerCase().includes(keyword) ||
          p.maHang?.toLowerCase().includes(keyword)
      );
    }
    if (brandFilter !== 'all_brands') {
      result = result.filter((p) => p.maHang?.toLowerCase() === brandFilter.toLowerCase());
    }
    setFiltered(result);
  }, [searchText, brandFilter, products]);

  // ---- Modal handlers ----
  const openCreateModal = () => {
    setModalMode('create');
    setEditingProduct(null);
    form.resetFields();
    form.setFieldsValue({ ngayThem: new Date().toISOString().split('T')[0] });
    setModalOpen(true);
  };

  const openEditModal = (product: Laptop) => {
    setModalMode('edit');
    setEditingProduct(product);
    form.setFieldsValue(product);
    setModalOpen(true);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      const laptop: Laptop = {
        ...values,
        ngayThem: values.ngayThem || new Date().toISOString(),
      };

      if (modalMode === 'create') {
        await laptopService.create(laptop);
        message.success('Thêm laptop thành công!');
      } else {
        await laptopService.update({ ...laptop, maLaptop: editingProduct!.maLaptop });
        message.success('Cập nhật laptop thành công!');
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      if (err?.errorFields) return; // Validation error
      const msg = err?.response?.data?.message || 'Thao tác thất bại!';
      message.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await laptopService.delete(id);
      message.success('Xóa laptop thành công!');
      fetchProducts();
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Xóa thất bại!');
    }
  };

  // ---- Hiển thị ảnh sản phẩm (dùng lại ở cả bảng và lưới) ----
  const renderProductImage = (duongDanAnh?: string, size = 48) => (
    duongDanAnh ? (
      <img
        src={duongDanAnh}
        alt="Ảnh sản phẩm"
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: 8 }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    ) : (
      <LaptopOutlined style={{ fontSize: size * 0.5, color: '#94a3b8' }} />
    )
  );

  // ---- Table columns ----
  const columns = [
    {
      title: 'Mã Laptop',
      dataIndex: 'maLaptop',
      key: 'maLaptop',
      render: (val: string) => (
        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{val}</span>
      ),
    },
    {
      title: 'Sản phẩm',
      key: 'product',
      render: (_: any, record: Laptop) => (
        <div className="flex items-center gap-3">
          {/* Ảnh sản phẩm: hiện ảnh thật nếu có, icon placeholder nếu không */}
          <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden flex-shrink-0">
            {renderProductImage(record.duongDanAnh, 48)}
          </div>
          <div>
            <div className="font-semibold text-slate-800 line-clamp-1" title={record.tenLaptop}>
              {record.tenLaptop}
            </div>
            <div className="text-xs text-blue-600 font-medium uppercase mt-0.5">{record.maHang}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Cấu hình',
      key: 'specs',
      render: (_: any, r: Laptop) => (
        <span className="text-sm text-slate-500">
          {[r.cpu, r.ram, r.ssd, r.gpu].filter(Boolean).join(' / ')}
        </span>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'gia',
      key: 'gia',
      render: (gia: number) => <span className="font-bold text-slate-800">{formatCurrency(gia)}</span>,
    },
    {
      title: 'Kho',
      dataIndex: 'soLuong',
      key: 'soLuong',
      align: 'center' as const,
      render: (val: number) => {
        const { color } = getStockStatus(val);
        return <Badge count={val} showZero color={color === 'success' ? '#10b981' : color === 'warning' ? '#f59e0b' : '#ef4444'} />;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'soLuong',
      key: 'status',
      align: 'center' as const,
      render: (val: number) => {
        const { label, color } = getStockStatus(val);
        return <Tag color={color} className="rounded-md border-transparent font-medium">{label}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: Laptop) => (
        <Space>
          <Tooltip title="Sửa">
            <Button type="text" icon={<EditOutlined className="text-blue-600" />} onClick={() => openEditModal(record)} />
          </Tooltip>
          <Popconfirm
            title="Xóa laptop này?"
            description="Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(record.maLaptop)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Danh mục Sản phẩm</Title>
          <Text className="text-slate-500">Quản lý và trưng bày các mẫu laptop hiện có</Text>
        </div>
        <Space>
          <Tooltip title="Làm mới">
            <Button icon={<ReloadOutlined />} onClick={fetchProducts} loading={loading} className="h-10 rounded-lg" />
          </Tooltip>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 shadow-md h-10 px-4 rounded-lg"
          >
            Thêm sản phẩm
          </Button>
        </Space>
      </div>

      {/* Error banner */}
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          className="rounded-xl"
        />
      )}

      {/* Toolbar */}
      <Card bordered={false} className="shadow-sm rounded-xl" styles={{ body: { padding: '16px 24px' } }}>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-3 flex-wrap">
            <Input
              prefix={<SearchOutlined className="text-slate-400" />}
              placeholder="Tìm kiếm theo tên, mã sản phẩm..."
              className="max-w-md h-10 rounded-lg hover:border-blue-400 focus:border-blue-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            {/* Bộ lọc theo hãng */}
            <Select
              value={brandFilter}
              className="w-40 h-10"
              onChange={setBrandFilter}
              options={[
                { value: 'all_brands', label: 'Tất cả hãng' },
                ...BRANDS.map((b) => ({ value: b.toLowerCase(), label: b })),
              ]}
            />
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
      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => {
              const stock = getStockStatus(product.soLuong);
              return (
                <Card
                  key={product.maLaptop}
                  bordered={false}
                  className="shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100"
                  styles={{ body: { padding: 0 } }}
                >
                  <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center p-6 group-hover:bg-slate-200 transition-colors overflow-hidden">
                    <div className="absolute top-3 right-3 z-10">
                      <Space>
                        <Button
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => openEditModal(product)}
                          className="bg-white/80 rounded-full shadow-sm"
                        />
                        <Popconfirm
                          title="Xóa laptop này?"
                          onConfirm={() => handleDelete(product.maLaptop)}
                          okText="Xóa"
                          cancelText="Hủy"
                          okButtonProps={{ danger: true }}
                        >
                          <Button size="small" danger icon={<DeleteOutlined />} className="bg-white/80 rounded-full shadow-sm" />
                        </Popconfirm>
                      </Space>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Tag color={stock.color} className="rounded-md border-transparent font-medium">{stock.label}</Tag>
                    </div>
                    {/* Hiện ảnh thật nếu có đường dẫn, ngược lại dùng icon */}
                    {product.duongDanAnh ? (
                      <img
                        src={product.duongDanAnh}
                        alt={product.tenLaptop}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', inset: 0, padding: 16 }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <LaptopOutlined style={{ fontSize: '80px', color: '#94a3b8' }} className="opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">{product.maHang}</div>
                    <h3 className="text-base font-bold text-slate-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.tenLaptop}</h3>
                    <Text className="text-slate-500 text-sm mb-4 block line-clamp-1">
                      {[product.cpu, product.ram, product.ssd].filter(Boolean).join(' / ')}
                    </Text>
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="text-lg font-bold text-slate-800">{formatCurrency(product.gia)}</div>
                      <div className="text-right">
                        <Text className="text-slate-500 text-xs block mb-1">Kho hàng</Text>
                        <Badge count={product.soLuong} showZero color={product.soLuong > 10 ? '#10b981' : product.soLuong > 0 ? '#f59e0b' : '#ef4444'} />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
            {!loading && filtered.length === 0 && (
              <div className="col-span-3 text-center py-12 text-slate-400">Không có sản phẩm nào.</div>
            )}
          </div>
        ) : (
          <Card bordered={false} className="shadow-sm rounded-xl">
            <Table
              columns={columns}
              dataSource={filtered}
              rowKey="maLaptop"
              pagination={{ pageSize: 12 }}
              className="custom-table"
            />
          </Card>
        )}
      </Spin>

      {/* Create / Edit Modal */}
      <Modal
        title={modalMode === 'create' ? '➕ Thêm Laptop mới' : '✏️ Cập nhật Laptop'}
        open={modalOpen}
        onOk={handleModalSubmit}
        onCancel={() => { setModalOpen(false); form.resetFields(); }}
        confirmLoading={submitting}
        okText={modalMode === 'create' ? 'Thêm' : 'Cập nhật'}
        cancelText="Hủy"
        width={700}
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', paddingRight: 8 } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item name="maLaptop" label="Mã Laptop" rules={[{ required: true, message: 'Nhập mã laptop!' }]}>
              <Input placeholder="VD: LP001" disabled={modalMode === 'edit'} />
            </Form.Item>
            <Form.Item name="maHang" label="Hãng" rules={[{ required: true, message: 'Chọn hãng!' }]}>
              <Select placeholder="Chọn hãng" showSearch options={BRANDS.map((b) => ({ value: b, label: b }))} />
            </Form.Item>
          </div>

          <Form.Item name="tenLaptop" label="Tên Laptop" rules={[{ required: true, message: 'Nhập tên laptop!' }]}>
            <Input placeholder="VD: MacBook Pro 16 M3 Max" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item name="cpu" label="CPU" rules={[{ required: true, message: 'Nhập CPU!' }]}>
              <Input placeholder="VD: Apple M3 Max" />
            </Form.Item>
            <Form.Item name="ram" label="RAM" rules={[{ required: true, message: 'Nhập RAM!' }]}>
              <Input placeholder="VD: 36GB" />
            </Form.Item>
            <Form.Item name="ssd" label="SSD" rules={[{ required: true, message: 'Nhập SSD!' }]}>
              <Input placeholder="VD: 1TB" />
            </Form.Item>
            <Form.Item name="gpu" label="GPU">
              <Input placeholder="VD: RTX 4070" />
            </Form.Item>
            <Form.Item name="manHinh" label="Màn hình">
              <Input placeholder="VD: 16 inch OLED" />
            </Form.Item>
            <Form.Item name="baoHanh" label="Bảo hành (tháng)" rules={[{ required: true }]}>
              <InputNumber min={0} max={60} className="w-full" placeholder="VD: 12" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item name="gia" label="Giá bán (VNĐ)" rules={[{ required: true, message: 'Nhập giá!' }]}>
              <InputNumber
                min={0}
                className="w-full"
                formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder="VD: 99990000"
              />
            </Form.Item>
            <Form.Item name="soLuong" label="Số lượng tồn kho" rules={[{ required: true, message: 'Nhập số lượng!' }]}>
              <InputNumber min={0} className="w-full" placeholder="VD: 20" />
            </Form.Item>
          </div>

          <Form.Item name="moTa" label="Mô tả">
            <TextArea rows={3} placeholder="Nhập mô tả sản phẩm..." />
          </Form.Item>

          {/* Đường dẫn ảnh – lưu vào bảng HinhAnhLaptop */}
          <Form.Item
            name="duongDanAnh"
            label="Đường dẫn ảnh"
            extra="Nhập URL hoặc đường dẫn ảnh để hiển thị ngoài giao diện. VD: /product_1.png hoặc https://..."
          >
            <Input placeholder="VD: /product_1.png" />
          </Form.Item>

          {/* Xem trước ảnh ngay khi nhập URL */}
          <Form.Item noStyle shouldUpdate={(prev, curr) => prev.duongDanAnh !== curr.duongDanAnh}>
            {({ getFieldValue }) => {
              const url = getFieldValue('duongDanAnh');
              return url ? (
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={url}
                    alt="Xem trước"
                    style={{ width: 80, height: 80, objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = ''; }}
                  />
                  <span className="text-sm text-slate-500">Xem trước ảnh</span>
                </div>
              ) : null;
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
