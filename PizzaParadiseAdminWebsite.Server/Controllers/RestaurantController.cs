using Microsoft.AspNetCore.Mvc;
using PizzaParadiseAdminWebsite.Server.Models;

namespace PizzaParadiseAdminWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        private readonly ILogger<RestaurantController> _logger;
        private readonly AdminWebsiteDbContext _db;

        public RestaurantController(ILogger<RestaurantController> logger, AdminWebsiteDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("list-restaurants")]
        public IEnumerable<Restaurant> Get([FromQuery] PageModel pageModel)
        {
            return _db.Restaurants
                .OrderBy(x => x.Id)
                .ToList()
                .Skip(pageModel.PageSize * pageModel.Page)
                .Take(pageModel.PageSize);                
        }
    }
}