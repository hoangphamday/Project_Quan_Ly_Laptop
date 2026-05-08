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

        /// <summary>GET /api/PhieuNhap — Lấy danh sách tất cả phiếu nhập</summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _phieuNhapService.GetAll();
            return Ok(data);
        }

        /// <summary>GET /api/PhieuNhap/{maPhieuNhap}/detail — Lấy chi tiết phiếu nhập (join Laptop)</summary>
        [HttpGet("{maPhieuNhap}/detail")]
        public IActionResult GetDetail(string maPhieuNhap)
        {
            var data = _phieuNhapService.GetDetail(maPhieuNhap);
            return Ok(data);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] PhieuNhap phieuNhap)
        {
            bool result = _phieuNhapService.Create(phieuNhap);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPost("add-detail")]
        public IActionResult AddDetail([FromBody] ChiTietPhieuNhap chiTiet)
        {
            bool result = _phieuNhapService.AddDetail(chiTiet);
            if (result) return Ok(new { message = "Thêm chi tiết phiếu nhập thành công" });
            return BadRequest(new { message = "Thêm chi tiết phiếu nhập thất bại" });
        }
    }
}
