using System;
using System.Collections.Generic;
using Models;

namespace DAL.Interfaces
{
    public interface IPhieuNhapRepository
    {
        bool Create(PhieuNhap phieu);
        bool AddDetail(ChiTietPhieuNhap detail);
        IEnumerable<PhieuNhapViewModel> GetAll();
        IEnumerable<ChiTietPhieuNhapViewModel> GetDetail(string maPhieuNhap);
    }
}
