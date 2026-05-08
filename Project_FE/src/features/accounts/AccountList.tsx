import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, Table, Tag, Button, Input, Space, Typography, Tooltip,
  Spin, Alert, Modal, Form, Select, Switch, Popconfirm, message,
} from 'antd';
import {
  SearchOutlined, ReloadOutlined, EditOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { accountService } from '../../services/accountService';
import type { TaiKhoan } from '../../types';

const { Title, Text } = Typography;

// Danh sách vai trò hợp lệ
const ROLES = ['Admin', 'NhanVien', 'KhachHang'];

export const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<TaiKhoan[]>([]);
  const [filtered, setFiltered] = useState<TaiKhoan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // Modal sửa
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<TaiKhoan | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // ---- Fetch danh sách tài khoản ----
  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountService.getAll();
      setAccounts(data);
      setFiltered(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Không thể tải danh sách tài khoản.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  // ---- Tìm kiếm ----
  useEffect(() => {
    if (!searchText.trim()) { setFiltered(accounts); return; }
    const kw = searchText.toLowerCase();
    setFiltered(
      accounts.filter(
        (a) =>
          a.tenDangNhap?.toLowerCase().includes(kw) ||
          a.maTK?.toLowerCase().includes(kw) ||
          a.role?.toLowerCase().includes(kw)
      )
    );
  }, [searchText, accounts]);

  // ---- Mở modal sửa ----
  const openEditModal = (account: TaiKhoan) => {
    setEditingAccount(account);
    form.setFieldsValue({
      role: account.role,
      trangThai: account.trangThai,
    });
    setModalOpen(true);
  };

  // ---- Xử lý lưu sửa ----
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      await accountService.update({
        ...editingAccount!,
        role: values.role,
        trangThai: values.trangThai,
      });
      message.success('Cập nhật tài khoản thành công!');
      setModalOpen(false);
      fetchAccounts();
    } catch (err: any) {
      if (err?.errorFields) return;
      message.error(err?.response?.data?.message || 'Cập nhật thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Xóa tài khoản ----
  const handleDelete = async (maTK: string) => {
    try {
      await accountService.delete(maTK);
      message.success('Xóa tài khoản thành công!');
      fetchAccounts();
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Xóa thất bại!');
    }
  };

  // ---- Cột bảng ----
  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'tenDangNhap',
      key: 'tenDangNhap',
      render: (text: string) => <span className="font-semibold text-slate-800">{text}</span>,
    },
    {
      title: 'Mã TK',
      dataIndex: 'maTK',
      key: 'maTK',
      render: (v: string) => <span className="text-xs font-mono text-slate-400">{v}</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const colors: Record<string, string> = {
          Admin: 'blue',
          NhanVien: 'purple',
          KhachHang: 'green',
        };
        return <Tag color={colors[role] || 'default'} className="rounded-md px-2 py-0.5">{role}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (v: boolean) =>
        v
          ? <Tag color="success" className="rounded-md px-2 py-0.5">Hoạt động</Tag>
          : <Tag color="error" className="rounded-md px-2 py-0.5">Khóa</Tag>,
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: TaiKhoan) => (
        <Space>
          {/* Nút Sửa – mở modal chỉnh vai trò và trạng thái */}
          <Tooltip title="Sửa">
            <Button
              type="text"
              icon={<EditOutlined className="text-blue-600" />}
              onClick={() => openEditModal(record)}
            />
          </Tooltip>

          {/* Nút Xóa – có xác nhận trước khi xóa */}
          <Popconfirm
            title="Xóa tài khoản này?"
            description={`Tài khoản "${record.tenDangNhap}" sẽ bị xóa vĩnh viễn.`}
            onConfirm={() => handleDelete(record.maTK!)}
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
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Danh sách Tài khoản</Title>
          <Text className="text-slate-500">Quản lý tài khoản đăng nhập của Khách hàng, Nhân viên và Admin</Text>
        </div>
        <Tooltip title="Làm mới">
          <Button icon={<ReloadOutlined />} onClick={fetchAccounts} loading={loading} className="h-10 rounded-lg" />
        </Tooltip>
      </div>

      {error && <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} className="rounded-xl" />}

      <Spin spinning={loading}>
        <Card bordered={false} className="shadow-sm rounded-xl">
          <div className="flex gap-4 mb-6">
            <Input
              prefix={<SearchOutlined className="text-slate-400" />}
              placeholder="Tìm kiếm theo Tên đăng nhập, Loại tài khoản..."
              className="max-w-md h-10 rounded-lg focus:border-blue-500 hover:border-blue-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="maTK"
            pagination={{ pageSize: 10 }}
            className="custom-table"
          />
        </Card>
      </Spin>

      {/* Modal Sửa tài khoản */}
      <Modal
        title="✏️ Chỉnh sửa tài khoản"
        open={modalOpen}
        onOk={handleUpdate}
        onCancel={() => { setModalOpen(false); form.resetFields(); }}
        confirmLoading={submitting}
        okText="Lưu"
        cancelText="Hủy"
        width={440}
      >
        {/* Hiển thị tên tài khoản đang sửa (chỉ đọc) */}
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <Text className="text-slate-500 text-sm">Tài khoản:</Text>
          <div className="font-semibold text-slate-800 mt-0.5">{editingAccount?.tenDangNhap}</div>
          <div className="text-xs font-mono text-slate-400">{editingAccount?.maTK}</div>
        </div>

        <Form form={form} layout="vertical">
          {/* Vai trò */}
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Chọn vai trò!' }]}
          >
            <Select
              options={ROLES.map((r) => ({ value: r, label: r }))}
              placeholder="Chọn vai trò"
            />
          </Form.Item>

          {/* Trạng thái hoạt động */}
          <Form.Item
            name="trangThai"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Khóa" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
