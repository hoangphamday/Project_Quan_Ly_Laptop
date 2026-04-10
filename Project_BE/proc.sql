/* =========================
   1. TÀI KHOẢN
========================= */

CREATE PROC sp_TaiKhoan_Register
    @MaTK NVARCHAR(50),
    @TenDangNhap VARCHAR(50),
    @MatKhau VARCHAR(100),
    @Role NVARCHAR(20)
AS
BEGIN
    INSERT INTO TaiKhoan(MaTK, TenDangNhap, MatKhau, Role)
    VALUES (@MaTK, @TenDangNhap, @MatKhau, @Role)
END
GO

CREATE PROC sp_TaiKhoan_Login
    @TenDangNhap VARCHAR(50),
    @MatKhau VARCHAR(100)
AS
BEGIN
    SELECT * 
    FROM TaiKhoan
    WHERE TenDangNhap = @TenDangNhap 
      AND MatKhau = @MatKhau
      AND TrangThai = 1
END
GO


/* =========================
   2. KHÁCH HÀNG
========================= */

CREATE PROC sp_KhachHang_Create
    @MaKH NVARCHAR(50),
    @TenKH NVARCHAR(150),
    @DienThoai VARCHAR(15),
    @Email VARCHAR(100),
    @DiaChi NVARCHAR(200),
    @MaTK NVARCHAR(50)
AS
BEGIN
    INSERT INTO KhachHang
    VALUES (@MaKH, @TenKH, @DienThoai, @Email, @DiaChi, GETDATE(), @MaTK)
END
GO

CREATE PROC sp_KhachHang_GetAll
AS
BEGIN
    SELECT * FROM KhachHang
END
GO


/* =========================
   3. LAPTOP
========================= */

CREATE PROC sp_Laptop_GetAll
AS
BEGIN
    SELECT L.*, H.TenHang
    FROM Laptop L
    JOIN HangLaptop H ON L.MaHang = H.MaHang
END
GO

CREATE PROC sp_Laptop_GetById
    @MaLaptop NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Laptop WHERE MaLaptop = @MaLaptop
END
GO

CREATE PROC sp_Laptop_Create
    @MaLaptop NVARCHAR(50),
    @TenLaptop NVARCHAR(200),
    @MaHang NVARCHAR(50),
    @CPU NVARCHAR(100),
    @RAM NVARCHAR(50),
    @SSD NVARCHAR(50),
    @GPU NVARCHAR(100),
    @ManHinh NVARCHAR(50),
    @Gia DECIMAL(18,2),
    @SoLuong INT,
    @BaoHanh INT,
    @MoTa NVARCHAR(500)
AS
BEGIN
    INSERT INTO Laptop
    VALUES (@MaLaptop, @TenLaptop, @MaHang, @CPU, @RAM, @SSD,
            @GPU, @ManHinh, @Gia, @SoLuong, @BaoHanh, @MoTa, GETDATE())
END
GO

CREATE PROC sp_Laptop_Update
    @MaLaptop NVARCHAR(50),
    @TenLaptop NVARCHAR(200),
    @Gia DECIMAL(18,2),
    @SoLuong INT
AS
BEGIN
    UPDATE Laptop
    SET TenLaptop = @TenLaptop,
        Gia = @Gia,
        SoLuong = @SoLuong
    WHERE MaLaptop = @MaLaptop
END
GO

CREATE PROC sp_Laptop_Delete
    @MaLaptop NVARCHAR(50)
AS
BEGIN
    DELETE FROM Laptop WHERE MaLaptop = @MaLaptop
END
GO


/* =========================
   4. GIỎ HÀNG
========================= */

CREATE PROC sp_GioHang_AddItem
    @MaCTGH NVARCHAR(50),
    @MaGioHang NVARCHAR(50),
    @MaLaptop NVARCHAR(50),
    @SoLuong INT
AS
BEGIN
    INSERT INTO ChiTietGioHang
    VALUES (@MaCTGH, @MaGioHang, @MaLaptop, @SoLuong)
END
GO

CREATE PROC sp_GioHang_GetByKH
    @MaKH NVARCHAR(50)
AS
BEGIN
    SELECT GH.MaGioHang, L.TenLaptop, L.Gia, CT.SoLuong
    FROM GioHang GH
    JOIN ChiTietGioHang CT ON GH.MaGioHang = CT.MaGioHang
    JOIN Laptop L ON CT.MaLaptop = L.MaLaptop
    WHERE GH.MaKH = @MaKH
END
GO


/* =========================
   5. ĐƠN HÀNG + TỔNG TIỀN
========================= */

CREATE PROC sp_DonHang_Create
    @MaDonHang NVARCHAR(50),
    @MaKH NVARCHAR(50),
    @MaNV NVARCHAR(50),
    @DiaChi NVARCHAR(200),
    @PTTT NVARCHAR(50)
AS
BEGIN
    INSERT INTO DonHang
    (MaDonHang, MaKH, MaNV, NgayDat, TongTien, TrangThai, DiaChiGiaoHang, PhuongThucThanhToan)
    VALUES (@MaDonHang, @MaKH, @MaNV, GETDATE(), 0, N'Chờ xử lý', @DiaChi, @PTTT)
END
GO

CREATE PROC sp_DonHang_UpdateTongTien
    @MaDonHang NVARCHAR(50)
AS
BEGIN
    UPDATE DonHang
    SET TongTien = (
        SELECT SUM(ThanhTien)
        FROM ChiTietDonHang
        WHERE MaDonHang = @MaDonHang
    )
    WHERE MaDonHang = @MaDonHang
END
GO

CREATE PROC sp_DonHang_AddDetail
    @MaCTDH NVARCHAR(50),
    @MaDonHang NVARCHAR(50),
    @MaLaptop NVARCHAR(50),
    @SoLuong INT,
    @DonGia DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ChiTietDonHang
    (MaCTDH, MaDonHang, MaLaptop, SoLuong, DonGia)
    VALUES (@MaCTDH, @MaDonHang, @MaLaptop, @SoLuong, @DonGia)

    -- Trừ kho
    UPDATE Laptop
    SET SoLuong = SoLuong - @SoLuong
    WHERE MaLaptop = @MaLaptop

    -- Update tổng tiền
    EXEC sp_DonHang_UpdateTongTien @MaDonHang
END
GO

CREATE PROC sp_DonHang_GetByKH
    @MaKH NVARCHAR(50)
AS
BEGIN
    SELECT * FROM DonHang WHERE MaKH = @MaKH
END
GO


/* =========================
   6. ĐÁNH GIÁ
========================= */

CREATE PROC sp_DanhGia_Create
    @MaDanhGia NVARCHAR(50),
    @MaLaptop NVARCHAR(50),
    @MaKH NVARCHAR(50),
    @SoSao INT,
    @NoiDung NVARCHAR(500)
AS
BEGIN
    INSERT INTO DanhGia
    VALUES (@MaDanhGia, @MaLaptop, @MaKH, @SoSao, @NoiDung, GETDATE())
END
GO


/* =========================
   7. PHIẾU NHẬP + KHO
========================= */

CREATE PROC sp_PhieuNhap_Create
    @MaPhieuNhap NVARCHAR(50),
    @MaNCC NVARCHAR(50),
    @MaNV NVARCHAR(50)
AS
BEGIN
    INSERT INTO PhieuNhap
    VALUES (@MaPhieuNhap, @MaNCC, @MaNV, GETDATE(), 0, NULL)
END
GO

CREATE PROC sp_PhieuNhap_UpdateTongTien
    @MaPhieuNhap NVARCHAR(50)
AS
BEGIN
    UPDATE PhieuNhap
    SET TongTien = (
        SELECT SUM(SoLuong * GiaNhap)
        FROM ChiTietPhieuNhap
        WHERE MaPhieuNhap = @MaPhieuNhap
    )
    WHERE MaPhieuNhap = @MaPhieuNhap
END
GO

CREATE PROC sp_PhieuNhap_AddDetail
    @MaCTPN NVARCHAR(50),
    @MaPhieuNhap NVARCHAR(50),
    @MaLaptop NVARCHAR(50),
    @SoLuong INT,
    @GiaNhap DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ChiTietPhieuNhap
    VALUES (@MaCTPN, @MaPhieuNhap, @MaLaptop, @SoLuong, @GiaNhap)

    -- Cộng kho
    UPDATE Laptop
    SET SoLuong = SoLuong + @SoLuong
    WHERE MaLaptop = @MaLaptop

    -- Update tổng tiền
    EXEC sp_PhieuNhap_UpdateTongTien @MaPhieuNhap
END
GO


/* =========================
   NHÂN VIÊN
========================= */

-- Lấy tất cả
IF OBJECT_ID('sp_NhanVien_GetAll') IS NOT NULL
    DROP PROC sp_NhanVien_GetAll
GO

CREATE PROC sp_NhanVien_GetAll
AS
BEGIN
    SELECT NV.*, TK.TenDangNhap, TK.Role
    FROM NhanVien NV
    LEFT JOIN TaiKhoan TK ON NV.MaTK = TK.MaTK
END
GO


-- Lấy theo ID
IF OBJECT_ID('sp_NhanVien_GetById') IS NOT NULL
    DROP PROC sp_NhanVien_GetById
GO

CREATE PROC sp_NhanVien_GetById
    @MaNV NVARCHAR(50)
AS
BEGIN
    SELECT * FROM NhanVien WHERE MaNV = @MaNV
END
GO


-- Thêm nhân viên
IF OBJECT_ID('sp_NhanVien_Create') IS NOT NULL
    DROP PROC sp_NhanVien_Create
GO

CREATE PROC sp_NhanVien_Create
    @MaNV NVARCHAR(50),
    @TenNV NVARCHAR(150),
    @DienThoai VARCHAR(15),
    @Email VARCHAR(100),
    @ChucVu NVARCHAR(50),
    @NgaySinh DATE,
    @NgayVaoLam DATE,
    @MaTK NVARCHAR(50)
AS
BEGIN
    INSERT INTO NhanVien
    VALUES (@MaNV, @TenNV, @DienThoai, @Email, @ChucVu, @NgaySinh, @NgayVaoLam, @MaTK)
END
GO


-- Cập nhật
IF OBJECT_ID('sp_NhanVien_Update') IS NOT NULL
    DROP PROC sp_NhanVien_Update
GO

CREATE PROC sp_NhanVien_Update
    @MaNV NVARCHAR(50),
    @TenNV NVARCHAR(150),
    @DienThoai VARCHAR(15),
    @Email VARCHAR(100),
    @ChucVu NVARCHAR(50)
AS
BEGIN
    UPDATE NhanVien
    SET TenNV = @TenNV,
        DienThoai = @DienThoai,
        Email = @Email,
        ChucVu = @ChucVu
    WHERE MaNV = @MaNV
END
GO


-- Xóa
IF OBJECT_ID('sp_NhanVien_Delete') IS NOT NULL
    DROP PROC sp_NhanVien_Delete
GO

CREATE PROC sp_NhanVien_Delete
    @MaNV NVARCHAR(50)
AS
BEGIN
    DELETE FROM NhanVien WHERE MaNV = @MaNV
END
GO


/* =========================
   NHÀ CUNG CẤP (NhaCungCap)
========================= */

-- Lấy tất cả
IF OBJECT_ID('sp_NhaCungCap_GetAll') IS NOT NULL
    DROP PROC sp_NhaCungCap_GetAll
GO

CREATE PROC sp_NhaCungCap_GetAll
AS
BEGIN
    SELECT * FROM NhaCungCap
END
GO


-- Lấy theo ID
IF OBJECT_ID('sp_NhaCungCap_GetById') IS NOT NULL
    DROP PROC sp_NhaCungCap_GetById
GO

CREATE PROC sp_NhaCungCap_GetById
    @MaNCC NVARCHAR(50)
AS
BEGIN
    SELECT * FROM NhaCungCap WHERE MaNCC = @MaNCC
END
GO


-- Thêm nhà cung cấp
IF OBJECT_ID('sp_NhaCungCap_Create') IS NOT NULL
    DROP PROC sp_NhaCungCap_Create
GO

CREATE PROC sp_NhaCungCap_Create
    @MaNCC NVARCHAR(50),
    @TenNCC NVARCHAR(150),
    @DienThoai VARCHAR(15),
    @Email VARCHAR(100),
    @DiaChi NVARCHAR(200)
AS
BEGIN
    INSERT INTO NhaCungCap
    VALUES (@MaNCC, @TenNCC, @DienThoai, @Email, @DiaChi)
END
GO


-- Cập nhật
IF OBJECT_ID('sp_NhaCungCap_Update') IS NOT NULL
    DROP PROC sp_NhaCungCap_Update
GO

CREATE PROC sp_NhaCungCap_Update
    @MaNCC NVARCHAR(50),
    @TenNCC NVARCHAR(150),
    @DienThoai VARCHAR(15),
    @Email VARCHAR(100),
    @DiaChi NVARCHAR(200)
AS
BEGIN
    UPDATE NhaCungCap
    SET TenNCC = @TenNCC,
        DienThoai = @DienThoai,
        Email = @Email,
        DiaChi = @DiaChi
    WHERE MaNCC = @MaNCC
END
GO


-- Xóa
IF OBJECT_ID('sp_NhaCungCap_Delete') IS NOT NULL
    DROP PROC sp_NhaCungCap_Delete
GO

CREATE PROC sp_NhaCungCap_Delete
    @MaNCC NVARCHAR(50)
AS
BEGIN
    DELETE FROM NhaCungCap WHERE MaNCC = @MaNCC
END
GO

/* =========================
   8. UPDATE BỔ SUNG
========================= */

CREATE PROC sp_DanhGia_Delete
    @MaDanhGia NVARCHAR(50)
AS
BEGIN
    DELETE FROM DanhGia WHERE MaDanhGia = @MaDanhGia
END
GO

CREATE PROC sp_ThongKeDoanhThu
    @TuNgay DATETIME,
    @DenNgay DATETIME
AS
BEGIN
    -- Thống kê tổng doanh thu và số lượng laptop bán ra theo khoảng thời gian
    SELECT 
        CAST(NgayDat AS DATE) AS Ngay,
        SUM(TongTien) AS DoanhThu,
        COUNT(MaDonHang) AS SoDonHang
    FROM DonHang
    WHERE NgayDat >= @TuNgay AND NgayDat <= @DenNgay AND TrangThai = N'Đã giao'
    GROUP BY CAST(NgayDat AS DATE)
    ORDER BY Ngay ASC
END
GO

CREATE PROC sp_DonHang_UpdateTrangThai
    @MaDonHang NVARCHAR(50),
    @TrangThai NVARCHAR(50)
AS
BEGIN
    UPDATE DonHang 
    SET TrangThai = @TrangThai 
    WHERE MaDonHang = @MaDonHang
END
GO

CREATE PROC sp_GioHang_UpdateItem
    @MaCTGH NVARCHAR(50),
    @SoLuong INT
AS
BEGIN
    UPDATE ChiTietGioHang 
    SET SoLuong = @SoLuong 
    WHERE MaCTGH = @MaCTGH
END
GO

CREATE PROC sp_GioHang_DeleteItem
    @MaCTGH NVARCHAR(50)
AS
BEGIN
    DELETE FROM ChiTietGioHang 
    WHERE MaCTGH = @MaCTGH
END
GO