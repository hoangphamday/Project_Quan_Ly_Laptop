import React from 'react';
import { Input, Badge } from 'antd';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  PhoneFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './StoreHeader.module.css';

export const StoreHeader: React.FC = () => {
  const navigate = useNavigate();

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
            <Input
              placeholder="Bạn cần tìm sản phẩm gì..."
              variant="borderless"
              className={styles.searchInput}
              style={{ flex: 1 }}
            />
            <button className={styles.searchBtn}>
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
            <Badge count={0} showZero color="#ef4444" size="default" offset={[3, -3]}>
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

          {/* Login */}
          <div className={styles.iconGroup} onClick={() => navigate('/login')}>
            <div className={`${styles.iconBubble} ${styles.iconBubbleGray}`}>
              <UserOutlined />
            </div>
            <div className={styles.iconLabel}>
              <span className={styles.iconLabelTop}>Tài khoản</span>
              <span className={`${styles.iconLabelBottom} ${styles.iconLabelBottomBlue}`}>Đăng nhập</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
