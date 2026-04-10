using System;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;

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
    }
}
