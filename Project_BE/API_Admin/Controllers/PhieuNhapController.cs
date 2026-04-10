using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class PhieuNhapController : ControllerBase
    {
        private readonly IPhieuNhapService _phieuNhapService;

        public PhieuNhapController(IPhieuNhapService phieuNhapService)
        {
            _phieuNhapService = phieuNhapService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PhieuNhap phieuNhap)
        {
            bool result = _phieuNhapService.Create(phieuNhap);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPost("AddDetail")]
        public IActionResult AddDetail([FromBody] ChiTietPhieuNhap chiTiet)
        {
            bool result = _phieuNhapService.AddDetail(chiTiet);
            if (result) return Ok(new { message = "Thêm chi tiết phiếu nhập thành công" });
            return BadRequest(new { message = "Thêm chi tiết phiếu nhập thất bại" });
        }
    }
}
