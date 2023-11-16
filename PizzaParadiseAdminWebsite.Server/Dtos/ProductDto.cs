namespace PizzaParadiseAdminWebsite.Server.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal CurrentPrice { get; set; }
        public decimal? SpecialPrice { get; set; }
        public bool Available { get; set; }
        public int CategoryId { get; set; }
    }
}