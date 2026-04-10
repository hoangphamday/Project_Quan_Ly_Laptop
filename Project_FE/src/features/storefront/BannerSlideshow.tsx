import React from 'react';
import { Carousel } from 'antd';

export const BannerSlideshow: React.FC = () => {
  return (
    <div className="md:col-span-2 h-[350px] bg-slate-900 rounded overflow-hidden relative group">
      <Carousel autoplay effect="fade" autoplaySpeed={3000}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div key={num} className="h-[350px] w-full relative outline-none">
            <img
              src={`/slide1_${num}.jpg`}
              className="w-full h-full object-cover"
              alt={`Banner ${num}`}
            />
            {/* Overlay shadow at bottom to make any text readable if needed in the future */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
