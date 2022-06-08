global using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Models;
//using RestaurantManagementSystem.Models.User;

namespace RestaurantManagementSystem.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Food> Foods { get; set; }

        public DbSet<Drinks> Drinks { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
