USE Project_Laptop
GO

-- ============================================================
-- Bước 1: Cập nhật sp_Laptop_GetAll
-- Thêm cột DuongDanAnh (lấy ảnh đại diện đầu tiên từ HinhAnhLaptop)
-- ============================================================

IF OBJECT_ID('sp_Laptop_GetAll') IS NOT NULL
    DROP PROC sp_Laptop_GetAll
GO

CREATE PROC sp_Laptop_GetAll
AS
BEGIN
    -- Lấy tất cả laptop, kèm tên hãng và đường dẫn ảnh đại diện (ảnh đầu tiên)
    SELECT
        L.*,
        H.TenHang,
        (
            SELECT TOP 1 DuongDanAnh
            FROM HinhAnhLaptop
            WHERE MaLaptop = L.MaLaptop
        ) AS DuongDanAnh
    FROM Laptop L
    JOIN HangLaptop H ON L.MaHang = H.MaHang
END
GO


-- ============================================================
-- Bước 2: Cập nhật sp_Laptop_Update
-- Thêm tham số @DuongDanAnh để cập nhật ảnh vào HinhAnhLaptop
-- ============================================================

IF OBJECT_ID('sp_Laptop_Update') IS NOT NULL
    DROP PROC sp_Laptop_Update
GO

CREATE PROC sp_Laptop_Update
    @MaLaptop    NVARCHAR(50),
    @TenLaptop   NVARCHAR(200),
    @Gia         DECIMAL(18,2),
    @SoLuong     INT,
    @DuongDanAnh NVARCHAR(255) = NULL   -- Đường dẫn ảnh, NULL = không đổi
AS
BEGIN
    SET NOCOUNT ON;

    -- Cập nhật thông tin laptop
    UPDATE Laptop
    SET TenLaptop = @TenLaptop,
        Gia       = @Gia,
        SoLuong   = @SoLuong
    WHERE MaLaptop = @MaLaptop;

    -- Cập nhật / thêm ảnh đại diện (nếu người dùng nhập đường dẫn ảnh)
    IF @DuongDanAnh IS NOT NULL AND LTRIM(RTRIM(@DuongDanAnh)) <> ''
    BEGIN
        IF EXISTS (SELECT 1 FROM HinhAnhLaptop WHERE MaLaptop = @MaLaptop)
        BEGIN
            -- Đã có ảnh → cập nhật ảnh đầu tiên
            UPDATE TOP(1) HinhAnhLaptop
            SET DuongDanAnh = @DuongDanAnh
            WHERE MaLaptop = @MaLaptop;
        END
        ELSE
        BEGIN
            -- Chưa có ảnh → thêm mới
            INSERT INTO HinhAnhLaptop (MaHinh, MaLaptop, DuongDanAnh)
            VALUES (NEWID(), @MaLaptop, @DuongDanAnh);
        END
    END
END
GO
