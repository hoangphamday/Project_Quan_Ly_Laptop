using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class ThongKeService : IThongKeService
    {
        private readonly IThongKeRepository _repo;
        public ThongKeService(IThongKeRepository repo)
        {
            _repo = repo;
        }

        public List<ThongKeDoanhThu> GetDoanhThu(DateTime tuNgay, DateTime denNgay)
        {
            return _repo.GetDoanhThu(tuNgay, denNgay);
        }
    }
}
