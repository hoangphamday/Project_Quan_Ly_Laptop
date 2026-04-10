using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface IThongKeService
    {
        List<ThongKeDoanhThu> GetDoanhThu(DateTime tuNgay, DateTime denNgay);
    }
}
