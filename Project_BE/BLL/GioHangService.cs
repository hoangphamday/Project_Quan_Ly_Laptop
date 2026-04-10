using System;
using System.Collections.Generic;
using System.Data;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class GioHangService : IGioHangService
    {
        private readonly IGioHangRepository _repo;
        public GioHangService(IGioHangRepository repo)
        {
            _repo = repo;
        }

        public bool AddItem(string maCTGH, string maGioHang, string maLaptop, int soLuong)
        {
            return _repo.AddItem(maCTGH, maGioHang, maLaptop, soLuong);
        }

        public DataTable GetByKH(string maKH)
        {
            return _repo.GetByKH(maKH);
        }

        public bool UpdateItem(string maCTGH, int soLuong)
        {
            return _repo.UpdateItem(maCTGH, soLuong);
        }

        public bool DeleteItem(string maCTGH)
        {
            return _repo.DeleteItem(maCTGH);
        }
    }
}
