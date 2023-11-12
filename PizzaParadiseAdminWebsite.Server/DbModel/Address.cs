using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.DbModel
{
    public class Address
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string? NickName { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        

        [JsonIgnore]
        public virtual Account? Account { get; set; }

    }
}