using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class GioHangRepository : IGioHangRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public GioHangRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool AddItem(string maCTGH, string maGioHang, string maLaptop, int soLuong)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_GioHang_AddItem",
                "@MaCTGH", maCTGH,
                "@MaGioHang", maGioHang,
                "@MaLaptop", maLaptop,
                "@SoLuong", soLuong);
            return string.IsNullOrEmpty(msgError);
        }

        public DataTable GetByKH(string maKH)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_GioHang_GetByKH", "@MaKH", maKH);
            if (!string.IsNullOrEmpty(msgError)) return null;
            return dt; // Trả về DataTable vì sp_GioHang_GetByKH JOIN cả TenLaptop, Gia...
        }

        public bool UpdateItem(string maCTGH, int soLuong)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_GioHang_UpdateItem", "@MaCTGH", maCTGH, "@SoLuong", soLuong);
            return string.IsNullOrEmpty(msgError);
        }

        public bool DeleteItem(string maCTGH)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_GioHang_DeleteItem", "@MaCTGH", maCTGH);
            return string.IsNullOrEmpty(msgError);
        }
    }
}
