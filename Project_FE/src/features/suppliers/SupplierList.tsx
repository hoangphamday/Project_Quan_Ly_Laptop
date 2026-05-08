import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, Table, Button, Input, Space, Typography, Tooltip,
  Avatar, Modal, Form, Alert, Popconfirm, message, Spin
} from 'antd';
import {
  SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined,
  BankOutlined, MailOutlined, PhoneOutlined, ReloadOutlined, EnvironmentOutlined
} from '@ant-design/icons';
import { supplierService } from '../../services/supplierService';
import type { NhaCungCap } from '../../types';

const { Title, Text } = Typography;

export const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<NhaCungCap[]>([]);
  const [filtered, setFiltered] = useState<NhaCungCap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingSupplier, setEditingSupplier] = useState<NhaCungCap | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getAll();
      setSuppliers(data);
      setFiltered(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Không thể tải danh sách nhà cung cấp.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

  // Search filter
  useEffect(() => {
    if (!searchText.trim()) { setFiltered(suppliers); return; }
    const kw = searchText.toLowerCase();
    setFiltered(
      suppliers.filter(
        (s) =>
          s.tenNCC.toLowerCase().includes(kw) ||
          s.email?.toLowerCase().includes(kw) ||
          s.dienThoai?.includes(kw)
      )
    );
  }, [searchText, suppliers]);

  const openCreateModal = () => {
    setModalMode('create');
    setEditingSupplier(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (item: NhaCungCap) => {
    setModalMode('edit');
    setEditingSupplier(item);
    form.setFieldsValue(item);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      if (modalMode === 'create') {
        await supplierService.create(values as NhaCungCap);
        message.success('Thêm nhà cung cấp thành công!');
      } else {
        await supplierService.update({ ...values, maNCC: editingSupplier!.maNCC } as NhaCungCap);
        message.success('Cập nhật nhà cung cấp thành công!');
      }
      setModalOpen(false);
      fetchSuppliers();
    } catch (err: any) {
      if (err?.errorFields) return;
      message.error(err?.response?.data?.message || 'Thao tác thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supplierService.delete(id);
      message.success('Xóa nhà cung cấp thành công!');
      fetchSuppliers();
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Xóa thất bại!');
    }
  };

  const columns = [
    {
      title: 'Nhà cung cấp',
      key: 'supplier',
      render: (_: any, record: NhaCungCap) => (
        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<BankOutlined />} className="bg-blue-100 text-blue-600" />
          <div>
            <div className="font-semibold text-slate-800">{record.tenNCC}</div>
            <div className="text-xs text-slate-400">{record.maNCC}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Thông tin liên lạc',
      key: 'contactInfo',
      render: (_: any, record: NhaCungCap) => (
        <div className="text-sm text-slate-500 space-y-1">
          <div className="flex items-center gap-2"><PhoneOutlined className="text-slate-400" /> {record.dienThoai || '—'}</div>
          <div className="flex items-center gap-2"><MailOutlined className="text-slate-400" /> {record.email || '—'}</div>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      key: 'diaChi',
      render: (_: any, record: NhaCungCap) => (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <EnvironmentOutlined className="text-slate-400" /> {record.diaChi || '—'}
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: NhaCungCap) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined className="text-blue-600" />} onClick={() => openEditModal(record)} />
          </Tooltip>
          <Popconfirm
            title="Xóa nhà cung cấp này?"
            description="Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(record.maNCC)}
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
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Danh sách Nhà cung cấp</Title>
          <Text className="text-slate-500">Quản lý đối tác phân phối sản phẩm</Text>
        </div>
        <Space>
          <Tooltip title="Làm mới">
            <Button icon={<ReloadOutlined />} onClick={fetchSuppliers} loading={loading} className="h-10 rounded-lg" />
          </Tooltip>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal} className="bg-blue-600 rounded-lg h-10">
            Thêm nhà cung cấp
          </Button>
        </Space>
      </div>

      {error && <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} className="rounded-xl" />}

      <Spin spinning={loading}>
        <Card bordered={false} className="shadow-sm rounded-xl">
          <div className="flex gap-4 mb-6">
            <Input
              prefix={<SearchOutlined className="text-slate-400" />}
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              className="max-w-md h-10 rounded-lg hover:border-blue-400 focus:border-blue-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="maNCC"
            pagination={{ pageSize: 10 }}
            className="custom-table"
          />
        </Card>
      </Spin>

      {/* Modal */}
      <Modal
        title={modalMode === 'create' ? '➕ Thêm Nhà cung cấp' : '✏️ Cập nhật Nhà cung cấp'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => { setModalOpen(false); form.resetFields(); }}
        confirmLoading={submitting}
        okText={modalMode === 'create' ? 'Thêm' : 'Cập nhật'}
        cancelText="Hủy"
        width={560}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item name="maNCC" label="Mã NCC" rules={[{ required: true, message: 'Nhập mã NCC!' }]}>
              <Input placeholder="VD: NCC001" disabled={modalMode === 'edit'} />
            </Form.Item>
            <Form.Item name="tenNCC" label="Tên nhà cung cấp" rules={[{ required: true, message: 'Nhập tên!' }]}>
              <Input placeholder="VD: Apple Vietnam" />
            </Form.Item>
            <Form.Item name="dienThoai" label="Điện thoại">
              <Input placeholder="VD: 0901 234 567" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}>
              <Input placeholder="VD: contact@apple.vn" />
            </Form.Item>
          </div>
          <Form.Item name="diaChi" label="Địa chỉ">
            <Input placeholder="VD: 123 Nguyễn Huệ, Q1, TP.HCM" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
