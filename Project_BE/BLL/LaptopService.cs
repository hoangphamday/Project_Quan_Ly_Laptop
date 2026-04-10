using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class LaptopService : ILaptopService
    {
        private readonly ILaptopRepository _repo;
        public LaptopService(ILaptopRepository repo)
        {
            _repo = repo;
        }

        public bool Create(Laptop laptop)
        {
            return _repo.Create(laptop);
        }

        public bool Delete(string id)
        {
            return _repo.Delete(id);
        }

        public List<Laptop> GetAll()
        {
            return _repo.GetAll();
        }

        public Laptop GetById(string id)
        {
            return _repo.GetById(id);
        }

        public bool Update(Laptop laptop)
        {
            return _repo.Update(laptop);
        }
    }
}
