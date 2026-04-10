import React from 'react';
import { Outlet } from 'react-router-dom';
import { StoreHeader, StoreNavbar, StoreFooter } from './public';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* ========= HEADER + NAVBAR (sticky) ========= */}
      <div
        className="sticky top-0 z-50 w-full"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
      >
        <StoreHeader />
        <StoreNavbar />
      </div>

      {/* ========= CONTENT ========= */}
      <main className="flex-1 bg-gray-100 pb-16">
        <Outlet />
      </main>

      {/* ========= FOOTER ========= */}
      <StoreFooter />
    </div>
  );
};
