import React from 'react';
import {
  LaptopOutlined,
  PercentageOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './StoreNavbar.module.css';

const NAV_ITEMS = [
  { key: '/store/laptops', label: 'LAPTOP MỚI', icon: <LaptopOutlined /> },
  { key: '/store/likenew', label: 'LAPTOP LIKE NEW', icon: <LaptopOutlined /> },
  { key: '/store/promotions', label: 'KHUYẾN MÃI', icon: <PercentageOutlined /> },
  { key: '/store/installment', label: 'TRẢ GÓP', icon: <CreditCardOutlined /> },
];

export const StoreNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navInner}>
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`${styles.navBtn} ${active ? styles.navBtnActive : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
