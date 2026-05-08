import React, { useState } from 'react';
import { Input, Badge, Dropdown, Modal, Descriptions, Tag, Table, Spin, message, AutoComplete } from 'antd';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  PhoneFilled,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  IdcardOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './StoreHeader.module.css';
import { useCart } from '../../../app/CartContext';
import { useAuth } from '../../../app/AuthContext';
import api from '../../../services/api';

export const StoreHeader: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [profileVisible, setProfileVisible] = useState(false);
  const [ordersVisible, setOrdersVisible] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Search state
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<any[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const stored = localStorage.getItem('all_products');
      let products = [];
      if (stored) {
        try { products = JSON.parse(stored); } catch (e) {}
      }
      const kw = value.toLowerCase();
      const filtered = products.filter((p: any) => 
        (p.tenLaptop && p.tenLaptop.toLowerCase().includes(kw)) ||
        (p.maLaptop && p.maLaptop.toLowerCase().includes(kw))
      ).slice(0, 5);

      setOptions(filtered.map((p: any) => ({
        value: p.tenLaptop, // Use name for the input value when selected
        label: (
          <div className="flex items-center gap-2 py-1">
            <img src={p.duongDanAnh || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 object-contain rounded" />
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold truncate text-slate-800">{p.tenLaptop}</div>
              <div className="text-xs text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.gia || 0)}</div>
            </div>
          </div>
        ),
        product: p,
      })));
    } else {
      setOptions([]);
    }
  };

  const onSelect = (_value: string, option: any) => {
    navigate(`/product/${option.product.maLaptop}`);
    setSearchValue('');
    setOptions([]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openOrders = async () => {
    setOrdersVisible(true);
    if (!user?.maKH) return;
    setLoadingOrders(true);
    try {
      const res = await api.get(`/api/donhang/lich-su/${user.maKH}`);
      const rawData = Array.isArray(res.data) ? res.data : [];
      
      const orderMap = new Map();
      rawData.forEach((item: any) => {
        if (!orderMap.has(item.maDonHang)) {
          orderMap.set(item.maDonHang, {
            ...item,
            details: []
          });
        }
        if (item.tenLaptop) {
          orderMap.get(item.maDonHang).details.push({
            tenLaptop: item.tenLaptop,
            soLuong: item.soLuong,
            donGia: item.donGia,
            thanhTien: item.thanhTien
          });
        }
      });
      
      setOrders(Array.from(orderMap.values()));
    } catch {
      message.error('Không thể tải đơn hàng.');
    } finally {
      setLoadingOrders(false);
    }
  };

  // Tạo dropdown items theo role
  const buildMenuItems = () => {
    const role = user?.role;
    if (role === 'Admin') {
      return [
        { key: 'admin', label: 'Trang quản trị', icon: <DashboardOutlined /> },
        { type: 'divider' as const },
        { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true },
      ];
    }
    if (role === 'NhanVien') {
      return [
        { key: 'admin', label: 'Trang quản trị', icon: <DashboardOutlined /> },
        { type: 'divider' as const },
        { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true },
      ];
    }
    // KhachHang
    return [
      { key: 'profile', label: 'Thông tin cá nhân', icon: <IdcardOutlined /> },
      { key: 'orders', label: 'Đơn hàng của tôi', icon: <ShoppingOutlined /> },
      { type: 'divider' as const },
      { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true },
    ];
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') handleLogout();
    else if (key === 'admin') navigate('/admin');
    else if (key === 'profile') setProfileVisible(true);
    else if (key === 'orders') openOrders();
  };

  // Nhãn hiển thị tên
  const displayLabel = () => {
    const role = user?.role;
    if (role === 'Admin') return 'Admin';
    return user?.fullName || user?.tenDangNhap || 'Tài khoản';
  };

  const orderColumns = [
    { title: 'Mã ĐH', dataIndex: 'maDonHang', key: 'maDonHang', render: (v: string) => <span className="font-mono text-xs">{v}</span> },
    { 
      title: 'Tên Laptop', 
      dataIndex: 'details', 
      key: 'tenLaptop', 
      render: (details: any[]) => {
        if (!details || details.length === 0) return '—';
        if (details.length === 1) return <div className="truncate max-w-[150px]" title={details[0].tenLaptop}>{details[0].tenLaptop}</div>;
        return <div className="truncate max-w-[150px]" title={`${details[0].tenLaptop} và ${details.length - 1} sp khác`}>{details[0].tenLaptop} và <span className="text-blue-500 font-semibold">{details.length - 1} sp khác</span></div>;
      }
    },
    { title: 'Ngày đặt', dataIndex: 'ngayDat', key: 'ngayDat', render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—' },
    { title: 'Tổng tiền', dataIndex: 'tongTien', key: 'tongTien', render: (v: number) => v?.toLocaleString('vi-VN') + ' ₫' },
    {
      title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai',
      render: (v: string) => {
        const colorMap: Record<string, string> = { 'Chờ xử lý': 'orange', 'Đang xử lý': 'blue', 'Đã giao': 'green', 'Hủy': 'red' };
        return <Tag color={colorMap[v] || 'default'}>{v}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <EyeOutlined 
          className="text-blue-500 cursor-pointer text-lg hover:text-blue-700 transition-colors" 
          onClick={() => {
            setSelectedOrder(record);
            setDetailVisible(true);
          }} 
          title="Xem chi tiết"
        />
      ),
      align: 'center' as const,
    }
  ];

  const detailColumns = [
    { title: 'Tên Laptop', dataIndex: 'tenLaptop', key: 'tenLaptop' },
    { title: 'Số lượng', dataIndex: 'soLuong', key: 'soLuong', align: 'center' as const },
    { title: 'Đơn giá', dataIndex: 'donGia', key: 'donGia', render: (v: number) => v?.toLocaleString('vi-VN') + ' ₫', align: 'right' as const },
    { title: 'Thành tiền', dataIndex: 'thanhTien', key: 'thanhTien', render: (v: number) => v?.toLocaleString('vi-VN') + ' ₫', align: 'right' as const },
  ];

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" className={styles.logoImg} />
        </div>

        {/* Search */}
        <div className={styles.searchBox}>
          <div className={styles.searchInner}>
            <AutoComplete
              options={options}
              onSearch={handleSearch}
              onSelect={onSelect}
              value={searchValue}
              onChange={setSearchValue}
              style={{ flex: 1 }}
              dropdownMatchSelectWidth={400}
            >
              <Input
                placeholder="Bạn cần tìm sản phẩm gì..."
                variant="borderless"
                className={styles.searchInput}
                onKeyDown={onKeyDown}
              />
            </AutoComplete>
            <button 
              className={styles.searchBtn} 
              onClick={() => searchValue.trim() && navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`)}
            >
              <SearchOutlined />
            </button>
          </div>
        </div>

        {/* Right icons */}
        <div className={styles.rightIcons}>
          {/* Hotline */}
          <div className={styles.iconGroup}>
            <div className={`${styles.iconBubble} ${styles.iconBubbleRed}`}>
              <PhoneFilled />
            </div>
            <div className={styles.iconLabel}>
              <span className={styles.iconLabelTop}>Hotline hỗ trợ</span>
              <span className={styles.hotlineLabelBottom}>0969 630 275</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Cart */}
          <div className={styles.iconGroup} onClick={() => navigate('/cart')}>
            <Badge count={totalItems} showZero color="#ef4444" size="default" offset={[3, -3]}>
              <div className={`${styles.iconBubble} ${styles.iconBubbleBlue}`}>
                <ShoppingCartOutlined />
              </div>
            </Badge>
            <div className={styles.iconLabel}>
              <span className={styles.iconLabelTop}>Giỏ hàng</span>
              <span className={`${styles.iconLabelBottom} ${styles.iconLabelBottomBlue}`}></span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Auth */}
          {isAuthenticated ? (
            <>
              <Dropdown
                menu={{ items: buildMenuItems(), onClick: handleMenuClick }}
                placement="bottomRight"
                trigger={['click']}
              >
                <div className={styles.iconGroup} style={{ cursor: 'pointer' }}>
                  <div className={`${styles.iconBubble} ${styles.iconBubbleBlue}`}>
                    <UserOutlined style={{ color: '#1d4ed8' }} />
                  </div>
                  <div className={styles.iconLabel}>
                    <span className={styles.iconLabelTop}>Tài khoản</span>
                    <span className={`${styles.iconLabelBottom} ${styles.iconLabelBottomBlue}`}
                      style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                    >
                      {displayLabel()}
                    </span>
                  </div>
                </div>
              </Dropdown>

              {/* Modal thông tin cá nhân */}
              <Modal
                title={<span style={{ fontWeight: 700 }}>Thông tin cá nhân</span>}
                open={profileVisible}
                onCancel={() => setProfileVisible(false)}
                footer={null}
                centered
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Tên đăng nhập">{user?.tenDangNhap}</Descriptions.Item>
                  <Descriptions.Item label="Họ và tên">{user?.fullName || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Vai trò">
                    <Tag color="green">Khách hàng</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Mã khách hàng">{user?.maKH || '—'}</Descriptions.Item>
                </Descriptions>
              </Modal>

              {/* Modal đơn hàng */}
              <Modal
                title={<span style={{ fontWeight: 700 }}>Đơn hàng của tôi</span>}
                open={ordersVisible}
                onCancel={() => { setOrdersVisible(false); setOrders([]); }}
                footer={null}
                centered
                width={850}
              >
                <Spin spinning={loadingOrders}>
                  <Table
                    columns={orderColumns}
                    dataSource={orders}
                    rowKey="maDonHang"
                    size="small"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: 'Chưa có đơn hàng nào' }}
                  />
                </Spin>
              </Modal>

              {/* Modal chi tiết đơn hàng */}
              <Modal
                title={<span style={{ fontWeight: 700 }}>Chi tiết đơn hàng {selectedOrder?.maDonHang}</span>}
                open={detailVisible}
                onCancel={() => { setDetailVisible(false); setSelectedOrder(null); }}
                footer={null}
                centered
                width={700}
              >
                {selectedOrder && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-4 rounded-lg">
                      <div><span className="font-semibold text-slate-500">Ngày đặt:</span> {new Date(selectedOrder.ngayDat).toLocaleDateString('vi-VN')}</div>
                      <div><span className="font-semibold text-slate-500">Trạng thái:</span> <Tag color={selectedOrder.trangThai === 'Đã giao' ? 'green' : 'orange'}>{selectedOrder.trangThai}</Tag></div>
                      <div className="col-span-2"><span className="font-semibold text-slate-500">Tổng tiền:</span> <span className="font-bold text-red-600">{selectedOrder.tongTien?.toLocaleString('vi-VN')} ₫</span></div>
                    </div>
                    <Table
                      columns={detailColumns}
                      dataSource={selectedOrder.details || []}
                      rowKey="tenLaptop"
                      size="small"
                      pagination={false}
                    />
                  </div>
                )}
              </Modal>
            </>
          ) : (
            <div className={styles.iconGroup} onClick={() => navigate('/login')}>
              <div className={`${styles.iconBubble} ${styles.iconBubbleGray}`}>
                <UserOutlined />
              </div>
              <div className={styles.iconLabel}>
                <span className={styles.iconLabelTop}>Tài khoản</span>
                <span className={`${styles.iconLabelBottom} ${styles.iconLabelBottomBlue}`}>Đăng nhập</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
