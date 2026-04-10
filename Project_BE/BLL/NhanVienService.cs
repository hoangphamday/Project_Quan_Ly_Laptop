using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class NhanVienService : INhanVienService
    {
        private readonly INhanVienRepository _repo;
        public NhanVienService(INhanVienRepository repo)
        {
            _repo = repo;
        }

        public bool Create(NhanVien nv)
        {
            return _repo.Create(nv);
        }

        public bool Delete(string id)
        {
            return _repo.Delete(id);
        }

        public List<NhanVien> GetAll()
        {
            return _repo.GetAll();
        }

        public NhanVien GetById(string id)
        {
            return _repo.GetById(id);
        }

        public bool Update(NhanVien nv)
        {
            return _repo.Update(nv);
        }
    }
}
