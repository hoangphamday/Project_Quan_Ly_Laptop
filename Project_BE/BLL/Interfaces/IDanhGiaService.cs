using System;
using Models;

namespace BLL.Interfaces
{
    public interface IDanhGiaService
    {
        bool Create(DanhGia danhGia);
        bool Delete(string id);
    }
}
