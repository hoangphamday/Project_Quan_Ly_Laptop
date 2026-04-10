using System;
using System.Collections.Generic;
using Models;

namespace DAL.Interfaces
{
    public interface ILaptopRepository
    {
        List<Laptop> GetAll();
        Laptop GetById(string id);
        bool Create(Laptop laptop);
        bool Update(Laptop laptop);
        bool Delete(string id);
    }
}
