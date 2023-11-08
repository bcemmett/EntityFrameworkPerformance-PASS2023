using Microsoft.EntityFrameworkCore;
using PizzaParadiseAdminWebsite.Server.Models;

namespace PizzaParadiseAdminWebsite.Server
{
    public class AdminWebsiteDbContext : DbContext
    {
        public AdminWebsiteDbContext(DbContextOptions<AdminWebsiteDbContext> options)
            : base(options)
        {
        }

        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Account> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer();
        }
    }
}