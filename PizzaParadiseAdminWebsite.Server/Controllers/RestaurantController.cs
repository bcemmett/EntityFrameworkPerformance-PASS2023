using Microsoft.AspNetCore.Mvc;
using PizzaParadiseAdminWebsite.Server.Models;

namespace PizzaParadiseAdminWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        private readonly ILogger<RestaurantController> _logger;

        public RestaurantController(ILogger<RestaurantController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("list-restaurants")]
        public IEnumerable<Restaurant> Get()
        {
            Restaurant[] restaurants = new[]
            {
                new Restaurant { id = 1, name = "Restaurant 1", phone = "0123456789"},
                new Restaurant { id = 2, name = "Restaurant 2", phone = "3456789012"},
                new Restaurant { id = 3, name = "Restaurant 3", phone = "6789012345"},
                new Restaurant { id = 4, name = "Restaurant 4", phone = "987654321"},
                new Restaurant { id = 5, name = "Restaurant 5", phone = "185963"},
                new Restaurant { id = 6, name = "Restaurant 5", phone = "654987"},
            };
            return restaurants;
        }
    }
}
