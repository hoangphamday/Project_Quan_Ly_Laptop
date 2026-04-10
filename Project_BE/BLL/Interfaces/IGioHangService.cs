using System;
using System.Collections.Generic;
using System.Data;
using Models;

namespace BLL.Interfaces
{
    public interface IGioHangService
    {
        bool AddItem(string maCTGH, string maGioHang, string maLaptop, int soLuong);
        DataTable GetByKH(string maKH);
        bool UpdateItem(string maCTGH, int soLuong);
        bool DeleteItem(string maCTGH);
    }
}
