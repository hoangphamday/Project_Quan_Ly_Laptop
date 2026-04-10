using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class LaptopRepository : ILaptopRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public LaptopRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<Laptop> GetAll()
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_Laptop_GetAll");
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<Laptop>();
            return dt.ConvertTo<Laptop>().ToList();
        }

        public Laptop GetById(string id)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_Laptop_GetById", "@MaLaptop", id);
            if (!string.IsNullOrEmpty(msgError) || dt == null || dt.Rows.Count == 0) return null;
            return dt.ConvertTo<Laptop>().FirstOrDefault();
        }

        public bool Create(Laptop laptop)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_Laptop_Create",
                "@MaLaptop", laptop.MaLaptop,
                "@TenLaptop", laptop.TenLaptop,
                "@MaHang", laptop.MaHang,
                "@CPU", laptop.CPU,
                "@RAM", laptop.RAM,
                "@SSD", laptop.SSD,
                "@GPU", laptop.GPU,
                "@ManHinh", laptop.ManHinh,
                "@Gia", laptop.Gia,
                "@SoLuong", laptop.SoLuong,
                "@BaoHanh", laptop.BaoHanh,
                "@MoTa", laptop.MoTa);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Update(Laptop laptop)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_Laptop_Update",
                "@MaLaptop", laptop.MaLaptop,
                "@TenLaptop", laptop.TenLaptop,
                "@Gia", laptop.Gia,
                "@SoLuong", laptop.SoLuong);
            return string.IsNullOrEmpty(msgError);
        }

        public bool Delete(string id)
        {
            string msgError = _dbHelper.ExecuteSProcedure("sp_Laptop_Delete", "@MaLaptop", id);
            return string.IsNullOrEmpty(msgError);
        }
    }
}
