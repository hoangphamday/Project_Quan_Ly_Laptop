CREATE DATABASE Project_Laptop
GO

USE Project_Laptop
GO

-- 1. Bảng Tài Khoản
CREATE TABLE TaiKhoan (
    MaTK NVARCHAR(50) PRIMARY KEY, -- Ví dụ: TK_ADMIN, TK_USER01
    TenDangNhap VARCHAR(50) UNIQUE NOT NULL,
    MatKhau VARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    TrangThai BIT DEFAULT 1,
    NgayTao DATETIME DEFAULT GETDATE()
)

-- 2. Bảng Nhân Viên
CREATE TABLE NhanVien (
    MaNV NVARCHAR(50) PRIMARY KEY, -- Ví dụ: NV001
    TenNV NVARCHAR(150),
    DienThoai VARCHAR(15),
    Email VARCHAR(100),
    ChucVu NVARCHAR(50),
    NgaySinh DATE,
    NgayVaoLam DATE,
    MaTK NVARCHAR(50),
    FOREIGN KEY (MaTK) REFERENCES TaiKhoan(MaTK)
)

-- 3. Bảng Khách Hàng
CREATE TABLE KhachHang (
    MaKH NVARCHAR(50) PRIMARY KEY, -- Ví dụ: KH_ANH99
    TenKH NVARCHAR(150),
    DienThoai VARCHAR(15),
    Email VARCHAR(100),
    DiaChi NVARCHAR(200),
    NgayDangKy DATETIME DEFAULT GETDATE(),
    MaTK NVARCHAR(50),
    FOREIGN KEY (MaTK) REFERENCES TaiKhoan(MaTK)
)

-- 4. Bảng Hãng Laptop
CREATE TABLE HangLaptop (
    MaHang NVARCHAR(50) PRIMARY KEY, -- Ví dụ: DELL, ASUS, MACBOOK
    TenHang NVARCHAR(100),
    QuocGia NVARCHAR(100)
)

-- 5. Bảng Laptop
CREATE TABLE Laptop (
    MaLaptop NVARCHAR(50) PRIMARY KEY, -- Ví dụ: LPT_XPS13
    TenLaptop NVARCHAR(200),
    MaHang NVARCHAR(50),
    CPU NVARCHAR(100),
    RAM NVARCHAR(50),
    SSD NVARCHAR(50),
    GPU NVARCHAR(100),
    ManHinh NVARCHAR(50),
    Gia DECIMAL(18,2),
    SoLuong INT,
    BaoHanh INT,
    MoTa NVARCHAR(500),
    NgayThem DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaHang) REFERENCES HangLaptop(MaHang)
)

-- 6. Bảng Hình Ảnh Laptop
CREATE TABLE HinhAnhLaptop (
    MaHinh NVARCHAR(50) PRIMARY KEY,
    MaLaptop NVARCHAR(50),
    DuongDanAnh NVARCHAR(255),
    FOREIGN KEY (MaLaptop) REFERENCES Laptop(MaLaptop)
)

-- 7. Bảng Nhà Cung Cấp
CREATE TABLE NhaCungCap (
    MaNCC NVARCHAR(50) PRIMARY KEY, -- Ví dụ: NCC_FPT
    TenNCC NVARCHAR(150),
    DienThoai VARCHAR(15),
    Email VARCHAR(100),
    DiaChi NVARCHAR(200)
)

-- 8. Bảng Phiếu Nhập
CREATE TABLE PhieuNhap (
    MaPhieuNhap NVARCHAR(50) PRIMARY KEY,
    MaNCC NVARCHAR(50),
    MaNV NVARCHAR(50),
    NgayNhap DATETIME DEFAULT GETDATE(),
    TongTien DECIMAL(18,2),
    GhiChu NVARCHAR(300),
    FOREIGN KEY (MaNCC) REFERENCES NhaCungCap(MaNCC),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
)

-- 9. Bảng Chi Tiết Phiếu Nhập
CREATE TABLE ChiTietPhieuNhap (
    MaCTPN NVARCHAR(50) PRIMARY KEY,
    MaPhieuNhap NVARCHAR(50),
    MaLaptop NVARCHAR(50),
    SoLuong INT,
    GiaNhap DECIMAL(18,2),
    FOREIGN KEY (MaPhieuNhap) REFERENCES PhieuNhap(MaPhieuNhap),
    FOREIGN KEY (MaLaptop) REFERENCES Laptop(MaLaptop)
)

-- 10. Bảng Đơn Hàng
CREATE TABLE DonHang (
    MaDonHang NVARCHAR(50) PRIMARY KEY,
    MaKH NVARCHAR(50),
    MaNV NVARCHAR(50),
    NgayDat DATETIME DEFAULT GETDATE(),
    TongTien DECIMAL(18,2),
    TrangThai NVARCHAR(50),
    DiaChiGiaoHang NVARCHAR(200),
    PhuongThucThanhToan NVARCHAR(50),
    GhiChu NVARCHAR(300),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
)

-- 11. Bảng Chi Tiết Đơn Hàng
CREATE TABLE ChiTietDonHang (
    MaCTDH NVARCHAR(50) PRIMARY KEY,
    MaDonHang NVARCHAR(50),
    MaLaptop NVARCHAR(50),
    SoLuong INT,
    DonGia DECIMAL(18,2),
    ThanhTien DECIMAL(18,2),
    FOREIGN KEY (MaDonHang) REFERENCES DonHang(MaDonHang),
    FOREIGN KEY (MaLaptop) REFERENCES Laptop(MaLaptop)
)

-- 12. Bảng Giỏ Hàng
CREATE TABLE GioHang (
    MaGioHang NVARCHAR(50) PRIMARY KEY,
    MaKH NVARCHAR(50),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
)

-- 13. Bảng Chi Tiết Giỏ Hàng
CREATE TABLE ChiTietGioHang (
    MaCTGH NVARCHAR(50) PRIMARY KEY,
    MaGioHang NVARCHAR(50),
    MaLaptop NVARCHAR(50),
    SoLuong INT,
    FOREIGN KEY (MaGioHang) REFERENCES GioHang(MaGioHang),
    FOREIGN KEY (MaLaptop) REFERENCES Laptop(MaLaptop)
)

-- 14. Bảng Đánh Giá
CREATE TABLE DanhGia (
    MaDanhGia NVARCHAR(50) PRIMARY KEY,
    MaLaptop NVARCHAR(50),
    MaKH NVARCHAR(50),
    SoSao INT,
    NoiDung NVARCHAR(500),
    NgayDanhGia DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaLaptop) REFERENCES Laptop(MaLaptop),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
)



------------------------------------------------------------------------------------------------------------------------------------------
-- 1. Bảng Laptop: Chặn giá âm, số lượng âm
ALTER TABLE Laptop
ADD CONSTRAINT CHK_Laptop_Gia CHECK (Gia >= 0),
    CONSTRAINT CHK_Laptop_SoLuong CHECK (SoLuong >= 0);

-- 2. Bảng Đánh Giá: Chặn số sao ngoài khoảng 1-5
ALTER TABLE DanhGia
ADD CONSTRAINT CHK_DanhGia_Sao CHECK (SoSao BETWEEN 1 AND 5);

-- 3. Bảng ChiTietDonHang: Tự động tính Thành Tiền
-- Lưu ý: Phải xóa cột cũ trước nếu đã tạo bảng
ALTER TABLE ChiTietDonHang DROP COLUMN ThanhTien;
ALTER TABLE ChiTietDonHang ADD ThanhTien AS (SoLuong * DonGia) PERSISTED;

-- 4. Bảng ChiTietPhieuNhap: Chặn giá nhập âm
ALTER TABLE ChiTietPhieuNhap
ADD CONSTRAINT CHK_CTPN_GiaNhap CHECK (GiaNhap >= 0);

-- 5. Bổ sung UNIQUE cho Email (Tránh 2 nhân viên/khách hàng dùng chung 1 email)
ALTER TABLE NhanVien ADD CONSTRAINT UQ_NV_Email UNIQUE (Email);
ALTER TABLE KhachHang ADD CONSTRAINT UQ_KH_Email UNIQUE (Email);




--------------------------------------------------------------------------------------------------------------------------------