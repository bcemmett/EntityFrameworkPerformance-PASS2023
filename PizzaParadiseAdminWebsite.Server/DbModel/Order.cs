using System.Text.Json.Serialization;

namespace PizzaParadiseAdminWebsite.Server.DbModel
{
    public class Order
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int RestaurantId { get; set; }
        public DateTime TimeReceived { get; set; }
        public DateTime? TimeAccepted { get; set; }
        public DateTime? TimeDispatched { get; set; }
        public DateTime? TimeDelivered { get; set; }
        public decimal SubTotal { get; set; }
        public decimal TaxCharged { get; set; }
        public decimal Total { get; set; }
        public DateTime? TimeRefunded { get; set; }
        public string? RestaurantNotes { get; set; }
        public string? VoucherCode { get; set; }
        
        [JsonIgnore]
        public virtual Restaurant? Restaurant { get; set; }

        [JsonIgnore]
        public virtual Account? Account { get; set; }

    }
}