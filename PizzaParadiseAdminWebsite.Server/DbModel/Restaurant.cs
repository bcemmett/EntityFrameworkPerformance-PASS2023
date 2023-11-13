using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.DbModel
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PostalCode { get; set; }

        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get ;set; }
    }
}