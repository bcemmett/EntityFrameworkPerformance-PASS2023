using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.DbModel
{
    public class PaymentCard
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string? NickName { get; set; }
        public string? CardType { get; set; }
        public string? CardNumber { get; set; }
        public string? StartDate { get; set; }
        public string? ExpiryDate { get; set; }
        public string? Cvc { get; set; }
        

        [JsonIgnore]
        public virtual Account? Account { get; set; }

    }
}