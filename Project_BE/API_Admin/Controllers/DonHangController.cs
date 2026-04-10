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

        [HttpPost]
        public IActionResult Create([FromBody] DonHang donHang)
        {
            bool result = _donHangService.Create(donHang);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPost("AddDetail")]
        public IActionResult AddDetail([FromBody] ChiTietDonHang chiTiet)
        {
            bool result = _donHangService.AddDetail(chiTiet);
            if (result) return Ok(new { message = "Thêm chi tiết thành công" });
            return BadRequest(new { message = "Thêm chi tiết thất bại" });
        }

        [HttpGet("getByKH/{khachHangId}")]
        public IActionResult GetByKH(string khachHangId)
        {
            return Ok(_donHangService.GetByKH(khachHangId));
        }
    }
}
