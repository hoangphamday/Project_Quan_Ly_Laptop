using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface IDonHangService
    {
        bool Create(DonHang donHang);
        bool AddDetail(ChiTietDonHang chiTiet);
        List<DonHang> GetByKH(string maKH);
        bool UpdateTrangThai(string maDonHang, string trangThai);
    }
}
