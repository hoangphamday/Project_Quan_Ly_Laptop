using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface IPhieuNhapService
    {
        bool Create(PhieuNhap phieu);
        bool AddDetail(ChiTietPhieuNhap detail);
        IEnumerable<PhieuNhapViewModel> GetAll();
        IEnumerable<ChiTietPhieuNhapViewModel> GetDetail(string maPhieuNhap);
    }
}
