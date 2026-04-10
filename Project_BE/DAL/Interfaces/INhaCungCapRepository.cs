using System;
using System.Collections.Generic;
using Models;

namespace DAL.Interfaces
{
    public interface INhaCungCapRepository
    {
        List<NhaCungCap> GetAll();
        NhaCungCap GetById(string id);
        bool Create(NhaCungCap ncc);
        bool Update(NhaCungCap ncc);
        bool Delete(string id);
    }
}
