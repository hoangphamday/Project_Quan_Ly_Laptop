using System;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class DanhGiaService : IDanhGiaService
    {
        private readonly IDanhGiaRepository _repo;
        public DanhGiaService(IDanhGiaRepository repo)
        {
            _repo = repo;
        }

        public bool Create(DanhGia danhGia)
        {
            return _repo.Create(danhGia);
        }

        public bool Delete(string id)
        {
            return _repo.Delete(id);
        }
    }
}
