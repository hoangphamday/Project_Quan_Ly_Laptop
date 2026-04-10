using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class NhaCungCapService : INhaCungCapService
    {
        private readonly INhaCungCapRepository _repo;
        public NhaCungCapService(INhaCungCapRepository repo)
        {
            _repo = repo;
        }

        public bool Create(NhaCungCap ncc)
        {
            return _repo.Create(ncc);
        }

        public bool Delete(string id)
        {
            return _repo.Delete(id);
        }

        public List<NhaCungCap> GetAll()
        {
            return _repo.GetAll();
        }

        public NhaCungCap GetById(string id)
        {
            return _repo.GetById(id);
        }

        public bool Update(NhaCungCap ncc)
        {
            return _repo.Update(ncc);
        }
    }
}
