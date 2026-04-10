using System;
using System.Collections.Generic;
using Models;

namespace DAL.Interfaces
{
    public interface IKhachHangRepository
    {
        bool Create(KhachHang kh);
        List<KhachHang> GetAll();
    }
}
