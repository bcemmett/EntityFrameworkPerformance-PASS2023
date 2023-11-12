using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaParadiseAdminWebsite.Server.DbModel;
using PizzaParadiseAdminWebsite.Server.Dtos;

namespace PizzaParadiseAdminWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly AdminWebsiteDbContext _db;

        public AccountController(ILogger<AccountController> logger, AdminWebsiteDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpPost]
        [Route("search")]
        public IEnumerable<Account> Post([FromQuery] PageModel pageModel, [FromBody] AccountSearchModel searchModel)
        {
            return _db.Accounts
                .OrderBy(x => x.Id)
                .ToList()
                .Where(x => (x.Name == searchModel.Name || String.IsNullOrWhiteSpace(searchModel.Name))
                    && (x.City == searchModel.City || String.IsNullOrWhiteSpace(searchModel.City)));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Account))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Route("get-by-email")]
        public IActionResult Get(string email)
        {
            var accounts = _db.Accounts
                .Where(x => x.Email == email)
                .ToList();

            if(accounts.Any()){
                return Ok(accounts.First());
            } else {
                return NotFound();
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AccountHistoryDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Route("get-full-account-details-by-id")]
        public IActionResult GetFullDetails(int id)
        {
            var account = _db.Accounts
                .Where(a => a.Id == id)
                .Include(a => a.PaymentCards)
                .Include(a => a.Addresses)
                .Select(a => new AccountHistoryDto
                {
                    Id = a.Id,
                    Email = a.Email,
                    PaymentCards = a.PaymentCards,
                    Addresses = a.Addresses,
                })
                .FirstOrDefault();

            if(account != null){
                return Ok(account);
            } else {
                return NotFound();
            }
        }
    }
}