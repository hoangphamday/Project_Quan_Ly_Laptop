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
        [AllowAnonymous]
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

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            return Ok(_taiKhoanService.GetAll());
        }

        // Cập nhật vai trò và trạng thái tài khoản
        [HttpPut("update")]
        public IActionResult Update([FromBody] TaiKhoan tk)
        {
            bool result = _taiKhoanService.Update(tk);
            if (result) return Ok(new { message = "Cập nhật tài khoản thành công" });
            return BadRequest(new { message = "Cập nhật thất bại" });
        }

        // Xóa tài khoản
        [HttpDelete("delete/{maTK}")]
        public IActionResult Delete(string maTK)
        {
            bool result = _taiKhoanService.Delete(maTK);
            if (result) return Ok(new { message = "Xóa tài khoản thành công" });
            return BadRequest(new { message = "Xóa thất bại" });
        }
    }
}
