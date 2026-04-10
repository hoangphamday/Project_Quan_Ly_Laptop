import { Card, Tag } from 'antd';
import { BannerSection } from './BannerSection';
import { FireFilled } from '@ant-design/icons';


// Mock store products replicating the UI
import { flashSaleProducts, officeProducts, gamingProducts, graphicsProducts, macbookProducts } from './mockData';

import { Link } from 'react-router-dom';

const ProductCard = ({ product, showStock = false }: { product: any, showStock?: boolean }) => (
  <Link to={`/product/${product.id}`} className="block h-full group">
    <Card
      bordered={true}
      hoverable
      className="rounded border border-slate-200 overflow-hidden h-full flex flex-col"
      bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}
    >
    <div className="relative mb-4 h-48 flex items-center justify-center">
      {product.discount && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 w-10 h-10 flex items-center justify-center text-center leading-tight">
          {product.discount}
        </div>
      )}
      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
    </div>

    <div className="flex-1 flex flex-col">
      <div className="text-sm text-slate-700 line-clamp-3 mb-4 min-h-[60px] font-medium leading-relaxed">
        {product.name}
      </div>

      <div className="mt-auto">
        <div className="flex items-end gap-3 mb-3">
          <div className="text-red-600 font-bold text-lg">{product.price}</div>
          {product.oldPrice && <div className="text-slate-400 line-through text-sm mb-0.5">{product.oldPrice}</div>}
        </div>

        {!showStock && (
          <div className="mt-2">
            <Tag color="#ebf8f2" className="text-blue-500 border-none font-bold m-0 px-2 rounded-sm italic">New 100%</Tag>
          </div>
        )}

        {showStock && (
          <div className="relative h-6 bg-red-100 rounded-full overflow-hidden flex items-center">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full" style={{ width: `${(product.stockLeft / 10) * 100}%` }}></div>
            <div className="relative z-10 w-full text-center text-xs text-slate-800 font-bold flex justify-between px-3">
              <span>Còn lại {product.stockLeft}</span>
              <span className="bg-orange-500 text-white px-1 rounded-sm text-[10px] uppercase flex items-center shadow-sm">Hot <FireFilled className="ml-1" /></span>
            </div>
          </div>
        )}
      </div>
    </div>
  </Card>
  </Link>
);

export const Storefront: React.FC = () => {
  return (
    <div className="w-full bg-slate-100 min-h-screen pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">

        <BannerSection />

        {/* GIỜ VÀNG GIÁ SỐC */}
        <div className="bg-white rounded border border-red-500 overflow-hidden shadow-sm">
          <div className="bg-red-600 text-white p-3 flex justify-between items-center bg-gradient-to-r from-red-600 to-red-500">
            <div className="flex items-center gap-3">
              <FireFilled className="text-2xl text-yellow-300" />
              <span className="text-xl font-bold uppercase tracking-wider">Giờ Vàng Giá Sốc</span>
              <div className="flex items-center gap-2 ml-4 text-sm font-medium">
                <span>Còn lại</span>
                <div className="flex gap-1">
                  <span className="bg-black text-white px-2 py-1 rounded">27</span> ngày
                  <span className="bg-black text-white px-2 py-1 rounded">14</span> giờ
                  <span className="bg-black text-white px-2 py-1 rounded">46</span> phút
                  <span className="bg-black text-white px-2 py-1 rounded">16</span> giây
                </div>
              </div>
            </div>
            <a href="#" className="text-white hover:text-yellow-200 text-sm flex items-center gap-1 font-medium">
              Xem tất cả &gt;
            </a>
          </div>
          <div className="p-4 bg-red-50/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {flashSaleProducts.map(p => <ProductCard key={p.id} product={p} showStock={true} />)}
            </div>
          </div>
        </div>

        {/* HỌC TẬP - VĂN PHÒNG */}
        <div className="bg-white rounded overflow-hidden shadow-sm border border-slate-200 mt-8">
          <div className="flex items-center border-b border-slate-200">
            <div className="bg-blue-500 text-white font-bold text-lg uppercase px-8 py-3 w-fit tracking-wide" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}>
              Học Tập - Văn Phòng
            </div>
            <div className="flex items-center ml-2 text-sm">
              <span className="font-bold text-slate-800 mr-2 ml-4">Mức giá:</span>
              <div className="flex gap-4 text-blue-500 font-medium">
                <a href="#" className="hover:text-blue-700">5 TRIỆU - 10 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">10 TRIỆU - 20 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">20 TRIỆU - 30 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">30 TRIỆU - 40 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">TRÊN 40 TRIỆU</a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {officeProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>

        {/* LAPTOP GAMING */}
        <div className="bg-white rounded overflow-hidden shadow-sm border border-slate-200 mt-8">
          <div className="flex items-center border-b border-slate-200">
            <div className="bg-blue-500 text-white font-bold text-lg uppercase px-8 py-3 w-fit tracking-wide" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}>
              Laptop Gaming
            </div>
            <div className="flex items-center ml-2 text-sm shrink-0 overflow-x-auto whitespace-nowrap hidden md:flex">
              <span className="font-bold text-slate-800 mr-2 mx-4">Mức giá:</span>
              <div className="flex gap-4 text-blue-500 font-medium">
                <a href="#" className="hover:text-blue-700">5 TRIỆU - 10 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">10 TRIỆU - 20 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">20 TRIỆU - 30 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">30 TRIỆU - 40 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">40 TRIỆU - 50 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">TRÊN 50 TRIỆU</a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gamingProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>

        {/* LAPTOP ĐỒ HỌA */}
        <div className="bg-white rounded overflow-hidden shadow-sm border border-slate-200 mt-8">
          <div className="flex items-center border-b border-slate-200">
            <div className="bg-blue-500 text-white font-bold text-lg uppercase px-8 py-3 w-fit tracking-wide" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}>
              Laptop Đồ Họa
            </div>
            <div className="flex items-center ml-2 text-sm shrink-0 overflow-x-auto whitespace-nowrap hidden md:flex">
              <span className="font-bold text-slate-800 mr-2 mx-4">Mức giá:</span>
              <div className="flex gap-4 text-blue-500 font-medium">
                <a href="#" className="hover:text-blue-700">5 TRIỆU - 10 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">10 TRIỆU - 20 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">20 TRIỆU - 30 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">30 TRIỆU - 40 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">40 TRIỆU - 50 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">TRÊN 50 TRIỆU</a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {graphicsProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
        {/* LAPTOP MACBOOK */}
        <div className="bg-white rounded overflow-hidden shadow-sm border border-slate-200 mt-8">
          <div className="flex items-center border-b border-slate-200">
            <div className="bg-blue-500 text-white font-bold text-lg uppercase px-8 py-3 w-fit tracking-wide" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}>
              Laptop MACBOOK
            </div>
            <div className="flex items-center ml-2 text-sm shrink-0 overflow-x-auto whitespace-nowrap hidden md:flex">
              <span className="font-bold text-slate-800 mr-2 mx-4">Mức giá:</span>
              <div className="flex gap-4 text-blue-500 font-medium">
                <a href="#" className="hover:text-blue-700">5 TRIỆU - 10 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">10 TRIỆU - 20 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">20 TRIỆU - 30 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">30 TRIỆU - 40 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">40 TRIỆU - 50 TRIỆU</a>
                <a href="#" className="hover:text-blue-700">TRÊN 50 TRIỆU</a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {macbookProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
