using Microsoft.EntityFrameworkCore;
using PizzaParadiseAdminWebsite.Server.DbModel;

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
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(e => e.Category)
                .WithMany(e => e.Products)
                .HasForeignKey(e => e.CategoryId);

            modelBuilder.Entity<Order>()
                .HasOne(e => e.Account)
                .WithMany(e => e.Orders)
                .HasForeignKey(e => e.AccountId);

            modelBuilder.Entity<Order>()
                .HasOne(e => e.Restaurant)
                .WithMany(e => e.Orders)
                .HasForeignKey(e => e.RestaurantId);
        }
    }
}