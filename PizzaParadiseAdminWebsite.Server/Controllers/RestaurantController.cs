using Microsoft.AspNetCore.Mvc;
using PizzaParadiseAdminWebsite.Server.Models;
using PizzaParadiseAdminWebsite.Server;

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
        public IEnumerable<Restaurant> Get()
        {
            return _db.Restaurants.ToList();            
        }
    }
}
