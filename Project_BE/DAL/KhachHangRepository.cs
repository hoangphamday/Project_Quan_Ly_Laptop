using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class KhachHangRepository : IKhachHangRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public KhachHangRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(KhachHang kh)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_KhachHang_Create", 
                "@MaKH", kh.MaKH,
                "@TenKH", kh.TenKH,
                "@DienThoai", kh.DienThoai,
                "@Email", kh.Email,
                "@DiaChi", kh.DiaChi,
                "@MaTK", kh.MaTK);
            return string.IsNullOrEmpty(msgError);
        }

        public List<KhachHang> GetAll()
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_KhachHang_GetAll");
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<KhachHang>();
            return dt.ConvertTo<KhachHang>().ToList();
        }
    }
}
