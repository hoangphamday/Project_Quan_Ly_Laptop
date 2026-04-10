using System;
using System.Collections.Generic;
using Models;

namespace BLL.Interfaces
{
    public interface INhaCungCapService
    {
        List<NhaCungCap> GetAll();
        NhaCungCap GetById(string id);
        bool Create(NhaCungCap ncc);
        bool Update(NhaCungCap ncc);
        bool Delete(string id);
    }
}
