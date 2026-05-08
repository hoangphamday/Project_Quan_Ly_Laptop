using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface ITaiKhoanService
    {
        bool Register(TaiKhoan tk);
        TaiKhoan Login(string username, string password);
        List<TaiKhoan> GetAll();
        bool Update(TaiKhoan tk);
        bool Delete(string maTK);
    }
}
