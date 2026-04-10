using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface IKhachHangService
    {
        bool Create(KhachHang kh);
        List<KhachHang> GetAll();
    }
}
