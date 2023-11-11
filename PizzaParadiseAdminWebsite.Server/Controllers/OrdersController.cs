using Microsoft.AspNetCore.Mvc;
using PizzaParadiseAdminWebsite.Server.DbModel;
using PizzaParadiseAdminWebsite.Server.Dtos;

namespace PizzaParadiseAdminWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly AdminWebsiteDbContext _db;

        public OrdersController(ILogger<OrdersController> logger, AdminWebsiteDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("list-recent-orders")]
        public IEnumerable<object> GetRecentOrders([FromQuery] PageModel pageModel)
        {
            var orders = _db.Orders
                .OrderByDescending(x => x.Id)
                .Skip(pageModel.PageSize * pageModel.Page)
                .Take(pageModel.PageSize)
                .ToList();

            return orders.Select(o => new{
                Id = o.Id,
                Restaurant = o.Restaurant?.Name,
                TimeReceived = o.TimeReceived,
                Total = o.Total,
                VoucherCode = o.VoucherCode,
            });
        }
    }
}