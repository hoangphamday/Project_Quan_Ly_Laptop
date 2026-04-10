using System;
using System.Collections.Generic;
using System.Linq;
using Models;
using DAL.Interfaces;
using DAL.Helper.Interfaces;
using DAL.Helper;

namespace DAL
{
    public class ThongKeRepository : IThongKeRepository
    {
        private readonly IDatabaseHelper _dbHelper;
        public ThongKeRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<ThongKeDoanhThu> GetDoanhThu(DateTime tuNgay, DateTime denNgay)
        {
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out string msgError, "sp_ThongKeDoanhThu", 
                "@TuNgay", tuNgay, 
                "@DenNgay", denNgay);
            if (!string.IsNullOrEmpty(msgError) || dt == null) return new List<ThongKeDoanhThu>();
            return dt.ConvertTo<ThongKeDoanhThu>().ToList();
        }
    }
}
