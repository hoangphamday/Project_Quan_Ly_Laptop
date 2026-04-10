using System;
using System.Collections.Generic;
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class TaiKhoanService : ITaiKhoanService
    {
        private readonly ITaiKhoanRepository _repo;
        public TaiKhoanService(ITaiKhoanRepository repo)
        {
            _repo = repo;
        }

        public TaiKhoan Login(string username, string password)
        {
            return _repo.Login(username, password);
        }

        public bool Register(TaiKhoan tk)
        {
            return _repo.Register(tk);
        }
    }
}
