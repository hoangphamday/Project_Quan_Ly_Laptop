using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class KhachHangService : IKhachHangService
    {
        private readonly IKhachHangRepository _repo;
        public KhachHangService(IKhachHangRepository repo)
        {
            _repo = repo;
        }

        public bool Create(KhachHang kh)
        {
            return _repo.Create(kh);
        }

        public List<KhachHang> GetAll()
        {
            return _repo.GetAll();
        }
    }
}
