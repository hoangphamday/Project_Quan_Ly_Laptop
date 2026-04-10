using System;
using System.Collections.Generic;
using Models;

namespace DAL.Interfaces
{
    public interface IDonHangRepository
    {
        bool Create(DonHang donHang);
        bool AddDetail(ChiTietDonHang chiTiet);
        List<DonHang> GetByKH(string maKH);
        bool UpdateTrangThai(string maDonHang, string trangThai);
    }
}
