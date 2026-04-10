using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class LaptopController : ControllerBase
    {
        private readonly ILaptopService _laptopService;

        public LaptopController(ILaptopService laptopService)
        {
            _laptopService = laptopService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_laptopService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var result = _laptopService.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Laptop laptop)
        {
            bool result = _laptopService.Create(laptop);
            if (result) return Ok(new { message = "Thêm thành công" });
            return BadRequest(new { message = "Thêm thất bại" });
        }

        [HttpPut]
        public IActionResult Update([FromBody] Laptop laptop)
        {
            bool result = _laptopService.Update(laptop);
            if (result) return Ok(new { message = "Cập nhật thành công" });
            return BadRequest(new { message = "Cập nhật thất bại" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            bool result = _laptopService.Delete(id);
            if (result) return Ok(new { message = "Xóa thành công" });
            return BadRequest(new { message = "Xóa thất bại" });
        }
    }
}
