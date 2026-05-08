import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Tag, Button, Typography, Spin, DatePicker, Divider, Empty } from 'antd';
import {
  ArrowUpOutlined,
  ShoppingOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  LaptopOutlined,
  ReloadOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FileExcelOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts';
import dayjs, { type Dayjs } from 'dayjs';
import { laptopService } from '../../services/laptopService';
import { customerService } from '../../services/customerService';
import { thongKeService } from '../../services/orderService';
import { orderService } from '../../services/orderService';
import type { ThongKeDoanhThu, DonHang } from '../../types';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const fmt = (val: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

const fmtCompact = (val: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', notation: 'compact', compactDisplay: 'short' }).format(val);

type DayRow = { ngay: string; doanhThu: number; soDon: number };

function buildMockDayData(orders: DonHang[]): DayRow[] {
  const map: Record<string, DayRow> = {};
  orders.forEach((o) => {
    if (!o.ngayDat) return;
    const d = new Date(o.ngayDat).toLocaleDateString('vi-VN');
    if (!map[d]) map[d] = { ngay: d, doanhThu: 0, soDon: 0 };
    map[d].doanhThu += o.tongTien || 0;
    map[d].soDon += 1;
  });
  return Object.values(map).sort((a, b) => a.ngay.localeCompare(b.ngay));
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [revenueLoading, setRevenueLoading] = useState(false);

  // Overview stats
  const [totalLaptops, setTotalLaptops] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [orders, setOrders] = useState<DonHang[]>([]);

  // Revenue section
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>([
    dayjs().subtract(29, 'day'), dayjs(),
  ]);
  const [thongKe, setThongKe] = useState<ThongKeDoanhThu[]>([]);
  const [dayData, setDayData] = useState<DayRow[]>([]);

  // Derived stats
  const tongDoanhThu = dayData.reduce((s, r) => s + r.doanhThu, 0);
  const tongDon = dayData.reduce((s, r) => s + r.soDon, 0);
  const soNgay = dateRange ? dateRange[1].diff(dateRange[0], 'day') + 1 : 1;
  const trungBinhNgay = soNgay > 0 ? tongDoanhThu / soNgay : 0;

  // Chart data from thongKe or dayData
  const chartData =
    thongKe.length > 0
      ? thongKe.map((t) => ({ name: `T${t.thang}/${t.nam}`, doanhThu: t.tongDoanhThu || 0 }))
      : dayData.map((d) => ({ name: d.ngay, doanhThu: d.doanhThu }));

  const fallbackChart = [
    { name: 'T2', doanhThu: 120000000 },
    { name: 'T3', doanhThu: 95000000 },
    { name: 'T4', doanhThu: 180000000 },
    { name: 'T5', doanhThu: 210000000 },
    { name: 'T6', doanhThu: 160000000 },
    { name: 'T7', doanhThu: 240000000 },
    { name: 'CN', doanhThu: 190000000 },
  ];

  const displayChart = chartData.length > 0 ? chartData : fallbackChart;

  // ── Fetch overview ──────────────────────────────────────────────
  const fetchOverview = useCallback(async () => {
    setLoading(true);
    try {
      const [laptops, customers, allOrders] = await Promise.allSettled([
        laptopService.getAll(),
        customerService.getAll(),
        orderService.getAll(),
      ]);
      if (laptops.status === 'fulfilled') setTotalLaptops(laptops.value.length);
      if (customers.status === 'fulfilled') setTotalCustomers(customers.value.length);
      if (allOrders.status === 'fulfilled') {
        setOrders(allOrders.value);
        setDayData(buildMockDayData(allOrders.value));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch revenue by date range ─────────────────────────────────
  const fetchRevenue = useCallback(async (range: [Dayjs, Dayjs]) => {
    setRevenueLoading(true);
    try {
      const tuNgay = range[0].format('YYYY-MM-DD');
      const denNgay = range[1].format('YYYY-MM-DD');
      const data = await thongKeService.getDoanhThu(tuNgay, denNgay).catch(() => [] as ThongKeDoanhThu[]);
      setThongKe(data || []);

      // Lọc đơn hàng theo khoảng ngày để tạo bảng chi tiết
      const filtered = orders.filter((o) => {
        if (!o.ngayDat) return false;
        const d = dayjs(o.ngayDat);
        return d.isAfter(range[0].subtract(1, 'day')) && d.isBefore(range[1].add(1, 'day'));
      });
      setDayData(buildMockDayData(filtered));
    } catch (e) {
      console.error(e);
    } finally {
      setRevenueLoading(false);
    }
  }, [orders]);

  useEffect(() => { fetchOverview(); }, [fetchOverview]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (orders.length > 0 && dateRange) fetchRevenue(dateRange); }, [orders]);

  const handleSearch = () => { if (dateRange) fetchRevenue(dateRange); };

  // Columns bảng chi tiết
  const detailColumns = [
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      key: 'ngay',
      render: (v: string) => <span className="font-medium text-slate-700">{v}</span>,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'doanhThu',
      key: 'doanhThu',
      align: 'right' as const,
      render: (v: number) => <span className="font-bold text-blue-600">{fmt(v)}</span>,
      sorter: (a: DayRow, b: DayRow) => a.doanhThu - b.doanhThu,
    },
    {
      title: 'Số đơn hàng',
      dataIndex: 'soDon',
      key: 'soDon',
      align: 'center' as const,
      render: (v: number) => (
        <Tag color="blue" className="rounded-full px-3 font-semibold">{v}</Tag>
      ),
    },
  ];

  // Recent orders columns
  const recentCols = [
    { title: 'Mã ĐH', dataIndex: 'maDonHang', key: 'maDonHang', render: (t: string) => <span className="font-semibold text-blue-600">{t}</span> },
    { title: 'Khách hàng', dataIndex: 'maKH', key: 'maKH', render: (v: string) => <span className="text-xs font-mono text-slate-600">{v}</span> },
    {
      title: 'Ngày đặt', dataIndex: 'ngayDat', key: 'ngayDat',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai',
      render: (s: string) => {
        const colorMap: Record<string, string> = { 'Hoan Thanh': 'success', 'Dang Giao': 'processing', 'Cho Xu Ly': 'warning', 'Da Huy': 'error' };
        const textMap: Record<string, string> = { 'Hoan Thanh': 'Hoàn thành', 'Dang Giao': 'Đang giao', 'Cho Xu Ly': 'Chờ xử lý', 'Da Huy': 'Đã hủy' };
        return <Tag color={colorMap[s] || 'default'} className="rounded-md">{textMap[s] || s}</Tag>;
      },
    },
    {
      title: 'Tổng tiền', dataIndex: 'tongTien', key: 'tongTien', align: 'right' as const,
      render: (v: number) => <span className="font-semibold">{fmt(v)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Tổng quan hệ thống</Title>
          <Text className="text-slate-500">Chào mừng trở lại — xem qua các chỉ số của cửa hàng hôm nay.</Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={fetchOverview} loading={loading} className="rounded-lg">
          Làm mới
        </Button>
      </div>

      {/* ── Stat cards ── */}
      <Spin spinning={loading}>
        <Row gutter={[20, 20]}>
          {[
            {
              label: 'Tổng doanh thu', value: tongDoanhThu > 0 ? fmtCompact(tongDoanhThu) : '—',
              sub: '30 ngày gần nhất', icon: <DollarOutlined className="text-2xl text-blue-600" />,
              bg: 'bg-blue-50', trend: true,
            },
            {
              label: 'Tổng đơn hàng', value: orders.length || '—',
              sub: 'Tất cả đơn', icon: <ShoppingOutlined className="text-2xl text-emerald-600" />,
              bg: 'bg-emerald-50', trend: true,
            },
            {
              label: 'Khách hàng', value: totalCustomers || '—',
              sub: 'Đã đăng ký', icon: <UsergroupAddOutlined className="text-2xl text-purple-600" />,
              bg: 'bg-purple-50', trend: true,
            },
            {
              label: 'Laptop đang bán', value: totalLaptops || '—',
              sub: 'Sản phẩm', icon: <LaptopOutlined className="text-2xl text-amber-600" />,
              bg: 'bg-amber-50', trend: true,
            },
          ].map((item) => (
            <Col xs={24} sm={12} lg={6} key={item.label}>
              <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.value}</h3>
                    {item.trend && (
                      <span className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                        <ArrowUpOutlined /> {item.sub}
                      </span>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>

      {/* ════════════════════════════════════════════════════════
          PHẦN BÁO CÁO DOANH THU
      ════════════════════════════════════════════════════════ */}
      <Card
        bordered={false}
        className="shadow-sm rounded-2xl"
        title={
          <div className="flex items-center gap-2">
            <BarChartOutlined className="text-blue-600 text-lg" />
            <span className="font-bold text-slate-800 text-base">Báo cáo Doanh thu</span>
          </div>
        }
      >
        {/* Bộ lọc ngày */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
          <CalendarOutlined className="text-slate-500" />
          <RangePicker
            value={dateRange}
            onChange={(vals) => {
              if (vals && vals[0] && vals[1]) setDateRange([vals[0], vals[1]]);
            }}
            format="DD/MM/YYYY"
            className="h-10 rounded-lg"
            placeholder={['Từ ngày', 'Đến ngày']}
            allowClear={false}
          />
          <Button
            type="primary"
            onClick={handleSearch}
            loading={revenueLoading}
            className="h-10 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 font-medium"
          >
            Thống kê
          </Button>
          <Button
            icon={<FileExcelOutlined />}
            className="h-10 rounded-lg border-emerald-400 text-emerald-600 hover:bg-emerald-50"
            disabled={!dateRange}
            onClick={() => {
              if (!dateRange) return;
              const headers = 'Ngày,Doanh thu,Số đơn hàng\n';
              const rows = dayData.map((r) => `${r.ngay},${r.doanhThu},${r.soDon}`).join('\n');
              const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url;
              a.download = `doanh-thu-${dateRange[0].format('DDMMYYYY')}-${dateRange[1].format('DDMMYYYY')}.csv`;
              a.click(); URL.revokeObjectURL(url);
            }}
          >
            Xuất Excel
          </Button>
        </div>

        <Spin spinning={revenueLoading}>
          {/* Thẻ tổng hợp khoảng thời gian */}
          <Row gutter={[16, 16]} className="mb-6">
            {[
              {
                label: 'Tổng doanh thu',
                value: tongDoanhThu > 0 ? fmt(tongDoanhThu) : '0 ₫',
                icon: <DollarOutlined />, color: '#1677ff', bg: '#eff6ff',
              },
              {
                label: 'Tổng đơn hàng',
                value: `${tongDon} đơn`,
                icon: <ShoppingOutlined />, color: '#10b981', bg: '#f0fdf4',
              },
              {
                label: 'Trung bình / ngày',
                value: fmtCompact(trungBinhNgay),
                icon: <RiseOutlined />, color: '#7c3aed', bg: '#faf5ff',
              },
            ].map((item) => (
              <Col xs={24} sm={8} key={item.label}>
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{ borderColor: item.color + '33', backgroundColor: item.bg }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ color: item.color, backgroundColor: item.color + '22' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                    <p className="text-lg font-bold" style={{ color: item.color }}>{item.value}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Biểu đồ */}
          <div className="mb-2">
            <p className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
              <BarChartOutlined /> Biểu đồ Doanh thu
            </p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayChart} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradDT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1677ff" stopOpacity={0.75} />
                      <stop offset="95%" stopColor="#1677ff" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(v: number) => fmtCompact(v)} dx={-4} width={80} />
                  <ReTooltip
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                    formatter={(value: any) => {
                      // Bước 1: Chuyển đổi giá trị sang dạng số (đề phòng thư viện Recharts trả về dạng chuỗi hoặc kiểu khác)
                      const giaTriSo = Number(value);
                      
                      // Bước 2: Dùng hàm fmt đã viết ở trên để định dạng số thành tiền tệ VNĐ (ví dụ: 1.000.000 ₫)
                      const giaTriDaDinhDang = fmt(giaTriSo);
                      
                      // Bước 3: Trả về một mảng chứa [Giá trị hiển thị, Tên nhãn hiển thị]
                      return [giaTriDaDinhDang, 'Doanh thu'];
                    }}
                  />
                  <Area type="monotone" dataKey="doanhThu" stroke="#1677ff" strokeWidth={2.5} fillOpacity={1} fill="url(#gradDT)" dot={false} activeDot={{ r: 5, strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Divider className="my-4" />

          {/* Bảng chi tiết */}
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-3">📋 Bảng chi tiết theo ngày</p>
            {dayData.length > 0 ? (
              <Table<DayRow>
                columns={detailColumns}
                dataSource={dayData.map((d, i) => ({ ...d, key: i }))}
                pagination={{ pageSize: 7, size: 'small' }}
                size="small"
                className="custom-table"
                summary={(pageData) => {
                  const totalDT = pageData.reduce((s, r) => s + r.doanhThu, 0);
                  const totalSD = pageData.reduce((s, r) => s + r.soDon, 0);
                  return (
                    <Table.Summary.Row className="bg-blue-50 font-bold">
                      <Table.Summary.Cell index={0}>
                        <span className="font-bold text-slate-700">Tổng trang</span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        <span className="font-bold text-blue-700">{fmt(totalDT)}</span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} align="center">
                        <Tag color="blue" className="rounded-full font-bold">{totalSD}</Tag>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            ) : (
              <Empty description="Không có dữ liệu trong khoảng thời gian này" className="py-8" />
            )}
          </div>
        </Spin>
      </Card>

      {/* ── Đơn hàng gần đây ── */}
      <Card
        bordered={false}
        className="shadow-sm rounded-2xl"
        title={<span className="font-semibold text-slate-800">Đơn hàng gần đây</span>}
        extra={<Button type="link" className="p-0 text-blue-600" onClick={() => navigate('/admin/orders')}>Xem tất cả</Button>}
      >
        <Table
          columns={recentCols}
          dataSource={orders.slice(0, 5).map((o, i) => ({ ...o, key: i }))}
          pagination={false}
          className="custom-table"
          locale={{ emptyText: 'Chưa có đơn hàng' }}
        />
      </Card>
    </div>
  );
};
