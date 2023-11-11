using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.DbModel
{
    public class Category
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime Created { get; set; }
        public bool Enabled { get; set; }
        public int Priority { get; set; }

        [JsonIgnore]
        public virtual ICollection<Product>? Products { get ;set; }
    }
}