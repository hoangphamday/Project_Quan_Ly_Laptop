using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class NhaCungCapRepository : INhaCungCapRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public NhaCungCapRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<NhaCungCap> GetAll()
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_NhaCungCap_GetAll");
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<NhaCungCap>();
            return dt.ConvertTo<NhaCungCap>().ToList();
        }

        public NhaCungCap GetById(string id)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_NhaCungCap_GetById", "@MaNCC", id);
            if (!string.IsNullOrEmpty(msgError) || dt == null || dt.Rows.Count == 0) return null;
            return dt.ConvertTo<NhaCungCap>().FirstOrDefault();
        }

        public bool Create(NhaCungCap ncc)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_NhaCungCap_Create",
                "@MaNCC", ncc.MaNCC,
                "@TenNCC", ncc.TenNCC,
                "@DienThoai", ncc.DienThoai,
                "@Email", ncc.Email,
                "@DiaChi", ncc.DiaChi);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Update(NhaCungCap ncc)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_NhaCungCap_Update",
                "@MaNCC", ncc.MaNCC,
                "@TenNCC", ncc.TenNCC,
                "@DienThoai", ncc.DienThoai,
                "@Email", ncc.Email,
                "@DiaChi", ncc.DiaChi);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Delete(string id)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_NhaCungCap_Delete", "@MaNCC", id);
            return string.IsNullOrEmpty(msgError);
        }
    }
}
