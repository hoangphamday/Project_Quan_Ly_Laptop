using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class DonHangRepository : IDonHangRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public DonHangRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(DonHang donHang)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_DonHang_Create",
                "@MaDonHang", donHang.MaDonHang,
                "@MaKH", donHang.MaKH,
                "@MaNV", donHang.MaNV,
                "@DiaChi", donHang.DiaChiGiaoHang,
                "@PTTT", donHang.PhuongThucThanhToan);
            return string.IsNullOrEmpty(msgError);
        }

        public bool AddDetail(ChiTietDonHang chiTiet)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_DonHang_AddDetail",
                "@MaCTDH", chiTiet.MaCTDH,
                "@MaDonHang", chiTiet.MaDonHang,
                "@MaLaptop", chiTiet.MaLaptop,
                "@SoLuong", chiTiet.SoLuong,
                "@DonGia", chiTiet.DonGia);
            return string.IsNullOrEmpty(msgError);
        }

        public List<DonHang> GetByKH(string maKH)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_DonHang_GetByKH", "@MaKH", maKH);
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<DonHang>();
            return dt.ConvertTo<DonHang>().ToList();
        }

        public bool UpdateTrangThai(string maDonHang, string trangThai)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_DonHang_UpdateTrangThai", 
                "@MaDonHang", maDonHang, 
                "@TrangThai", trangThai);
            return string.IsNullOrEmpty(msgError);
        }
    }
}
