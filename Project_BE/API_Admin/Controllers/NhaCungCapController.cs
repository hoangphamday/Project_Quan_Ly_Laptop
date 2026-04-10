using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class NhaCungCapController : ControllerBase
    {
        private readonly INhaCungCapService _nhaCungCapService;

        public NhaCungCapController(INhaCungCapService nhaCungCapService)
        {
            _nhaCungCapService = nhaCungCapService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_nhaCungCapService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var result = _nhaCungCapService.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] NhaCungCap ncc)
        {
            bool result = _nhaCungCapService.Create(ncc);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPut]
        public IActionResult Update([FromBody] NhaCungCap ncc)
        {
            bool result = _nhaCungCapService.Update(ncc);
            if (result) return Ok(new { message = "Cập nhật thành công" });
            return BadRequest(new { message = "Cập nhật thất bại" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            bool result = _nhaCungCapService.Delete(id);
            if (result) return Ok(new { message = "Xóa thành công" });
            return BadRequest(new { message = "Xóa thất bại" });
        }
    }
}
