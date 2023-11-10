using Microsoft.AspNetCore.Mvc;

namespace PizzaParadiseAdminWebsite.Server.Dtos;

public class AccountSearchModel
{
    [FromQuery(Name = "name")]
    public string? Name { get; set; }
    [FromQuery(Name = "city")]
    public string? City { get; set; }
}