using System;
using System.Collections.Generic;
using Models;

namespace DAL.Interfaces
{
    public interface IThongKeRepository
    {
        List<ThongKeDoanhThu> GetDoanhThu(DateTime tuNgay, DateTime denNgay);
    }
}
