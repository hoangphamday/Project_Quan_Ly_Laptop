using System;
using Models;

namespace BLL.Interfaces
{
    public interface IPhieuNhapService
    {
        bool Create(PhieuNhap phieu);
        bool AddDetail(ChiTietPhieuNhap detail);
    }
}
