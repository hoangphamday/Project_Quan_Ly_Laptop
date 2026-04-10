using System;
using Models;

namespace DAL.Interfaces
{
    public interface IPhieuNhapRepository
    {
        bool Create(PhieuNhap phieu);
        bool AddDetail(ChiTietPhieuNhap detail);
    }
}
