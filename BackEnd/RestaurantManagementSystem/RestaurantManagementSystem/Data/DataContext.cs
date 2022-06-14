global using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Models;
using RestaurantManagementSystem.Models.DrinksModels;
using RestaurantManagementSystem.Models.FoodModels;

namespace RestaurantManagementSystem.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<FoodCategory> FoodCategories { get; set; } 

        public DbSet<SeaFood> SeaFoods { get; set; }

        public DbSet<FastFood> FastFoods { get; set; }

        public DbSet<Pasta> Pastas { get; set; }

        public DbSet<TraditionalFood> TraditionalFoods { get; set; }

        

       
    }
}
