import React from 'react';
import { PhoneFilled } from '@ant-design/icons';
import styles from './StoreFooter.module.css';

export const StoreFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Col 1 - Thông tin công ty */}
        <div>
          <h4 className={styles.colTitle}>CÔNG TY TNHH LAPTOP VIỆT NAM</h4>
          <div className={styles.companyInfo}>
            <p>Địa chỉ: Số 64, Đỗ Thế Diên, Nhân Hòa, Mỹ Hào, Hưng Yên</p>
            <p>Hotline: 0969 630 275</p>
            <p>Email: hoangpham150104@gmail.com</p>
          </div>
          <div className={styles.socialRow}>
            <div className={`${styles.socialIcon} ${styles.socialFacebook}`}>f</div>
            <div className={`${styles.socialIcon} ${styles.socialYoutube}`}>▶</div>
            <div className={`${styles.socialIcon} ${styles.socialTiktok}`}>TikTok</div>
          </div>
        </div>

        {/* Col 2 - Thông tin */}
        <div>
          <h4 className={styles.colTitle}>THÔNG TIN CÔNG TY</h4>
          <ul className={styles.linkList}>
            {['Giới thiệu công ty', 'Tuyển dụng', 'Gửi góp ý, khiếu nại'].map(t => (
              <li key={t} className={styles.linkItem}><a href="#">{t}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 3 - Chính sách */}
        <div>
          <h4 className={styles.colTitle}>CHÍNH SÁCH CÔNG TY</h4>
          <ul className={styles.linkList}>
            {[
              'Chính sách chất lượng',
              'Chính sách bảo hành - bảo trì',
              'Chính sách đổi trả',
              'Chính sách bảo mật thông tin',
              'Chính sách vận chuyển',
              'Chính sách vệ sinh Laptop',
              'Hướng dẫn mua hàng - thanh toán',
            ].map(t => (
              <li key={t} className={styles.linkItem}><a href="#">{t}</a></li>
            ))}
          </ul>
        </div>

        {/* Col 4 - Hệ thống cửa hàng */}
        <div>
          <div className={styles.hotlineBox}>
            <PhoneFilled className={styles.hotlineIcon} />
            <div>
              <div className={styles.hotlineLabel}>HOTLINE</div>
              <div className={styles.hotlineNumber}>0969 630 275</div>
            </div>
          </div>
          <h4 className={styles.colTitle}>HỆ THỐNG CỬA HÀNG</h4>
          <div className={styles.storeInfo}>
            <div className={styles.storeName}>Laptop Hoang Anh cơ sở Hưng Yên</div>
            <p>Số 64 Đỗ thế Diên, Nhân Hòa, Mỹ Hào, Hưng yên</p>
            <div className={styles.storeNameSecond}>Laptop Hoang Anh cơ sở Hà Đông</div>
            <p>Số 56 Trần Phú, Hà Đông, Hà Nội</p>
            <p style={{ marginTop: 6 }}>Bán hàng: 8h30 - 21h30</p>
            <p>Kỹ thuật: 8h30-12h &amp; 13h30-17h30</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
