using System;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class PhieuNhapService : IPhieuNhapService
    {
        private readonly IPhieuNhapRepository _repo;
        public PhieuNhapService(IPhieuNhapRepository repo)
        {
            _repo = repo;
        }

        public bool AddDetail(ChiTietPhieuNhap detail)
        {
            return _repo.AddDetail(detail);
        }

        public bool Create(PhieuNhap phieu)
        {
            return _repo.Create(phieu);
        }
    }
}
