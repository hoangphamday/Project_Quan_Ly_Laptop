USE Project_Laptop
GO

-- ============================================================
-- 1. TaiKhoan
-- ============================================================
-- Role chuẩn hóa: 'Admin', 'NhanVien', 'KhachHang' (phải khớp với [Authorize(Roles = "...")])
INSERT INTO TaiKhoan (MaTK, TenDangNhap, MatKhau, Role, TrangThai)
VALUES
('TK001', 'admin',  '12345', 'Admin',      1),
('TK002', 'nv01',   '12345', 'NhanVien',   1),
('TK003', 'nv02',   '12345', 'NhanVien',   1),
('TK004', 'nv03',   '12345', 'NhanVien',   1),
('TK005', 'nv04',   '12345', 'NhanVien',   1),
('TK006', 'nv05',   '12345', 'NhanVien',   1),
('TK007', 'kh01',   '12345', 'KhachHang',  1),
('TK008', 'kh02',   '12345', 'KhachHang',  1),
('TK009', 'kh03',   '12345', 'KhachHang',  1),
('TK010', 'kh04',   '12345', 'KhachHang',  1),
('TK011', 'kh05',   '12345', 'KhachHang',  1),
('TK012', 'kh06',   '12345', 'KhachHang',  1),
('TK013', 'kh07',   '12345', 'KhachHang',  1),
('TK014', 'kh08',   '12345', 'KhachHang',  1),
('TK015', 'kh09',   '12345', 'KhachHang',  1),
('TK016', 'kh10',   '12345', 'KhachHang',  1),
('TK017', 'kh11',   '12345', 'KhachHang',  1),
('TK018', 'kh12',   '12345', 'KhachHang',  1),
('TK019', 'kh13',   '12345', 'KhachHang',  1),
('TK020', 'kh14',   '12345', 'KhachHang',  1);
GO
SELECT * FROM TaiKhoan
-- ============================================================
-- 2. NhanVien
-- ============================================================
INSERT INTO NhanVien (MaNV, TenNV, DienThoai, Email, ChucVu, NgaySinh, NgayVaoLam, MaTK)
VALUES
('NV01', N'Nguyễn Văn An',   '0900000001', 'nv1@gmail.com', N'Bán hàng', '1998-01-15', '2022-03-01', 'TK002'),
('NV02', N'Trần Thị Bình',   '0900000002', 'nv2@gmail.com', N'Kho',       '1997-05-20', '2022-03-02', 'TK003'),
('NV03', N'Lê Văn Cường',    '0900000003', 'nv3@gmail.com', N'Kỹ thuật', '1996-08-10', '2022-04-01', 'TK004'),
('NV04', N'Phạm Thị Dung',   '0900000004', 'nv4@gmail.com', N'Bán hàng', '1999-03-25', '2023-01-10', 'TK005'),
('NV05', N'Hoàng Văn Em',    '0900000005', 'nv5@gmail.com', N'Quản lý',  '1990-11-30', '2020-06-15', 'TK006');
GO

-- ============================================================
-- 3. KhachHang
-- ============================================================
INSERT INTO KhachHang (MaKH, TenKH, DienThoai, Email, DiaChi, NgayDangKy, MaTK)
VALUES
('KH01', N'Nguyễn Minh Anh',  '0911111111', 'kh1@gmail.com',  N'12 Lê Lợi, Hải Phòng',         '2023-01-05', 'TK007'),
('KH02', N'Trần Quốc Bảo',    '0911111112', 'kh2@gmail.com',  N'45 Trần Hưng Đạo, Hà Nội',      '2023-02-10', 'TK008'),
('KH03', N'Lê Thị Cẩm',       '0911111113', 'kh3@gmail.com',  N'78 Nguyễn Huệ, Hải Dương',      '2023-03-15', 'TK009'),
('KH04', N'Phạm Văn Dũng',    '0911111114', 'kh4@gmail.com',  N'20 Hoàng Văn Thụ, Hà Nam',      '2023-04-20', 'TK010'),
('KH05', N'Hoàng Thị Ém',     '0911111115', 'kh5@gmail.com',  N'33 Bà Triệu, Hưng Yên',         '2023-05-05', 'TK011'),
('KH06', N'Vũ Đình Giang',    '0911111116', 'kh6@gmail.com',  N'55 Điện Biên Phủ, Hải Phòng',   '2023-06-01', 'TK012'),
('KH07', N'Đặng Thị Hồng',    '0911111117', 'kh7@gmail.com',  N'9 Phan Chu Trinh, Hà Nội',      '2023-07-12', 'TK013'),
('KH08', N'Bùi Văn Khoa',     '0911111118', 'kh8@gmail.com',  N'101 Trần Phú, Hải Dương',       '2023-08-18', 'TK014'),
('KH09', N'Ngô Thị Lan',      '0911111119', 'kh9@gmail.com',  N'67 Lý Thường Kiệt, Hà Nam',     '2023-09-22', 'TK015'),
('KH10', N'Trịnh Văn Mạnh',   '0911111120', 'kh10@gmail.com', N'14 Ngô Quyền, Hưng Yên',        '2023-10-30', 'TK016'),
('KH11', N'Phan Thị Ngọc',    '0911111121', 'kh11@gmail.com', N'28 Hùng Vương, Đà Nẵng',        '2023-11-11', 'TK017'),
('KH12', N'Lưu Văn Oai',      '0911111122', 'kh12@gmail.com', N'5 Trường Chinh, TP.HCM',        '2023-12-01', 'TK018'),
('KH13', N'Lý Thị Phương',    '0911111123', 'kh13@gmail.com', N'88 Cách Mạng Tháng 8, Cần Thơ','2024-01-05', 'TK019'),
('KH14', N'Đỗ Văn Quang',     '0911111124', 'kh14@gmail.com', N'3 Lê Văn Sỹ, Bình Dương',       '2024-02-14', 'TK020');
GO

-- ============================================================
-- 4. HangLaptop
-- Lưu ý: APPLE được thêm để khớp với 3 laptop MacBook (L11, L12, L16)
-- ============================================================
INSERT INTO HangLaptop (MaHang, TenHang, QuocGia)
VALUES
('DELL',    N'Dell',    N'Mỹ'),
('ASUS',    N'Asus',    N'Đài Loan'),
('HP',      N'HP',      N'Mỹ'),
('APPLE',   N'Apple',   N'Mỹ'),
('ACER',    N'Acer',    N'Mỹ'),
('LENOVO',  N'Lenovo',  N'Trung Quốc'),
('MACBOOK', N'MacBook', N'Mỹ');
GO
select*from HangLaptop
-- ============================================================
-- 5. Laptop (19 sản phẩm – khớp với product_1 đến product_19)
-- ============================================================
INSERT INTO Laptop (MaLaptop, TenLaptop, MaHang, CPU, RAM, SSD, GPU, ManHinh, Gia, SoLuong, BaoHanh, MoTa)
VALUES
-- Gaming
('L01', N'Asus ROG Strix G17',       'ASUS',   'Intel Core i9-13900H', '32GB DDR5', '1TB NVMe',  'NVIDIA RTX 4070', '17.3" FHD 240Hz', 45000000, 10, 24, N'Laptop gaming cao cấp, màn hình 240Hz, hiệu năng đỉnh cao'),
('L02', N'Dell G15 5530',            'DELL',   'Intel Core i7-13650HX', '16GB DDR5', '512GB NVMe','NVIDIA RTX 3060', '15.6" FHD 120Hz', 27000000, 15, 24, N'Laptop gaming phổ thông, thiết kế chắc chắn, tản nhiệt tốt'),
('L03', N'HP Omen 16',               'HP',     'Intel Core i7-13700HX', '16GB DDR5', '1TB NVMe',  'NVIDIA RTX 3070', '16" QHD 165Hz',   35000000,  8, 24, N'Laptop gaming màn hình QHD sắc nét, hiệu năng mạnh mẽ'),
('L04', N'Asus TUF Gaming F15',      'ASUS',   'Intel Core i5-12500H',  '16GB DDR4', '512GB NVMe','NVIDIA RTX 3050', '15.6" FHD 144Hz', 22000000, 20, 24, N'Laptop gaming tầm trung bền bỉ, giá tốt cho sinh viên'),
('L05', N'Lenovo Legion 5 Gen 8',    'LENOVO', 'AMD Ryzen 7 7745HX',    '16GB DDR5', '512GB NVMe','NVIDIA RTX 3060', '15.6" FHD 165Hz', 28000000, 12, 24, N'Laptop gaming AMD mạnh mẽ, bàn phím LED đẹp'),

-- Văn phòng / Học tập
('L06', N'Dell Inspiron 15 3530',    'DELL',   'Intel Core i5-1335U',   '8GB DDR4',  '512GB SSD', 'Intel Iris Xe',   '15.6" FHD',       18000000, 25, 12, N'Laptop văn phòng phổ thông, pin trâu, dùng cả ngày'),
('L07', N'HP Pavilion 14',           'HP',     'Intel Core i5-1235U',   '8GB DDR4',  '256GB SSD', 'Intel Iris Xe',   '14" FHD IPS',     15000000, 20, 12, N'Laptop mỏng nhẹ học tập, màn hình IPS chống chói'),
('L08', N'Asus Vivobook 15',         'ASUS',   'Intel Core i5-1235U',   '8GB DDR4',  '512GB SSD', 'Intel Iris Xe',   '15.6" FHD',       17000000, 18, 12, N'Laptop học tập đa năng, thiết kế trẻ trung nhiều màu sắc'),
('L09', N'Lenovo IdeaPad 3',         'LENOVO', 'Intel Core i3-1215U',   '8GB DDR4',  '256GB SSD', 'Intel UHD',       '15.6" FHD',       12000000, 30, 12, N'Laptop phổ thông giá rẻ, phù hợp học sinh sinh viên'),
('L10', N'Dell Vostro 15 3530',      'DELL',   'Intel Core i5-1335U',   '8GB DDR4',  '512GB SSD', 'Intel Iris Xe',   '15.6" FHD',       16000000, 22, 12, N'Laptop doanh nghiệp nhỏ, bảo mật vân tay, thiết kế thanh lịch'),

-- Mỏng nhẹ / Cao cấp
('L11', N'MacBook Air M1',           'APPLE',  'Apple M1',              '8GB',       '256GB SSD', 'Apple GPU 7-core','13.3" Retina',    25000000, 15, 12, N'Laptop mỏng nhẹ huyền thoại, pin 18 tiếng, không quạt'),
('L12', N'MacBook Air M2',           'APPLE',  'Apple M2',              '8GB',       '256GB SSD', 'Apple GPU 8-core','13.6" Liquid Retina', 28000000, 12, 12, N'MacBook mỏng nhất từ trước đến nay, màn hình Liquid Retina'),
('L13', N'Dell XPS 13 Plus',         'DELL',   'Intel Core i7-1260P',   '16GB LPDDR5','512GB NVMe','Intel Iris Xe',  '13.4" OLED FHD+', 32000000, 10, 12, N'Laptop cao cấp màn hình OLED, thiết kế sang trọng tối giản'),
('L14', N'HP Envy 13',               'HP',     'Intel Core i7-1255U',   '16GB LPDDR4x','512GB NVMe','Intel Iris Xe', '13.3" FHD IPS',   30000000,  9, 12, N'Laptop mỏng nhẹ cao cấp, loa B&O, màn hình sắc nét'),
('L15', N'Asus Zenbook 14 OLED',     'ASUS',   'Intel Core i7-1260P',   '16GB LPDDR5','512GB NVMe','Intel Iris Xe',  '14" 2.8K OLED',   29000000, 11, 12, N'Laptop OLED mỏng nhẹ, màu sắc chuẩn PANTONE, pin lâu'),

-- Đồ họa / Chuyên nghiệp
('L16', N'MacBook Pro M2 14"',       'APPLE',  'Apple M2 Pro',          '16GB',      '512GB SSD', 'Apple GPU 19-core','14" Liquid Retina XDR', 45000000, 8, 12, N'MacBook Pro chuyên nghiệp, màn hình XDR đỉnh cao, chip M2 Pro'),
('L17', N'Dell Precision 5570',      'DELL',   'Intel Core i9-12900H',  '32GB DDR5', '1TB NVMe',  'NVIDIA RTX A2000','15.6" FHD+',      50000000,  5, 24, N'Workstation di động chuyên nghiệp, đồ họa kỹ thuật nặng'),
('L18', N'HP ZBook Fury 15',         'HP',     'Intel Core i7-12800HX', '32GB DDR5', '1TB NVMe',  'NVIDIA RTX A3000','15.6" DreamColor 4K', 48000000,  6, 24, N'Workstation màn hình DreamColor 4K, dành cho thiết kế đồ họa'),
('L19', N'Asus ProArt Studiobook 16','ASUS',   'Intel Core i7-13700H',  '32GB DDR5', '1TB NVMe',  'NVIDIA RTX 3060', '16" OLED 4K',     40000000,  7, 24, N'Laptop đồ họa OLED 4K, dial xoay sáng tạo, màu chuẩn PANTONE');
GO
select * from Laptop
-- ============================================================
-- 6. HinhAnhLaptop
-- Mỗi laptop L01→L19 ánh xạ tới product_1.jpg → product_19.jpg
-- Đường dẫn lưu theo dạng tương đối dùng trong FE (/product_x.ext)
-- ============================================================
INSERT INTO HinhAnhLaptop (MaHinh, MaLaptop, DuongDanAnh)
VALUES
('HA01', 'L01', '/product_1.jpg'),
('HA02', 'L02', '/product_2.png'),
('HA03', 'L03', '/product_3.jpg'),
('HA04', 'L04', '/product_4.jpg'),
('HA05', 'L05', '/product_5.jpg'),
('HA06', 'L06', '/product_6.jpg'),
('HA07', 'L07', '/product_7.jpg'),
('HA08', 'L08', '/product_8.png'),
('HA09', 'L09', '/product_9.jpg'),
('HA10', 'L10', '/product_10.jpg'),
('HA11', 'L11', '/product_11.png'),
('HA12', 'L12', '/product_12.jpg'),
('HA13', 'L13', '/product_13.jpg'),
('HA14', 'L14', '/product_14.png'),
('HA15', 'L15', '/product_15.png'),
('HA16', 'L16', '/product_16.jpg'),
('HA17', 'L17', '/product_17.jpg'),
('HA18', 'L18', '/product_18.jpg'),
('HA19', 'L19', '/product_19.jpg');
GO
select * from HinhAnhLaptop
-- ============================================================
-- 7. NhaCungCap
-- ============================================================
INSERT INTO NhaCungCap (MaNCC, TenNCC, DienThoai, Email, DiaChi)
VALUES
('NCC01', N'FPT Retail',          '0243333001', 'supply@fpt.com.vn',       N'198 Trần Duy Hưng, Hà Nội'),
('NCC02', N'Synnex FPT',          '0243333002', 'supply@synnex.vn',        N'3/2 Cộng Hòa, TP.HCM'),
('NCC03', N'Digiworld Corp',      '0283333003', 'supply@digiworld.com.vn', N'Khu CNC Hòa Lạc, Hà Nội'),
('NCC04', N'An Khang Technology', '0283333004', 'supply@ankhang.vn',       N'25 Bạch Đằng, Đà Nẵng'),
('NCC05', N'Phong Vũ',            '0283333005', 'supply@phongvu.vn',       N'246 Cống Quỳnh, TP.HCM');
GO

-- ============================================================
-- 8. PhieuNhap
-- ============================================================
INSERT INTO PhieuNhap (MaPhieuNhap, MaNCC, MaNV, NgayNhap, TongTien, GhiChu)
VALUES
('PN01', 'NCC01', 'NV02', '2024-01-10', 297000000, N'Nhập hàng gaming đầu năm'),
('PN02', 'NCC02', 'NV02', '2024-02-05', 225000000, N'Nhập laptop văn phòng'),
('PN03', 'NCC03', 'NV03', '2024-03-12', 315000000, N'Nhập MacBook và laptop cao cấp'),
('PN04', 'NCC04', 'NV02', '2024-04-20', 290000000, N'Nhập workstation và đồ họa'),
('PN05', 'NCC05', 'NV04', '2024-05-15', 182000000, N'Nhập bổ sung hàng mùa tựu trường');
GO

-- ============================================================
-- 9. ChiTietPhieuNhap
-- ============================================================
INSERT INTO ChiTietPhieuNhap (MaCTPN, MaPhieuNhap, MaLaptop, SoLuong, GiaNhap)
VALUES
-- PN01: Gaming
('CTPN01', 'PN01', 'L01', 5, 42000000),
('CTPN02', 'PN01', 'L02', 8, 25000000),
('CTPN03', 'PN01', 'L05', 5, 26000000),
-- PN02: Văn phòng
('CTPN04', 'PN02', 'L06', 10, 16500000),
('CTPN05', 'PN02', 'L07', 8, 13800000),
('CTPN06', 'PN02', 'L09', 10, 11000000),
-- PN03: MacBook & Mỏng nhẹ
('CTPN07', 'PN03', 'L11', 5, 23000000),
('CTPN08', 'PN03', 'L12', 5, 26000000),
('CTPN09', 'PN03', 'L15', 6, 27000000),
-- PN04: Workstation
('CTPN10', 'PN04', 'L17', 3, 47000000),
('CTPN11', 'PN04', 'L18', 3, 45000000),
('CTPN12', 'PN04', 'L16', 4, 43000000),
-- PN05: Bổ sung
('CTPN13', 'PN05', 'L04', 8, 20000000),
('CTPN14', 'PN05', 'L08', 6, 15800000),
('CTPN15', 'PN05', 'L10', 5, 14800000);
GO

-- ============================================================
-- 10. DonHang
-- ============================================================
INSERT INTO DonHang (MaDonHang, MaKH, MaNV, NgayDat, TongTien, TrangThai, DiaChiGiaoHang, PhuongThucThanhToan, GhiChu)
VALUES
('DH01', 'KH01', 'NV01', '2024-03-01', 45000000, N'Đã giao',       N'12 Lê Lợi, Hải Phòng',          N'Tiền mặt',     N'Khách đặt nhanh'),
('DH02', 'KH02', 'NV01', '2024-03-05', 27000000, N'Đã giao',       N'45 Trần Hưng Đạo, Hà Nội',      N'Chuyển khoản', N''),
('DH03', 'KH03', 'NV04', '2024-03-10', 18000000, N'Đã giao',       N'78 Nguyễn Huệ, Hải Dương',      N'Tiền mặt',     N''),
('DH04', 'KH04', 'NV01', '2024-04-01', 28000000, N'Đã giao',       N'20 Hoàng Văn Thụ, Hà Nam',      N'Chuyển khoản', N'Tặng kèm chuột'),
('DH05', 'KH05', 'NV04', '2024-04-15', 25000000, N'Đã giao',       N'33 Bà Triệu, Hưng Yên',         N'Tiền mặt',     N''),
('DH06', 'KH06', 'NV01', '2024-05-02', 50000000, N'Đã giao',       N'55 Điện Biên Phủ, Hải Phòng',   N'Chuyển khoản', N'Khách VIP'),
('DH07', 'KH07', 'NV04', '2024-05-20', 35000000, N'Đã giao',       N'9 Phan Chu Trinh, Hà Nội',      N'Tiền mặt',     N''),
('DH08', 'KH08', 'NV01', '2024-06-01', 22000000, N'Đang xử lý',   N'101 Trần Phú, Hải Dương',       N'Chuyển khoản', N''),
('DH09', 'KH09', 'NV04', '2024-06-10', 29000000, N'Đang vận chuyển',N'67 Lý Thường Kiệt, Hà Nam',   N'Tiền mặt',     N''),
('DH10', 'KH10', 'NV01', '2024-06-15', 40000000, N'Đang xử lý',   N'14 Ngô Quyền, Hưng Yên',        N'Chuyển khoản', N'Giao trong ngày'),
('DH11', 'KH11', 'NV04', '2024-07-01', 12000000, N'Đã giao',       N'28 Hùng Vương, Đà Nẵng',        N'Tiền mặt',     N''),
('DH12', 'KH12', 'NV01', '2024-07-10', 48000000, N'Đã giao',       N'5 Trường Chinh, TP.HCM',        N'Chuyển khoản', N'Thanh toán trước'),
('DH13', 'KH13', 'NV04', '2024-08-05', 17000000, N'Đang xử lý',   N'88 Cách Mạng Tháng 8, Cần Thơ',N'Tiền mặt',     N''),
('DH14', 'KH14', 'NV01', '2024-08-20', 32000000, N'Đã hủy',        N'3 Lê Văn Sỹ, Bình Dương',       N'Chuyển khoản', N'KH đổi ý hủy đơn'),
('DH15', 'KH01', 'NV04', '2024-09-01', 30000000, N'Đã giao',       N'12 Lê Lợi, Hải Phòng',          N'Tiền mặt',     N'Mua lần 2');
GO
select * from DonHang
-- ============================================================
-- 11. ChiTietDonHang
-- Lưu ý: ThanhTien là cột COMPUTED (SoLuong * DonGia), KHÔNG insert
-- ============================================================
INSERT INTO ChiTietDonHang (MaCTDH, MaDonHang, MaLaptop, SoLuong, DonGia)
VALUES
('CT01',  'DH01', 'L01', 1, 45000000),
('CT02',  'DH02', 'L02', 1, 27000000),
('CT03',  'DH03', 'L06', 1, 18000000),
('CT04',  'DH04', 'L05', 1, 28000000),
('CT05',  'DH05', 'L11', 1, 25000000),
('CT06',  'DH06', 'L17', 1, 50000000),
('CT07',  'DH07', 'L03', 1, 35000000),
('CT08',  'DH08', 'L04', 1, 22000000),
('CT09',  'DH09', 'L15', 1, 29000000),
('CT10',  'DH10', 'L19', 1, 40000000),
('CT11',  'DH11', 'L09', 1, 12000000),
('CT12',  'DH12', 'L18', 1, 48000000),
('CT13',  'DH13', 'L08', 1, 17000000),
('CT14',  'DH14', 'L13', 1, 32000000),
('CT15',  'DH15', 'L14', 1, 30000000);
GO

-- ============================================================
-- 12. GioHang
-- ============================================================
INSERT INTO GioHang (MaGioHang, MaKH, NgayTao)
VALUES
('GH01', 'KH01', '2024-09-05'),
('GH02', 'KH02', '2024-09-06'),
('GH03', 'KH03', '2024-09-07'),
('GH04', 'KH04', '2024-09-08'),
('GH05', 'KH05', '2024-09-09'),
('GH06', 'KH06', '2024-09-10'),
('GH07', 'KH07', '2024-09-11'),
('GH08', 'KH08', '2024-09-12');
GO

-- ============================================================
-- 13. ChiTietGioHang
-- ============================================================
INSERT INTO ChiTietGioHang (MaCTGH, MaGioHang, MaLaptop, SoLuong)
VALUES
('CTGH01', 'GH01', 'L12', 1),
('CTGH02', 'GH01', 'L16', 1),
('CTGH03', 'GH02', 'L07', 1),
('CTGH04', 'GH02', 'L10', 1),
('CTGH05', 'GH03', 'L03', 1),
('CTGH06', 'GH04', 'L05', 2),
('CTGH07', 'GH05', 'L11', 1),
('CTGH08', 'GH06', 'L17', 1),
('CTGH09', 'GH07', 'L08', 1),
('CTGH10', 'GH08', 'L04', 1),
('CTGH11', 'GH08', 'L09', 1);
GO

-- ============================================================
-- 14. DanhGia
-- ============================================================
INSERT INTO DanhGia (MaDanhGia, MaLaptop, MaKH, SoSao, NoiDung, NgayDanhGia)
VALUES
('DG01', 'L01', 'KH01', 5, N'Máy cực mạnh, chơi game mượt mà, màn hình đẹp. Rất hài lòng!',                 '2024-03-10'),
('DG02', 'L02', 'KH02', 4, N'Laptop gaming giá tốt, tản nhiệt ổn, bàn phím gõ thoải mái.',                   '2024-03-12'),
('DG03', 'L06', 'KH03', 4, N'Dùng làm văn phòng rất ổn, pin trâu cả ngày, không cần sạc nhiều.',             '2024-03-20'),
('DG04', 'L05', 'KH04', 5, N'Hiệu năng AMD Ryzen cực tốt, giá hợp lý, bàn phím đèn LED đẹp.',               '2024-04-10'),
('DG05', 'L11', 'KH05', 5, N'MacBook Air M1 quá tuyệt, nhẹ, không quạt, pin 18 tiếng thật sự.',             '2024-04-25'),
('DG06', 'L17', 'KH06', 5, N'Workstation chuyên nghiệp, xử lý đồ họa 3D nhanh, màn hình rõ nét.',           '2024-05-15'),
('DG07', 'L03', 'KH07', 4, N'HP Omen màn hình QHD rất đẹp, chơi game tốt, nhưng máy hơi nóng.',             '2024-06-01'),
('DG08', 'L04', 'KH08', 3, N'Máy ổn với tầm giá, nhưng mong RAM nhiều hơn để chơi game tốt hơn.',           '2024-06-20'),
('DG09', 'L15', 'KH09', 5, N'Zenbook OLED đẹp xuất sắc, màu sắc hiển thị vượt trội, mỏng nhẹ dễ mang.',    '2024-07-05'),
('DG10', 'L19', 'KH10', 4, N'ProArt Studiobook màn OLED 4K cực nét, dial xoay hay, giá hơi cao.',           '2024-07-20'),
('DG11', 'L09', 'KH11', 4, N'IdeaPad giá rẻ mà dùng ổn lắm, phù hợp học sinh, nhẹ dễ mang đi học.',        '2024-08-10'),
('DG12', 'L18', 'KH12', 5, N'HP ZBook màn 4K DreamColor cực kỳ ấn tượng, đáng tiền đầu tư cho đồ họa.',    '2024-08-20'),
('DG13', 'L08', 'KH13', 3, N'Vivobook dùng học ổn, màn hình FHD sáng, nhưng loa hơi nhỏ.',                  '2024-09-01'),
('DG14', 'L01', 'KH01', 4, N'Mua lần 2 vẫn hài lòng, ROG vẫn là vua laptop gaming.',                        '2024-09-10'),
('DG15', 'L14', 'KH01', 5, N'HP Envy thiết kế sang trọng, loa B&O âm thanh hay, pin tốt.',                  '2024-09-15');
GO