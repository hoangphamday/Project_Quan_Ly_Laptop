import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Tag, Button, Input, Avatar, Space, Typography, Tooltip, Spin, Alert } from 'antd';
import { SearchOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons';
import { customerService } from '../../services/customerService';
import type { KhachHang } from '../../types';

const { Title, Text } = Typography;

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<KhachHang[]>([]);
  const [filtered, setFiltered] = useState<KhachHang[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customerService.getAll();
      setCustomers(data);
      setFiltered(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Không thể tải danh sách khách hàng.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  useEffect(() => {
    if (!searchText.trim()) { setFiltered(customers); return; }
    const kw = searchText.toLowerCase();
    setFiltered(
      customers.filter(
        (c) =>
          c.tenKH.toLowerCase().includes(kw) ||
          c.email?.toLowerCase().includes(kw) ||
          c.dienThoai?.includes(kw)
      )
    );
  }, [searchText, customers]);

  const columns = [
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_: any, record: KhachHang) => (
        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<UserOutlined />} />
          <div>
            <div className="font-semibold text-slate-800">{record.tenKH}</div>
            <div className="text-sm text-slate-500">{record.email || '—'}</div>
          </div>
        </div>
      ),
    },
    { title: 'Mã KH', dataIndex: 'maKH', key: 'maKH', render: (v: string) => <span className="text-xs font-mono text-slate-400">{v}</span> },
    { title: 'Số điện thoại', dataIndex: 'dienThoai', key: 'dienThoai', render: (v: string) => v || '—' },
    { title: 'Địa chỉ', dataIndex: 'diaChi', key: 'diaChi', render: (v: string) => <span className="text-sm text-slate-500">{v || '—'}</span> },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'ngayDangKy',
      key: 'ngayDangKy',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => <Tag color="success" className="rounded-md px-2 py-0.5">Hoạt động</Tag>,
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'right' as const,
      render: (_: any) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<UserOutlined className="text-blue-600" />} />
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
        <Tooltip title="Làm mới">
          <Button icon={<ReloadOutlined />} onClick={fetchCustomers} loading={loading} className="h-10 rounded-lg" />
        </Tooltip>
      </div>

      {error && <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} className="rounded-xl" />}

      <Spin spinning={loading}>
        <Card bordered={false} className="shadow-sm rounded-xl">
          <div className="flex gap-4 mb-6">
            <Input
              prefix={<SearchOutlined className="text-slate-400" />}
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              className="max-w-md h-10 rounded-lg focus:border-blue-500 hover:border-blue-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="maKH"
            pagination={{ pageSize: 10 }}
            className="custom-table"
          />
        </Card>
      </Spin>
    </div>
  );
};
