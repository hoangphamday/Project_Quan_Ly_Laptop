using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_KhachHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "KhachHang")]
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
            if (result) return Ok(new { message = "Đặt hàng thành công" });
            return BadRequest(new { message = "Đặt hàng thất bại" });
        }

        [HttpGet("LichSu/{maKH}")]
        public IActionResult LichSu(string maKH)
        {
            return Ok(_donHangService.GetByKH(maKH));
        }

        [HttpPost("AddDetail")]
        public IActionResult AddDetail([FromBody] ChiTietDonHang chiTiet)
        {
            bool result = _donHangService.AddDetail(chiTiet);
            if (result) return Ok(new { message = "Thêm chi tiết đơn hàng thành công" });
            return BadRequest(new { message = "Thêm chi tiết đơn hàng thất bại" });
        }
    }
}
