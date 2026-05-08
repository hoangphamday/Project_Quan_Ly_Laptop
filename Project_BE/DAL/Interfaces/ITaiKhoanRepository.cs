using System;
using System.Collections.Generic;
using System.Data;
using Models;

namespace DAL.Interfaces
{
    public interface ITaiKhoanRepository
    {
        bool Register(TaiKhoan tk);
        TaiKhoan Login(string username, string password);
        List<TaiKhoan> GetAll();
        bool Update(TaiKhoan tk);   // Cập nhật vai trò, trạng thái
        bool Delete(string maTK);   // Xóa tài khoản
    }
}
