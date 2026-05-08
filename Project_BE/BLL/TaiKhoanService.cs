using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using DAL.Helper; // Chứa class AppSetting
using Models;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class TaiKhoanService : ITaiKhoanService
    {
        private readonly ITaiKhoanRepository _repo;
        private readonly AppSetting _appSettings;

        public TaiKhoanService(ITaiKhoanRepository repo, IOptions<AppSetting> appSettings)
        {
            _repo = repo;
            _appSettings = appSettings.Value;
        }

        public TaiKhoan Login(string username, string password)
        {
            var user = _repo.Login(username, password);
            if (user == null) return null;

            // Tạo JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.TenDangNhap),
                    new Claim(ClaimTypes.Role, user.Role ?? "Admin")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public bool Register(TaiKhoan tk) => _repo.Register(tk);

        public List<TaiKhoan> GetAll() => _repo.GetAll();

        public bool Update(TaiKhoan tk) => _repo.Update(tk);

        public bool Delete(string maTK) => _repo.Delete(maTK);
    }
}
