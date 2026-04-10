using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BLL.Interfaces;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ThongKeController : ControllerBase
    {
        private readonly IThongKeService _thongKeService;

        public ThongKeController(IThongKeService thongKeService)
        {
            _thongKeService = thongKeService;
        }

        [HttpGet("doanhthu")]
        public IActionResult GetDoanhThu([FromQuery] DateTime tuNgay, [FromQuery] DateTime denNgay)
        {
            return Ok(_thongKeService.GetDoanhThu(tuNgay, denNgay));
        }
    }
}
