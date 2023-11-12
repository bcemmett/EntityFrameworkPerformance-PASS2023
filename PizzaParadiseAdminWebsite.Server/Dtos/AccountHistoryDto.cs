using PizzaParadiseAdminWebsite.Server.DbModel;

namespace PizzaParadiseAdminWebsite.Server.Dtos;

public class AccountHistoryDto
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public IEnumerable<PaymentCard> PaymentCards { get; set; }
    public IEnumerable<Address> Addresses { get; set; }
}