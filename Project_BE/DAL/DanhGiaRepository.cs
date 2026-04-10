using System;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;

namespace DAL
{
    public class DanhGiaRepository : IDanhGiaRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public DanhGiaRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(DanhGia danhGia)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_DanhGia_Create",
                "@MaDanhGia", danhGia.MaDanhGia,
                "@MaLaptop", danhGia.MaLaptop,
                "@MaKH", danhGia.MaKH,
                "@SoSao", danhGia.SoSao,
                "@NoiDung", danhGia.NoiDung);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Delete(string id)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_DanhGia_Delete", "@MaDanhGia", id);
            return string.IsNullOrEmpty(msgError);
        }
    }
}
