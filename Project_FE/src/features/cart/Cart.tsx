import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputNumber, Divider, Tooltip, Modal, Form, Input, Select, message } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, LeftOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useCart } from '../../app/CartContext';
import { useAuth } from '../../app/AuthContext';
import { orderService } from '../../services/orderService';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, cartTotal, totalItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [form] = Form.useForm();

  // Prefill form nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated && user) {
      form.setFieldsValue({
        hoTen: user.fullName || user.tenDangNhap,
      });
    }
  }, [isAuthenticated, user, form]);

  // Mở modal thanh toán — yêu cầu đăng nhập
  const handleOpenCheckout = () => {
    if (!isAuthenticated) {
      message.warning('Vui lòng đăng nhập để đặt hàng!');
      navigate('/login');
      return;
    }
    setIsCheckoutModalVisible(true);
  };

  const handleCheckoutSubmit = async (values: any) => {
    setCheckoutLoading(true);
    try {
      // 1. Tạo đơn hàng
      const maDonHang = `DH${Date.now()}`;
      const donHangData = {
        maDonHang,
        maKH: user?.maKH || '',
        ngayDat: new Date().toISOString(),
        tongTien: cartTotal,
        trangThai: 'Chờ xử lý',
        diaChiGiaoHang: values.diaChi,
        phuongThucThanhToan: values.phuongThuc,
        ghiChu: `Tên: ${values.hoTen}, SĐT: ${values.soDienThoai}${values.email ? ', Email: ' + values.email : ''}`,
      };

      await orderService.create(donHangData);

      // 2. Thêm từng chi tiết đơn hàng
      for (const item of items) {
        // Parse giá: "14.990.000đ" → 14990000
        const unitPrice = Number(item.product.price.replace(/\./g, '').replace(/[^0-9]/g, '')) || 0;
        const maCTDH = `CT${Date.now()}_${item.product.id}`;

        await orderService.addDetail({
          maCTDH,
          maDonHang,
          maLaptop: String(item.product.id),
          soLuong: item.quantity,
          donGia: unitPrice,
          thanhTien: unitPrice * item.quantity,
        });
      }

      message.success('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
      clearCart();
      setIsCheckoutModalVisible(false);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 401) {
        message.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        navigate('/login');
      } else {
        message.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Format VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-16 bg-slate-50">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center max-w-md text-center">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
            <ShoppingCartOutlined className="text-6xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Giỏ hàng trống</h2>
          <p className="text-slate-500 mb-8">
            Chưa có sản phẩm nào trong giỏ hàng của bạn. Khám phá các sản phẩm nổi bật ngay!
          </p>
          <Button
            type="primary"
            size="large"
            className="h-12 px-8 rounded-xl font-medium shadow-md shadow-blue-200"
            onClick={() => navigate('/')}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb / Title */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            type="text" 
            icon={<LeftOutlined />} 
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-blue-600"
          >
            Tiếp tục mua sắm
          </Button>
          <h1 className="text-2xl font-bold text-slate-800 m-0">Giỏ hàng của bạn</h1>
          <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-semibold">
            {totalItems} sản phẩm
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Items */}
          <div className="w-full lg:w-8/12 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header row */}
              <div className="hidden md:flex items-center px-6 py-4 bg-slate-50 border-b border-slate-100 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                <div className="w-6/12">Sản phẩm</div>
                <div className="w-2/12 text-center">Đơn giá</div>
                <div className="w-2/12 text-center">Số lượng</div>
                <div className="w-2/12 text-right">Thành tiền</div>
              </div>

              {/* Items List */}
              <div className="flex flex-col">
                {items.map((item, index) => {
                  const product = item.product;
                  const unitPrice = Number(product.price.replace(/\./g, '').replace(/[^0-9]/g, '')) || 0;
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div 
                      key={product.id} 
                      className={`flex flex-col md:flex-row items-center px-6 py-6 border-slate-100 ${index !== items.length - 1 ? 'border-b' : ''}`}
                    >
                      {/* Product Info */}
                      <div className="w-full md:w-6/12 flex items-center gap-4 mb-4 md:mb-0">
                        <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-lg p-2 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col">
                          <h3 
                            className="font-medium text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug mb-1"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            {product.name}
                          </h3>
                          <span className="text-xs text-slate-500 mb-2">Mã SP: HW-{product.id}</span>
                          <Tooltip title="Xóa khỏi giỏ hàng">
                            <span 
                              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 cursor-pointer w-fit"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <DeleteOutlined /> Xóa
                            </span>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="w-full md:w-2/12 flex md:justify-center mb-2 md:mb-0">
                        <span className="md:hidden text-slate-500 w-24">Đơn giá:</span>
                        <span className="font-medium text-slate-800">{formatCurrency(unitPrice)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="w-full md:w-2/12 flex md:justify-center mb-2 md:mb-0">
                        <span className="md:hidden text-slate-500 w-24">Số lượng:</span>
                        <InputNumber 
                          min={1} 
                          max={99} 
                          value={item.quantity} 
                          onChange={(val) => updateQuantity(product.id, val || 1)}
                          className="w-20"
                        />
                      </div>

                      {/* Line Total */}
                      <div className="w-full md:w-2/12 flex md:justify-end text-right">
                        <span className="md:hidden text-slate-500 w-24 text-left">Thành tiền:</span>
                        <span className="font-bold text-red-600">{formatCurrency(lineTotal)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm p-2">
               <SafetyCertificateOutlined className="text-green-600 text-lg" />
               <span>An tâm mua sắm với chính sách đổi trả miễn phí trong 30 ngày.</span>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="w-full lg:w-4/12">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Tóm tắt đơn hàng</h3>
              
              <div className="flex flex-col gap-3 text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>Tạm tính ({totalItems} sản phẩm)</span>
                  <span className="font-medium">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between">
                  <span>Giảm giá</span>
                  <span className="text-slate-400">0 ₫</span>
                </div>
              </div>
              
              <Divider className="my-4 border-slate-100" />
              
              <div className="flex justify-between items-end mb-6">
                <span className="text-slate-800 font-medium">Tổng cộng</span>
                <div className="flex flex-col items-end">
                  <span className="text-3xl font-extrabold text-red-600 leading-none">
                    {formatCurrency(cartTotal)}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">(Đã bao gồm VAT nếu có)</span>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="w-full h-14 rounded-xl text-lg font-bold bg-red-600 hover:bg-red-500 shadow-lg shadow-red-200 border-none relative overflow-hidden group"
                onClick={handleOpenCheckout}
              >
                <span className="relative z-10 transition-transform group-hover:scale-105 inline-block">
                  TIẾN HÀNH THANH TOÁN
                </span>
                <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Button>

              {!isAuthenticated && (
                <p className="mt-3 text-center text-xs text-amber-600 font-medium">
                  ⚠️ Vui lòng đăng nhập để đặt hàng
                </p>
              )}

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-400">Bằng việc tiến hành thanh toán, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thanh toán */}
      <Modal
        title={<span className="text-xl font-bold">Thông tin thanh toán</span>}
        open={isCheckoutModalVisible}
        onCancel={() => setIsCheckoutModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCheckoutSubmit}
          className="mt-4"
        >
          <Form.Item
            name="hoTen"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ và tên người nhận" size="large" />
          </Form.Item>

          <Form.Item
            name="soDienThoai"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input placeholder="Nhập địa chỉ email (tuỳ chọn)" size="large" />
          </Form.Item>

          <Form.Item
            name="diaChi"
            label="Địa chỉ giao hàng"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập địa chỉ giao hàng chi tiết" />
          </Form.Item>

          <Form.Item
            name="phuongThuc"
            label="Phương thức thanh toán"
            initialValue="Tiền mặt"
            rules={[{ required: true }]}
          >
            <Select size="large">
              <Select.Option value="Tiền mặt">Thanh toán khi nhận hàng (COD)</Select.Option>
              <Select.Option value="Chuyển khoản">Chuyển khoản ngân hàng</Select.Option>
            </Select>
          </Form.Item>

          <Divider />

          <Button 
            type="primary" 
            htmlType="submit" 
            loading={checkoutLoading}
            size="large"
            className="w-full bg-blue-600 hover:bg-blue-500 font-bold h-12"
          >
            Xác nhận Đặt hàng - {formatCurrency(cartTotal)}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
