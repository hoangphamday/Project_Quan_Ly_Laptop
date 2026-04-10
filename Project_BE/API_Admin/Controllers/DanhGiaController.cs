using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DanhGiaController : ControllerBase
    {
        private readonly IDanhGiaService _danhGiaService;

        public DanhGiaController(IDanhGiaService danhGiaService)
        {
            _danhGiaService = danhGiaService;
        }

        // Method Duyệt chưa có store, admin tạm thời có quyền xóa
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            bool result = _danhGiaService.Delete(id);
            if (result) return Ok(new { message = "Xóa đánh giá thành công" });
            return BadRequest(new { message = "Xóa đánh giá thất bại" });
        }
    }
}
