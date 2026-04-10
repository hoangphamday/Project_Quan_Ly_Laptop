using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface INhanVienService
    {
        List<NhanVien> GetAll();
        NhanVien GetById(string id);
        bool Create(NhanVien nv);
        bool Update(NhanVien nv);
        bool Delete(string id);
    }
}
