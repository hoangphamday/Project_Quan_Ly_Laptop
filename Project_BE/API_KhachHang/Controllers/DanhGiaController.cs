using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_KhachHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "KhachHang")]
    public class DanhGiaController : ControllerBase
    {
        private readonly IDanhGiaService _danhGiaService;

        public DanhGiaController(IDanhGiaService danhGiaService)
        {
            _danhGiaService = danhGiaService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] DanhGia danhGia)
        {
            bool result = _danhGiaService.Create(danhGia);
            if (result) return Ok(new { message = "Cảm ơn bạn đã đánh giá" });
            return BadRequest(new { message = "Lỗi khi gửi đánh giá" });
        }
    }
}
