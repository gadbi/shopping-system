using Microsoft.EntityFrameworkCore;
using ShoppingApi.Models;

namespace ShoppingApi.Data
{
    public class ShoppingContext : DbContext
    {
        public ShoppingContext(DbContextOptions<ShoppingContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "פירות וירקות", Description = "מוצרים טריים" },
                new Category { Id = 2, Name = "מוצרי חלב", Description = "חלב, גבינות ויוגורטים" },
                new Category { Id = 3, Name = "בשר ודגים", Description = "מוצרי בשר טריים" },
                new Category { Id = 4, Name = "לחמים ומאפים", Description = "לחם טרי ומאפים" },
                new Category { Id = 5, Name = "מוצרים יבשים", Description = "אורז, פסטה וקטניות" },
                new Category { Id = 6, Name = "משקאות", Description = "מים, מיצים ומשקאות קלים" }
            );
        }
    }
}
