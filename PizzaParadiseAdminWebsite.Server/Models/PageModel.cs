using Microsoft.AspNetCore.Mvc;

namespace PizzaParadiseAdminWebsite.Server.Models;

public class PageModel {
    [FromQuery(Name = "page")]
    public int Page { get; set; }
    [FromQuery(Name = "pageSize")]
    public int PageSize { get; set; }
}