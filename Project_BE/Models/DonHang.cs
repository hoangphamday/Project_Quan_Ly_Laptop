using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class DonHang
    {
        public string MaDonHang { get; set; }
        public string MaKH { get; set; }
        public string? MaNV { get; set; }
        public DateTime NgayDat { get; set; }
        public decimal TongTien { get; set; }
        public string TrangThai { get; set; }
        public string DiaChiGiaoHang { get; set; }
        public string PhuongThucThanhToan { get; set; }
        public string? GhiChu { get; set; }
        public string? TenKH { get; set; }
        public string? EmailKH { get; set; }
        public string? DienThoaiKH { get; set; }

        // Fields from ChiTietDonHang / Laptop for History
        public string? TenLaptop { get; set; }
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }
        public decimal ThanhTien { get; set; }
    }
}
