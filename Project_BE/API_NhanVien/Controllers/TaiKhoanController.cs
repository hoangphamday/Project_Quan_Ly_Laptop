using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_NhanVien.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "NhanVien")]
    public class TaiKhoanController : ControllerBase
    {
        private readonly ITaiKhoanService _taiKhoanService;

        public TaiKhoanController(ITaiKhoanService taiKhoanService)
        {
            _taiKhoanService = taiKhoanService;
        }

        /// <summary>
        /// Nhân viên đăng nhập — trả về JWT token nếu thành công
        /// </summary>
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] TaiKhoan tk)
        {
            if (string.IsNullOrWhiteSpace(tk.TenDangNhap) || string.IsNullOrWhiteSpace(tk.MatKhau))
                return BadRequest(new { message = "Vui lòng nhập tên đăng nhập và mật khẩu" });

            var result = _taiKhoanService.Login(tk.TenDangNhap, tk.MatKhau);
            if (result == null)
                return Unauthorized(new { message = "Tên đăng nhập hoặc mật khẩu không chính xác" });

            // Chỉ cho phép nhân viên đăng nhập tại portal này
            if (result.Role != "NhanVien")
                return Unauthorized(new { message = "Tài khoản không có quyền truy cập hệ thống nhân viên" });

            return Ok(new
            {
                token       = result.Token,
                maTK        = result.MaTK,
                tenDangNhap = result.TenDangNhap,
                role        = result.Role,
                fullName    = result.FullName
            });
        }
    }
}
