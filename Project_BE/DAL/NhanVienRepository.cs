using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class NhanVienRepository : INhanVienRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public NhanVienRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<NhanVien> GetAll()
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_NhanVien_GetAll");
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<NhanVien>();
            return dt.ConvertTo<NhanVien>().ToList();
        }

        public NhanVien GetById(string id)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_NhanVien_GetById", "@MaNV", id);
            if (!string.IsNullOrEmpty(msgError) || dt == null || dt.Rows.Count == 0) return null;
            return dt.ConvertTo<NhanVien>().FirstOrDefault();
        }

        public bool Create(NhanVien nv)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_NhanVien_Create",
                "@MaNV", nv.MaNV,
                "@TenNV", nv.TenNV,
                "@DienThoai", nv.DienThoai,
                "@Email", nv.Email,
                "@ChucVu", nv.ChucVu,
                "@NgaySinh", nv.NgaySinh,
                "@NgayVaoLam", nv.NgayVaoLam,
                "@MaTK", nv.MaTK);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Update(NhanVien nv)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_NhanVien_Update",
                "@MaNV", nv.MaNV,
                "@TenNV", nv.TenNV,
                "@DienThoai", nv.DienThoai,
                "@Email", nv.Email,
                "@ChucVu", nv.ChucVu);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Delete(string id)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_NhanVien_Delete", "@MaNV", id);
            return string.IsNullOrEmpty(msgError);
        }
    }
}
