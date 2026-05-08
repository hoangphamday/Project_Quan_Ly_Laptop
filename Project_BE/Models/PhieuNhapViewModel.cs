using System;

namespace Models
{
    /// <summary>
    /// DTO dùng cho sp_PhieuNhap_GetAll (danh sách phiếu nhập có join NCC, NV)
    /// </summary>
    public class PhieuNhapViewModel
    {
        public string MaPhieuNhap { get; set; }
        public DateTime NgayNhap { get; set; }
        public decimal TongTien { get; set; }
        public string GhiChu { get; set; }

        // JOIN NhaCungCap
        public string TenNCC { get; set; }
        // JOIN NhanVien
        public string TenNV { get; set; }

        // SUM từ ChiTietPhieuNhap
        public int TongSoLuongSP { get; set; }
    }

    /// <summary>
    /// DTO dùng cho sp_PhieuNhap_GetDetail (chi tiết phiếu nhập có join Laptop)
    /// </summary>
    public class ChiTietPhieuNhapViewModel
    {
        public string MaCTPN { get; set; }
        public string MaLaptop { get; set; }

        // JOIN Laptop
        public string TenLaptop { get; set; }
        public string CPU { get; set; }
        public string RAM { get; set; }
        public string SSD { get; set; }

        public int SoLuong { get; set; }
        public decimal GiaNhap { get; set; }
        public decimal ThanhTien { get; set; }
    }
}
