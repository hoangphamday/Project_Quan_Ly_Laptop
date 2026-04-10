import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

// Layouts
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Features
import { Dashboard } from './features/dashboard/Dashboard';
import { ProductList } from './features/products/ProductList';
import { Storefront } from './features/storefront/Storefront';
import { ProductDetail } from './features/storefront/ProductDetail';
import { Login } from './features/auth/Login';
import { OrderList } from './features/orders/OrderList';
import { CustomerList } from './features/customers/CustomerList';
import { Settings } from './features/settings/Settings';
import { SupplierList } from './features/suppliers/SupplierList';
import { ImportList } from './features/imports/ImportList';

// Main App Component
const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          fontFamily: 'Inter, system-ui, sans-serif',
          borderRadius: 8,
        },
        components: {
          Card: {
            headerBg: 'transparent',
            paddingLG: 24,
          },
          Table: {
            headerBg: '#f8fafc',
            headerColor: '#475569',
            rowHoverBg: '#f1f5f9',
          }
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Storefront />} />
            <Route path="store/laptops" element={<Storefront />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="laptops" element={<ProductList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="suppliers" element={<SupplierList />} />
            <Route path="imports" element={<ImportList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
