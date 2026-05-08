import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, Table, Tag, Button, Input, Select, DatePicker,
  Space, Typography, Tooltip, Badge, Row, Col, Modal,
  Spin, Alert, Descriptions, Form, InputNumber, message,
  Divider,
} from 'antd';
import {
  SearchOutlined, EyeOutlined, PlusOutlined,
  FileTextOutlined, TeamOutlined, DollarOutlined, ReloadOutlined,
  DeleteOutlined, ShoppingCartOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { importService } from '../../services/importService';
import { supplierService } from '../../services/supplierService';
import { laptopService } from '../../services/laptopService';
import type { PhieuNhapViewModel, ChiTietPhieuNhapViewModel, NhaCungCap, Laptop } from '../../types';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

/** Tạo mã ngẫu nhiên dạng PN + timestamp */
const genId = (prefix: string) => `${prefix}${Date.now()}`;

interface DetailRow {
  key: string;
  maLaptop: string;
  tenLaptop: string;
  soLuong: number;
  giaNhap: number;
}

export const ImportList: React.FC = () => {
  // ── State danh sách ──────────────────────────────────────────────────────
  const [imports, setImports] = useState<PhieuNhapViewModel[]>([]);
  const [filtered, setFiltered] = useState<PhieuNhapViewModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── State modal chi tiết ─────────────────────────────────────────────────
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<ChiTietPhieuNhapViewModel[]>([]);
  const [selectedPhieu, setSelectedPhieu] = useState<PhieuNhapViewModel | null>(null);

  // ── State modal tạo phiếu ────────────────────────────────────────────────
  const [createVisible, setCreateVisible] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<NhaCungCap[]>([]);
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [selectedMaNCC, setSelectedMaNCC] = useState<string>('');
  const [ghiChu, setGhiChu] = useState('');
  const [rows, setRows] = useState<DetailRow[]>([]);

  // ── Filters ──────────────────────────────────────────────────────────────
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  // ── Fetch danh sách phiếu nhập ───────────────────────────────────────────
  const fetchImports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await importService.getAll();
      setImports(data);
      setFiltered(data);
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setError('Không có quyền truy cập. Vui lòng đăng nhập lại.');
      } else {
        setError('Không thể tải dữ liệu phiếu nhập. Kiểm tra kết nối Backend.');
      }
      setImports([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchImports(); }, [fetchImports]);

  // ── Client-side filter ───────────────────────────────────────────────────
  useEffect(() => {
    let result = imports;
    if (searchText.trim()) {
      const kw = searchText.toLowerCase();
      result = result.filter(
        (p) => p.maPhieuNhap.toLowerCase().includes(kw) || (p.tenNCC || '').toLowerCase().includes(kw)
      );
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      const from = dateRange[0].startOf('day').toDate();
      const to = dateRange[1].endOf('day').toDate();
      result = result.filter((p) => {
        const d = new Date(p.ngayNhap);
        return d >= from && d <= to;
      });
    }
    setFiltered(result);
  }, [searchText, dateRange, imports]);

  // ── Mở modal tạo phiếu ──────────────────────────────────────────────────
  const openCreate = async () => {
    setCreateVisible(true);
    setSelectedMaNCC('');
    setGhiChu('');
    setRows([]);
    try {
      const [nccList, laptopList] = await Promise.all([
        supplierService.getAll(),
        laptopService.getAll(),
      ]);
      setSuppliers(nccList);
      setLaptops(laptopList);
    } catch {
      message.error('Không tải được danh sách nhà cung cấp / laptop');
    }
  };

  // ── Quản lý dòng chi tiết ────────────────────────────────────────────────
  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { key: genId('row'), maLaptop: '', tenLaptop: '', soLuong: 1, giaNhap: 0 },
    ]);
  };

  const removeRow = (key: string) => setRows((prev) => prev.filter((r) => r.key !== key));

  const updateRow = (key: string, field: keyof DetailRow, value: any) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.key !== key) return r;
        if (field === 'maLaptop') {
          const lp = laptops.find((l) => l.maLaptop === value);
          return { ...r, maLaptop: value, tenLaptop: lp?.tenLaptop || '', giaNhap: lp?.gia || 0 };
        }
        return { ...r, [field]: value };
      })
    );
  };

  // ── Submit tạo phiếu ─────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!selectedMaNCC) { message.warning('Vui lòng chọn nhà cung cấp'); return; }
    if (rows.length === 0) { message.warning('Vui lòng thêm ít nhất 1 sản phẩm'); return; }
    for (const r of rows) {
      if (!r.maLaptop) { message.warning('Vui lòng chọn laptop cho tất cả các dòng'); return; }
      if (r.soLuong <= 0) { message.warning('Số lượng phải lớn hơn 0'); return; }
      if (r.giaNhap <= 0) { message.warning('Giá nhập phải lớn hơn 0'); return; }
    }

    // Lấy maNV từ localStorage (user đang đăng nhập)
    let maNV = '';
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      maNV = user.maNV || user.maTK || '';
    } catch { maNV = ''; }

    const maPhieuNhap = genId('PN');
    setCreateLoading(true);
    try {
      // 1. Tạo phiếu nhập
      await importService.create({ maPhieuNhap, maNCC: selectedMaNCC, maNV });

      // 2. Thêm từng dòng chi tiết
      for (const r of rows) {
        await importService.addDetail({
          maCTPN: genId('CTPN'),
          maPhieuNhap,
          maLaptop: r.maLaptop,
          soLuong: r.soLuong,
          giaNhap: r.giaNhap,
        });
      }

      message.success(`Tạo phiếu nhập ${maPhieuNhap} thành công!`);
      setCreateVisible(false);
      fetchImports(); // Reload danh sách
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Tạo phiếu nhập thất bại. Kiểm tra lại Backend.');
    } finally {
      setCreateLoading(false);
    }
  };

  // ── Xem chi tiết ─────────────────────────────────────────────────────────
  const handleViewDetail = useCallback(async (record: PhieuNhapViewModel) => {
    setSelectedPhieu(record);
    setDetailVisible(true);
    setDetailLoading(true);
    setDetailData([]);
    try {
      const data = await importService.getDetail(record.maPhieuNhap);
      setDetailData(data);
    } catch {
      setDetailData([]);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // ── Cột bảng chính ───────────────────────────────────────────────────────
  const columns = [
    {
      title: 'Mã Phiếu', dataIndex: 'maPhieuNhap', key: 'maPhieuNhap',
      render: (t: string) => <span className="font-semibold text-blue-600">{t}</span>,
    },
    { title: 'Nhà cung cấp', dataIndex: 'tenNCC', key: 'tenNCC', className: 'font-medium text-slate-700' },
    {
      title: 'Người tạo', dataIndex: 'tenNV', key: 'tenNV',
      render: (t: string) => <div className="flex items-center gap-2 text-slate-600"><TeamOutlined /> {t || '—'}</div>,
    },
    {
      title: 'Ngày nhập', dataIndex: 'ngayNhap', key: 'ngayNhap',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Số lượng SP', dataIndex: 'tongSoLuongSP', key: 'tongSoLuongSP', align: 'center' as const,
      render: (v: number) => <Badge count={v} showZero color="#8b5cf6" />,
    },
    {
      title: 'Tổng tiền', dataIndex: 'tongTien', key: 'tongTien', align: 'right' as const,
      render: (v: number) => <span className="font-bold text-slate-800">{formatCurrency(v)}</span>,
    },
    {
      title: 'Thao tác', key: 'action', align: 'right' as const,
      render: (_: any, record: PhieuNhapViewModel) => (
        <Tooltip title="Xem chi tiết phiếu nhập">
          <Button type="text" icon={<EyeOutlined className="text-blue-600" />} onClick={() => handleViewDetail(record)} />
        </Tooltip>
      ),
    },
  ];

  // ── Cột modal chi tiết ───────────────────────────────────────────────────
  const detailColumns = [
    { title: 'Mã Laptop', dataIndex: 'maLaptop', key: 'maLaptop', render: (v: string) => <span className="font-mono text-xs text-slate-500">{v}</span> },
    { title: 'Tên Laptop', dataIndex: 'tenLaptop', key: 'tenLaptop', render: (v: string) => <span className="font-semibold text-slate-800">{v}</span> },
    { title: 'CPU', dataIndex: 'cpu', key: 'cpu', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { title: 'RAM', dataIndex: 'ram', key: 'ram', align: 'center' as const, render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: 'SSD', dataIndex: 'ssd', key: 'ssd', align: 'center' as const, render: (v: string) => <Tag color="cyan">{v}</Tag> },
    { title: 'Số lượng', dataIndex: 'soLuong', key: 'soLuong', align: 'center' as const, render: (v: number) => <Badge count={v} showZero color="#10b981" /> },
    { title: 'Giá nhập', dataIndex: 'giaNhap', key: 'giaNhap', align: 'right' as const, render: (v: number) => formatCurrency(v) },
    { title: 'Thành tiền', dataIndex: 'thanhTien', key: 'thanhTien', align: 'right' as const, render: (v: number) => <span className="font-bold text-blue-700">{formatCurrency(v)}</span> },
  ];

  const tongThanhTien = detailData.reduce((s, r) => s + r.thanhTien, 0);
  const tongTamTinh = rows.reduce((s, r) => s + r.soLuong * r.giaNhap, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Quản lý Nhập hàng</Title>
          <Text className="text-slate-500">Lịch sử phiếu nhập và tình trạng hàng hóa</Text>
        </div>
        <Space>
          <Tooltip title="Làm mới">
            <Button icon={<ReloadOutlined />} onClick={fetchImports} loading={loading} className="h-10 rounded-lg" />
          </Tooltip>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 rounded-lg h-10" onClick={openCreate}>
            Tạo phiếu nhập mới
          </Button>
        </Space>
      </div>

      {/* Thống kê */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <p className="text-slate-500 text-sm font-medium mb-1">Tổng tiền nhập</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <DollarOutlined className="text-blue-500" />
              {formatCurrency(imports.reduce((s, p) => s + p.tongTien, 0))}
            </h3>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <p className="text-slate-500 text-sm font-medium mb-1">Số lượng phiếu nhập</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FileTextOutlined className="text-emerald-500" /> {imports.length} phiếu
            </h3>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <p className="text-slate-500 text-sm font-medium mb-1">Tổng sản phẩm đã nhập</p>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <TeamOutlined className="text-purple-500" />
              {imports.reduce((s, p) => s + p.tongSoLuongSP, 0)} SP
            </h3>
          </Card>
        </Col>
      </Row>

      {error && (
        <Alert message="Thông báo" description={error} type="warning" showIcon closable onClose={() => setError(null)} className="rounded-xl" />
      )}

      {/* Bảng danh sách */}
      <Spin spinning={loading}>
        <Card bordered={false} className="shadow-sm rounded-xl">
          <div className="flex flex-wrap gap-4 mb-6">
            <Input
              prefix={<SearchOutlined className="text-slate-400" />}
              placeholder="Mã phiếu nhập, nhà cung cấp..."
              className="w-64 h-10 rounded-lg"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <RangePicker
              className="h-10 rounded-lg"
              placeholder={['Từ ngày', 'Đến ngày']}
              onChange={(dates) => setDateRange(dates as [Dayjs | null, Dayjs | null] | null)}
            />
          </div>
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="maPhieuNhap"
            pagination={{ pageSize: 8 }}
            className="custom-table"
            locale={{ emptyText: imports.length === 0 && !loading ? 'Chưa có dữ liệu phiếu nhập' : 'Không có kết quả phù hợp' }}
          />
        </Card>
      </Spin>

      {/* ─────── Modal tạo phiếu nhập mới ─────── */}
      <Modal
        open={createVisible}
        onCancel={() => !createLoading && setCreateVisible(false)}
        width={900}
        title={<span className="text-lg font-bold text-slate-800">📦 Tạo phiếu nhập mới</span>}
        footer={[
          <Button key="cancel" onClick={() => setCreateVisible(false)} disabled={createLoading}>Hủy</Button>,
          <Button
            key="submit"
            type="primary"
            icon={<ShoppingCartOutlined />}
            loading={createLoading}
            onClick={handleCreate}
            className="bg-blue-600"
          >
            Xác nhận tạo phiếu
          </Button>,
        ]}
      >
        {/* Thông tin phiếu */}
        <Form layout="vertical" className="mb-2">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label={<span className="font-medium">Nhà cung cấp <span className="text-red-500">*</span></span>}>
                <Select
                  placeholder="Chọn nhà cung cấp..."
                  value={selectedMaNCC || undefined}
                  onChange={(v) => setSelectedMaNCC(v)}
                  showSearch
                  optionFilterProp="children"
                  className="w-full"
                  size="large"
                >
                  {suppliers.map((s) => (
                    <Option key={s.maNCC} value={s.maNCC}>{s.tenNCC}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span className="font-medium">Ghi chú</span>}>
                <Input
                  placeholder="Ghi chú (tùy chọn)"
                  value={ghiChu}
                  onChange={(e) => setGhiChu(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Divider orientation={"left" as any} className="font-semibold text-slate-700">
          Danh sách sản phẩm nhập
        </Divider>

        {/* Bảng dòng chi tiết */}
        <div className="space-y-3 mb-4">
          {rows.length === 0 && (
            <div className="text-center py-6 text-slate-400 bg-slate-50 rounded-lg">
              Chưa có sản phẩm. Nhấn "Thêm dòng" để bắt đầu.
            </div>
          )}
          {rows.map((row, idx) => (
            <Row key={row.key} gutter={8} align="middle" className="bg-slate-50 rounded-lg p-2">
              <Col span={1}>
                <span className="text-slate-400 font-mono text-xs">{idx + 1}</span>
              </Col>
              <Col span={10}>
                <Select
                  placeholder="Chọn laptop..."
                  value={row.maLaptop || undefined}
                  onChange={(v) => updateRow(row.key, 'maLaptop', v)}
                  showSearch
                  optionFilterProp="children"
                  className="w-full"
                  size="middle"
                >
                  {laptops.map((l) => (
                    <Option key={l.maLaptop} value={l.maLaptop}>
                      {l.tenLaptop} — {l.ram} / {l.ssd}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  value={row.soLuong}
                  onChange={(v) => updateRow(row.key, 'soLuong', v ?? 1)}
                  addonBefore="SL"
                  className="w-full"
                />
              </Col>
              <Col span={6}>
                <InputNumber
                  min={0}
                  value={row.giaNhap}
                  onChange={(v) => updateRow(row.key, 'giaNhap', v ?? 0)}
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(v) => Number(v!.replace(/,/g, ''))}
                  addonAfter="đ"
                  className="w-full"
                />
              </Col>
              <Col span={3} className="text-right">
                <span className="text-xs font-semibold text-blue-700 block mb-1">
                  {formatCurrency(row.soLuong * row.giaNhap)}
                </span>
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => removeRow(row.key)}
                />
              </Col>
            </Row>
          ))}
        </div>

        {/* Footer của form */}
        <div className="flex justify-between items-center mt-2">
          <Button icon={<PlusOutlined />} onClick={addRow} type="dashed">
            Thêm dòng sản phẩm
          </Button>
          {rows.length > 0 && (
            <div className="text-right">
              <span className="text-slate-500 text-sm mr-3">Tạm tính:</span>
              <span className="text-xl font-extrabold text-blue-700">{formatCurrency(tongTamTinh)}</span>
            </div>
          )}
        </div>
      </Modal>

      {/* ─────── Modal xem chi tiết ─────── */}
      <Modal
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={900}
        title={
          <div>
            <span className="text-lg font-bold text-slate-800">Chi tiết phiếu nhập</span>
            {selectedPhieu && <span className="ml-3 text-blue-600 font-mono text-base">#{selectedPhieu.maPhieuNhap}</span>}
          </div>
        }
      >
        {selectedPhieu && (
          <Descriptions bordered column={3} size="small" className="mb-4">
            <Descriptions.Item label="Nhà cung cấp">{selectedPhieu.tenNCC}</Descriptions.Item>
            <Descriptions.Item label="Người tạo">{selectedPhieu.tenNV}</Descriptions.Item>
            <Descriptions.Item label="Ngày nhập">{new Date(selectedPhieu.ngayNhap).toLocaleDateString('vi-VN')}</Descriptions.Item>
            <Descriptions.Item label="Ghi chú" span={3}>{selectedPhieu.ghiChu || '—'}</Descriptions.Item>
          </Descriptions>
        )}
        <Spin spinning={detailLoading}>
          <Table
            columns={detailColumns}
            dataSource={detailData}
            rowKey="maCTPN"
            pagination={false}
            size="small"
            className="custom-table"
            locale={{ emptyText: 'Không có dữ liệu chi tiết' }}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={7} align="right">
                  <span className="font-bold text-slate-700">Tổng cộng:</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <span className="font-extrabold text-blue-700 text-base">{formatCurrency(tongThanhTien)}</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        </Spin>
      </Modal>
    </div>
  );
};
