using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_KhachHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "KhachHang")]
    public class GioHangController : ControllerBase
    {
        private readonly IGioHangService _gioHangService;

        public GioHangController(IGioHangService gioHangService)
        {
            _gioHangService = gioHangService;
        }

        [HttpGet("{maKH}")]
        public IActionResult GetByKH(string maKH)
        {
            return Ok(_gioHangService.GetByKH(maKH));
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] ChiTietGioHang item)
        {
            bool result = _gioHangService.AddItem(item.MaCTGH, item.MaGioHang, item.MaLaptop, item.SoLuong);
            if (result) return Ok(new { message = "Thêm vào giỏ hàng thành công" });
            return BadRequest(new { message = "Thêm vào giỏ hàng thất bại" });
        }

        [HttpPut("{maCTGH}")]
        public IActionResult UpdateItem(string maCTGH, [FromBody] int soLuong)
        {
            bool result = _gioHangService.UpdateItem(maCTGH, soLuong);
            if (result) return Ok(new { message = "Cập nhật giỏ hàng thành công" });
            return BadRequest(new { message = "Cập nhật giỏ hàng thất bại" });
        }

        [HttpDelete("{maCTGH}")]
        public IActionResult DeleteItem(string maCTGH)
        {
            bool result = _gioHangService.DeleteItem(maCTGH);
            if (result) return Ok(new { message = "Xóa khỏi giỏ hàng thành công" });
            return BadRequest(new { message = "Xóa khỏi giỏ hàng thất bại" });
        }
    }
}
