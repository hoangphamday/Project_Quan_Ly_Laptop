using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class NhanVienController : ControllerBase
    {
        private readonly INhanVienService _nhanVienService;

        public NhanVienController(INhanVienService nhanVienService)
        {
            _nhanVienService = nhanVienService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_nhanVienService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var result = _nhanVienService.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] NhanVien nv)
        {
            bool result = _nhanVienService.Create(nv);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPut]
        public IActionResult Update([FromBody] NhanVien nv)
        {
            bool result = _nhanVienService.Update(nv);
            if (result) return Ok(new { message = "Cập nhật thành công" });
            return BadRequest(new { message = "Cập nhật thất bại" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            bool result = _nhanVienService.Delete(id);
            if (result) return Ok(new { message = "Xóa thành công" });
            return BadRequest(new { message = "Xóa thất bại" });
        }
    }
}
