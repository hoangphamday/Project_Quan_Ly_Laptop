import React from 'react';
import { BannerSlideshow } from './BannerSlideshow';

export const BannerSection: React.FC = () => {
  return (
    <>
      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BannerSlideshow />
        <div className="flex flex-col gap-4">
          <div className="h-[167px] bg-white rounded overflow-hidden border border-slate-200">
            <img src="/MuaHangOn.jpg" className="w-full h-full object-cover" alt="Hướng dẫn mua hàng" />
          </div>
          <div className="h-[167px] bg-white rounded overflow-hidden border border-slate-200">
            <img src="/DanhGia.jpg" className="w-full h-full object-cover" alt="Cảm nhận khách hàng" />
          </div>
        </div>
      </div>

      {/* Co so Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-500 rounded p-4 text-white flex items-center border-l-4 border-white shadow-sm border border-blue-600">
          <div className="w-14 h-14 border-2 border-white rounded flex items-center justify-center flex-col shrink-0">
            <span className="text-xs font-medium">Cơ</span>
            <span className="text-xl font-bold leading-none">Sở <span className="text-2xl">1</span></span>
          </div>
          <div className="ml-4 font-bold text-xl uppercase tracking-wide">
            Số 64 Đỗ Thế Diên - Nhân Hòa<br />Mỹ Hào - Hưng Yên
          </div>
        </div>
        <div className="bg-blue-500 rounded p-4 text-white flex items-center border-l-4 border-white shadow-sm border border-blue-600">
          <div className="w-14 h-14 border-2 border-white rounded flex items-center justify-center flex-col shrink-0">
            <span className="text-xs font-medium">Cơ</span>
            <span className="text-xl font-bold leading-none">Sở <span className="text-2xl">2</span></span>
          </div>
          <div className="ml-4 font-bold text-xl uppercase tracking-wide">
            Số 56 Trần Phú<br />Hà Đông - Hà Nội
          </div>
        </div>
      </div>
    </>
  );
};
