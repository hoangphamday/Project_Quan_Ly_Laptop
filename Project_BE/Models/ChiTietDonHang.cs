using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ChiTietDonHang
    {
        public string MaCTDH { get; set; }
        public string MaDonHang { get; set; }
        public string MaLaptop { get; set; }
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }
        public decimal ThanhTien { get; set; } // computed từ DB
    }
}
