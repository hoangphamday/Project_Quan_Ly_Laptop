USE Project_Laptop
GO

-- Cập nhật Role để khớp với [Authorize(Roles = "Admin"/"NhanVien"/"KhachHang")] trong C#
-- TaiKhoanService tạo token với claim role = user.Role lấy từ DB
-- nên DB phải chứa đúng giá trị 'Admin', 'NhanVien', 'KhachHang'

UPDATE TaiKhoan SET Role = 'Admin'     WHERE Role IN (N'Quản trị', N'Admin')    AND TenDangNhap = 'admin';
UPDATE TaiKhoan SET Role = 'NhanVien'  WHERE Role IN (N'Nhân viên', N'NhanVien') AND TenDangNhap LIKE 'nv%';
UPDATE TaiKhoan SET Role = 'KhachHang' WHERE Role IN (N'Khách hàng', N'KhachHang') AND TenDangNhap LIKE 'kh%';

-- Kiểm tra kết quả
SELECT MaTK, TenDangNhap, Role FROM TaiKhoan ORDER BY MaTK;
GO
