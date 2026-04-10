using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class TaiKhoanController : ControllerBase
    {
        private readonly ITaiKhoanService _taiKhoanService;

        public TaiKhoanController(ITaiKhoanService taiKhoanService)
        {
            _taiKhoanService = taiKhoanService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] TaiKhoan tk)
        {
            bool result = _taiKhoanService.Register(tk);
            if (result) return Ok(new { message = "Đăng ký thành công" });
            return BadRequest(new { message = "Đăng ký thất bại" });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] TaiKhoan tk)
        {
            // Login thì có thể AllowAnonymous hoặc không, tuỳ nhu cầu
            // Do yêu cầu "Tất cả: [Authorize(Roles = "Admin")]", có thể admin mới được phép login ở portal admin.
            var result = _taiKhoanService.Login(tk.TenDangNhap, tk.MatKhau);
            if (result != null) return Ok(result);
            return Unauthorized(new { message = "Tài khoản hoặc mật khẩu không chính xác" });
        }
    }
}
