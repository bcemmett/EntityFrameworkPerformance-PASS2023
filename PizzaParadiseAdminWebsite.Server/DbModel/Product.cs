using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.DbModel
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal CurrentPrice { get; set; }
        public decimal? SpecialPrice { get; set; }
        public bool Available { get; set; }
        public int CategoryId { get; set; }
        public byte[]? Photo { get; set; }
        
        [JsonIgnore]
        public virtual Category? Category { get; set; }
    }
}