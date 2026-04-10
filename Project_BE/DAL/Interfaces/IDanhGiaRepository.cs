using System;
using Models;

namespace DAL.Interfaces
{
    public interface IDanhGiaRepository
    {
        bool Create(DanhGia danhGia);
        bool Delete(string id);
    }
}
