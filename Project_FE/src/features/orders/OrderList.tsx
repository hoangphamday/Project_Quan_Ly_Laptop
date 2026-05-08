import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, Input, Select, DatePicker, Space, Typography, Tooltip, Spin, Alert, message } from 'antd';
import { SearchOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { orderService } from '../../services/orderService';
import type { DonHang } from '../../types';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;



const formatCurrency = (val: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

export const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<DonHang[]>([]);
  const [filtered, setFiltered] = useState<DonHang[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getAll();
      setOrders(data);
      setFiltered(data);
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setError('Không có quyền truy cập. Bạn cần đăng nhập bằng tài khoản Quản trị/Nhân viên.');
      } else {
        setError('Không thể tải dữ liệu đơn hàng. Vui lòng kiểm tra lại dịch vụ Backend.');
      }
      setOrders([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // Client-side filtering
  useEffect(() => {
    let result = orders;
    if (searchText.trim()) {
      const kw = searchText.toLowerCase();
      result = result.filter(
        (o) => o.maDonHang.toLowerCase().includes(kw) || o.maKH.toLowerCase().includes(kw)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.trangThai?.toLowerCase() === statusFilter);
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      const from = dateRange[0].startOf('day');
      const to = dateRange[1].endOf('day');
      result = result.filter((o) => {
        const d = new Date(o.ngayDat);
        return d >= from.toDate() && d <= to.toDate();
      });
    }
    setFiltered(result);
  }, [searchText, statusFilter, dateRange, orders]);

  const handleStatusChange = async (maDonHang: string, newStatus: string) => {
    try {
      setLoading(true);
      const success = await orderService.updateTrangThai(maDonHang, newStatus);
      if (success) {
        message.success('Cập nhật trạng thái thành công');
        fetchOrders();
      } else {
        message.error('Cập nhật trạng thái thất bại');
        setLoading(false);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái');
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Mã ĐH',
      dataIndex: 'maDonHang',
      key: 'maDonHang',
      render: (text: string) => <span className="font-semibold text-blue-600">{text}</span>,
    },
    {
      title: 'Mã Khách hàng',
      dataIndex: 'maKH',
      key: 'maKH',
      render: (v: string) => <span className="text-xs font-mono text-slate-600">{v}</span>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'ngayDat',
      key: 'ngayDat',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Thanh toán',
      dataIndex: 'phuongThucThanhToan',
      key: 'phuongThucThanhToan',
      render: (v: string) => <span className="text-slate-500 text-sm">{v || '—'}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'tongTien',
      key: 'tongTien',
      align: 'right' as const,
      render: (v: number) => <span className="font-bold text-slate-800">{formatCurrency(v)}</span>,
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'diaChiGiaoHang',
      key: 'diaChiGiaoHang',
      render: (v: string) => <span className="text-sm text-slate-500">{v || '—'}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 140,
      render: (status: string, record: DonHang) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record.maDonHang, val)}
          className="w-full"
          options={[
            { value: 'Cho Xu Ly', label: 'Chờ xử lý' },
            { value: 'Dang Giao', label: 'Đang giao' },
            { value: 'Hoan Thanh', label: 'Hoàn thành' },
            { value: 'Da Huy', label: 'Đã hủy' },
          ]}
        />
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
        <Space>
          <Tooltip title="Làm mới">
            <Button icon={<ReloadOutlined />} onClick={fetchOrders} loading={loading} className="h-10 rounded-lg" />
          </Tooltip>
          <Button icon={<DownloadOutlined />} className="rounded-lg h-10">Xuất báo cáo</Button>
        </Space>
      </div>

      {error && (
        <Alert
          message="Thông báo"
          description={error}
          type="warning"
          showIcon
          closable
          onClose={() => setError(null)}
          className="rounded-xl"
        />
      )}

      <Spin spinning={loading}>
        <Card bordered={false} className="shadow-sm rounded-xl">
          <div className="flex flex-wrap gap-4 mb-6">
            <Input
              prefix={<SearchOutlined className="text-slate-400" />}
              placeholder="Mã đơn hàng, mã khách hàng..."
              className="w-64 h-10 rounded-lg focus:border-blue-500 hover:border-blue-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select
              value={statusFilter}
              className="w-40 h-10"
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'cho xu ly', label: 'Chờ xử lý' },
                { value: 'dang giao', label: 'Đang giao' },
                { value: 'hoan thanh', label: 'Hoàn thành' },
                { value: 'da huy', label: 'Đã hủy' },
              ]}
            />
            <RangePicker
              className="h-10 rounded-lg hover:border-blue-400 focus:border-blue-500"
              placeholder={['Từ ngày', 'Đến ngày']}
              onChange={(dates) => setDateRange(dates as [Dayjs | null, Dayjs | null] | null)}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="maDonHang"
            pagination={{ pageSize: 8 }}
            className="custom-table"
            locale={{ emptyText: orders.length === 0 ? 'Chưa có dữ liệu đơn hàng từ API' : 'Không có kết quả phù hợp' }}
          />
        </Card>
      </Spin>
    </div>
  );
};
