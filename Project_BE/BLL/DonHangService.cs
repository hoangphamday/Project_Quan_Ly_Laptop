using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class DonHangService : IDonHangService
    {
        private readonly IDonHangRepository _repo;
        public DonHangService(IDonHangRepository repo)
        {
            _repo = repo;
        }

        public bool AddDetail(ChiTietDonHang chiTiet)
        {
            return _repo.AddDetail(chiTiet);
        }

        public bool Create(DonHang donHang)
        {
            return _repo.Create(donHang);
        }

        public List<DonHang> GetByKH(string maKH)
        {
            return _repo.GetByKH(maKH);
        }

        public bool UpdateTrangThai(string maDonHang, string trangThai)
        {
            return _repo.UpdateTrangThai(maDonHang, trangThai);
        }
    }
}
