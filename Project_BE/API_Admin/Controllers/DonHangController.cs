using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DonHangController : ControllerBase
    {
        private readonly IDonHangService _donHangService;

        public DonHangController(IDonHangService donHangService)
        {
            _donHangService = donHangService;
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            return Ok(_donHangService.GetAll());
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] DonHang donHang)
        {
            bool result = _donHangService.Create(donHang);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPost("add-detail")]
        public IActionResult AddDetail([FromBody] ChiTietDonHang chiTiet)
        {
            bool result = _donHangService.AddDetail(chiTiet);
            if (result) return Ok(new { message = "Thêm chi tiết thành công" });
            return BadRequest(new { message = "Thêm chi tiết thất bại" });
        }

        [HttpGet("get-by-kh/{khachHangId}")]
        public IActionResult GetByKH(string khachHangId)
        {
            return Ok(_donHangService.GetByKH(khachHangId));
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
