using Microsoft.AspNetCore.Mvc;
using PizzaParadiseAdminWebsite.Server.DbModel;
using PizzaParadiseAdminWebsite.Server.Dtos;

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
                ProductCount = c.Products?.Count(),
            });
        }

        [HttpGet]
        [Route("list-products")]
        public IEnumerable<Product> GetProducts([FromQuery] PageModel pageModel)
        {
            return _db.Products
                .OrderBy(x => x.Name)
                .Skip(pageModel.PageSize * pageModel.Page)
                .Take(pageModel.PageSize)
                .ToList();
        }

        [HttpGet]
        [Route("apply-spot-discount-to-category")]
        public void MarkAvailability(int categoryId)
        {
            var products = _db.Products
                .Where(x => x.CategoryId == categoryId);
            
            foreach(var product in products)
            {
                product.SpecialPrice = product.CurrentPrice * 0.9m;
            }

            _db.SaveChanges();
        }
    }
}