namespace PizzaParadiseAdminWebsite.Server.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public string? Phone { get; set; }
    }
}