using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_NhanVien.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "NhanVien")]
    public class DonHangController : ControllerBase
    {
        private readonly IDonHangService _donHangService;

        public DonHangController(IDonHangService donHangService)
        {
            _donHangService = donHangService;
        }

        [HttpPut("{maDonHang}/trangthai")]
        public IActionResult UpdateTrangThai(string maDonHang, [FromBody] string trangThai)
        {
            if (string.IsNullOrEmpty(trangThai)) return BadRequest(new { message = "Trạng thái không được để trống" });
            
            bool result = _donHangService.UpdateTrangThai(maDonHang, trangThai);
            if (result) return Ok(new { message = "Cập nhật trạng thái thành công" });
            
            return BadRequest(new { message = "Cập nhật trạng thái thất bại" });
        }
    }
}
