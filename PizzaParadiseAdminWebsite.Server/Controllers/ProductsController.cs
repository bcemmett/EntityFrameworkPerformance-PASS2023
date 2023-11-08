using Microsoft.AspNetCore.Mvc;
using PizzaParadiseAdminWebsite.Server.Models;

namespace PizzaParadiseAdminWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly AdminWebsiteDbContext _db;

        public ProductsController(ILogger<ProductsController> logger, AdminWebsiteDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("list-categories")]
        public IEnumerable<object> GetCategories([FromQuery] PageModel pageModel)
        {
            var categories = _db.Categories
                .OrderBy(x => x.Id)
                .Skip(pageModel.PageSize * pageModel.Page)
                .Take(pageModel.PageSize)
                .ToList();

            return categories.Select(c => new{
                Id = c.Id,
                Name = c.Name,
                ProductCount = c.Products.Count(),
            });
        }
    }
}