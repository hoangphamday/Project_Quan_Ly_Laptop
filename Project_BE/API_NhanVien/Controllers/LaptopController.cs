using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Interfaces;

namespace API_NhanVien.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "NhanVien")]
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
    }
}
