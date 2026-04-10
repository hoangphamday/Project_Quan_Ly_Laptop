using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class TaiKhoanRepository : ITaiKhoanRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public TaiKhoanRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Register(TaiKhoan tk)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_TaiKhoan_Register", 
                "@MaTK", tk.MaTK,
                "@TenDangNhap", tk.TenDangNhap,
                "@MatKhau", tk.MatKhau,
                "@Role", tk.Role);
            return string.IsNullOrEmpty(msgError);
        }

        public TaiKhoan Login(string username, string password)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_TaiKhoan_Login",
                "@TenDangNhap", username,
                "@MatKhau", password);
            if (!string.IsNullOrEmpty(msgError) || dt == null || dt.Rows.Count == 0)
                return null;

            return dt.ConvertTo<TaiKhoan>().FirstOrDefault();
        }
    }
}
