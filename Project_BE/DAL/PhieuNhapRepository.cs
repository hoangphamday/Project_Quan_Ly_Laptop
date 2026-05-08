using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class PhieuNhapRepository : IPhieuNhapRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public PhieuNhapRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(PhieuNhap phieu)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_PhieuNhap_Create",
                "@MaPhieuNhap", phieu.MaPhieuNhap,
                "@MaNCC", phieu.MaNCC,
                "@MaNV", phieu.MaNV);
            return string.IsNullOrEmpty(msgError);
        }

        public bool AddDetail(ChiTietPhieuNhap detail)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_PhieuNhap_AddDetail",
                "@MaCTPN", detail.MaCTPN,
                "@MaPhieuNhap", detail.MaPhieuNhap,
                "@MaLaptop", detail.MaLaptop,
                "@SoLuong", detail.SoLuong,
                "@GiaNhap", detail.GiaNhap);
            return string.IsNullOrEmpty(msgError);
        }

        public IEnumerable<PhieuNhapViewModel> GetAll()
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_PhieuNhap_GetAll");
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<PhieuNhapViewModel>();
            return dt.ConvertTo<PhieuNhapViewModel>().ToList();
        }

        public IEnumerable<ChiTietPhieuNhapViewModel> GetDetail(string maPhieuNhap)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_PhieuNhap_GetDetail",
                "@MaPhieuNhap", maPhieuNhap);
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<ChiTietPhieuNhapViewModel>();
            return dt.ConvertTo<ChiTietPhieuNhapViewModel>().ToList();
        }
    }
}
