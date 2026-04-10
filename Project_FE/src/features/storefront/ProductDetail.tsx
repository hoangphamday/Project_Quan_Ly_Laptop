import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Rate, Divider } from 'antd';
import { ShoppingCartOutlined, CreditCardOutlined, SafetyCertificateOutlined, SwapOutlined } from '@ant-design/icons';

import { getAllProducts } from './mockData';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const allProducts = getAllProducts();
  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Sản phẩm không tồn tại</h2>
          <Button type="primary" onClick={() => navigate('/')}>Quay lại trang chủ</Button>
        </div>
      </div>
    );
  }

  // Base specs based on name roughly for mock
  const isMac = product.name.toLowerCase().includes('macbook');
  const specs = [
    { label: 'CPU', value: isMac ? 'Apple M-Series' : 'Intel / AMD Latest Gen' },
    { label: 'RAM', value: product.name.includes('16GB') || product.name.includes('18GB') ? '16GB/18GB Unified' : '8GB/24GB' },
    { label: 'Ổ cứng', value: product.name.includes('1TB') ? '1TB SSD' : '256GB/512GB SSD' },
    { label: 'Màn hình', value: isMac ? 'Liquid Retina XDR' : 'FHD+ / 2.8K OLED' },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb simple */}
        <div className="text-slate-500 text-sm mb-6 flex gap-2 cursor-pointer">
          <span onClick={() => navigate('/')} className="hover:text-blue-600">Trang chủ</span>
          <span>/</span>
          <span onClick={() => navigate('/store/laptops')} className="hover:text-blue-600">Laptop</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Chi tiết sản phẩm</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-10">

          {/* Left: Image */}
          <div className="w-full md:w-5/12 flex flex-col gap-4">
            <div className="aspect-square bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt="Product"
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
            {/* Thumbnails (Mock) */}
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className={`w-1/4 aspect-square border rounded-md p-1 cursor-pointer hover:border-blue-500 ${idx === 1 ? 'border-blue-500' : 'border-slate-200'}`}>
                  <img src={product.image} className="w-full h-full object-cover" alt="Thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-7/12 flex flex-col">
            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
              <span>Mã SP: HW-{product.id}</span>
              <span className="text-green-600 font-medium">Tình trạng: Còn hàng</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="font-bold">5.0</span>
                <Rate disabled defaultValue={5} className="text-sm" />
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-blue-600 cursor-pointer">128 Đánh giá</span>
            </div>

            <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-100">
              <div className="flex items-end gap-4">
                <span className="text-3xl font-extrabold text-red-600">{product.price}</span>
                {product.oldPrice && <span className="text-lg text-slate-400 line-through mb-1">{product.oldPrice}</span>}
                {product.discount && <Tag color="#ef4444" className="mb-1 border-none font-bold">{product.discount}</Tag>}
              </div>
            </div>

            {/* Thông số kỹ thuật */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                {specs.map((spec, index) => (
                  <div key={index} className="flex flex-col py-1 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 mb-1">{spec.label}</span>
                    <span className="font-medium text-slate-800">{spec.value}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                Xem cấu hình chi tiết &gt;
              </a>
            </div>

            {/* Khuyến mãi & Bảo hành */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-green-700">
                <SafetyCertificateOutlined className="text-lg" />
                <span>Bảo hành chính hãng 12 tháng.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-700">
                <SwapOutlined className="text-lg" />
                <span>Lỗi 1 đổi 1 trong 30 ngày.</span>
              </div>
            </div>

            <Divider className="my-0 mb-6" />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="large"
                className="flex-1 h-14 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-lg rounded-xl flex items-center justify-center gap-2"
                icon={<ShoppingCartOutlined className="text-2xl" />}
              >
                THÊM GIỎ HÀNG
              </Button>
              <Button
                type="primary"
                size="large"
                className="flex-1 h-14 bg-red-600 hover:bg-red-500 font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-200 border-none"
                icon={<CreditCardOutlined className="text-xl" />}
                onClick={() => navigate('/cart')}
              >
                MUA NGAY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
