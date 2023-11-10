using Microsoft.AspNetCore.Mvc;

namespace PizzaParadiseAdminWebsite.Server.Models;

public class AccountSearchModel : PageModel
{
    [FromQuery(Name = "name")]
    public string? Name { get; set; }
    [FromQuery(Name = "city")]
    public string? City { get; set; }
}