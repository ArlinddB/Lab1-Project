global using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RestaurantManagementSystem.Models;
using RestaurantManagementSystem.Models.OrderModels;
using RestaurantManagementSystem.Models.DrinksModels;
using RestaurantManagementSystem.Models.FoodModels;
using RestaurantManagementSystem.Models.ReservationModel;
using RestaurantManagementSystem.Models.TableModel;

namespace RestaurantManagementSystem.Data
{
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<FoodCategory> FoodCategories { get; set; } 

        public DbSet<SeaFood> SeaFoods { get; set; }

        public DbSet<FastFood> FastFoods { get; set; }

        public DbSet<Pasta> Pastas { get; set; }

        public DbSet<TraditionalFood> TraditionalFoods { get; set; }

        public DbSet<DrinksCategory> DrinksCategories { get; set; }

        public DbSet<NonAlcoholicDrink> NonAlcoholicDrinks { get; set; }

        public DbSet<AlcoholicDrink> AlcoholicDrinks { get; set; }   

        public DbSet<ColdDrink> ColdDrinks { get; set; }

        public DbSet<HotDrink> HotDrinks { get; set; }

        public DbSet<Table> Tables { get; set; } 

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<Salad> Salads { get; set; }
        public DbSet<OrderMaster> OrderMasters { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

    }
}
