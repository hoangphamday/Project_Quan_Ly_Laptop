import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from './Storefront';
import { Empty } from 'antd';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const stored = localStorage.getItem('all_products');
    let allProducts = [];
    if (stored) {
      try {
        allProducts = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }

    if (q) {
      const keyword = q.toLowerCase();
      const filtered = allProducts.filter((p: any) => 
        (p.tenLaptop && p.tenLaptop.toLowerCase().includes(keyword)) ||
        (p.maLaptop && p.maLaptop.toLowerCase().includes(keyword)) ||
        (p.maHang && p.maHang.toLowerCase().includes(keyword))
      );
      
      // Chuyển đổi định dạng để hiển thị trên ProductCard
      const mapped = filtered.map((p: any) => ({
        id: p.maLaptop,
        name: p.tenLaptop,
        image: p.duongDanAnh || 'https://via.placeholder.com/300x200?text=Laptop',
        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.gia || 0),
      }));
      setResults(mapped);
    } else {
      setResults([]);
    }
  }, [q]);

  return (
    <div className="w-full bg-slate-100 min-h-screen pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="bg-white rounded overflow-hidden shadow-sm border border-slate-200 mt-8">
          <div className="flex items-center border-b border-slate-200 p-4">
            <h2 className="text-xl font-bold text-slate-800 m-0">
              Kết quả tìm kiếm cho: <span className="text-blue-600">"{q}"</span>
            </h2>
          </div>
          <div className="p-4 bg-slate-50 min-h-[400px]">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full pt-10">
                <Empty description={`Không tìm thấy sản phẩm nào phù hợp với "${q}"`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
