using Microsoft.AspNetCore.Mvc;
using StackExchange.Profiling;

namespace PizzaParadiseAdminWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilerController : ControllerBase
    {
        private readonly ILogger<ProfilerController> _logger;

        public ProfilerController(ILogger<ProfilerController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("get-script-include")]
        public string GetProfilerScript()
        {
            return MiniProfiler.Current?.RenderIncludes(HttpContext).Value;
        }
    }
}