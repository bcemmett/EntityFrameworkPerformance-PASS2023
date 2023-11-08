using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? CurrentPrice { get; set; }
        public bool Available { get; set; }
        public int CategoryId { get; set; }
        
        [JsonIgnore]
        public virtual Category Category { get; set; }
    }
}