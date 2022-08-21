using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly DataContext _context;

        public DashboardController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Dashboard>>> Get()
        {
            var countRoles = await _context.Roles.CountAsync();
            var countEmployees = await _context.Employees.CountAsync();
            var countFoodCategories = await _context.FoodCategories.CountAsync();
            var countSeaFood = await _context.SeaFoods.CountAsync();
            var countFastFood = await _context.FastFoods.CountAsync();
            var countPasta = await _context.Pastas.CountAsync();
            var countTraditionalFood = await _context.TraditionalFoods.CountAsync();
            var countDrinkCategories = await _context.DrinksCategories.CountAsync();
            var countAlcoholicDrinks = await _context.AlcoholicDrinks.CountAsync();
            var countNonAlcoholicDrinks = await _context.NonAlcoholicDrinks.CountAsync();
            var countHotDrinks = await _context.HotDrinks.CountAsync();
            var countColdDrinks = await _context.ColdDrinks.CountAsync();
            var countTables = await _context.Tables.CountAsync();
            var countReservations = await _context.Reservations.CountAsync();

            var result = new Dashboard
            {
                CountRoles = countRoles,
                CountEmployees = countEmployees,
                CountFoodCategories = countFoodCategories,
                CountSeaFood = countSeaFood,
                CountFastFood = countFastFood,
                CountPasta = countPasta,
                CountTraditionalFood = countTraditionalFood,
                CountDrinkCategories = countDrinkCategories,
                CountAlcoholicDrinks = countAlcoholicDrinks,
                CountNonAlcoholicDrinks = countNonAlcoholicDrinks,
                CountHotDrinks = countHotDrinks,
                CountColdDrinks = countColdDrinks,
                CountTables = countTables,
                CountReservations = countReservations,
            };

            return Ok(result);
        }
    }
}
