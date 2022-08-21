using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Dtos.DrinksDto;
using RestaurantManagementSystem.Models.DrinksModels;

namespace RestaurantManagementSystem.Controllers.DrinksControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HotDrinksController : Controller
    {
        private readonly DataContext _context;

        public HotDrinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<HotDrink>>> GetAll()
        {
            var drinks = await _context.HotDrinks.Include(c => c.category).ToListAsync();
            return Ok(drinks);
        }

        [HttpGet("{drinkId}")]
        public async Task<ActionResult<List<HotDrink>>> GetById(int drinkId)
        {
            var drink = await _context.HotDrinks.Include(c => c.category).FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            return Ok(drink);
        }

        [HttpPost]
        public async Task<ActionResult<List<HotDrink>>> AddDrink(InsertHotDrinksDto hotDrinksDto)
        {
            if (hotDrinksDto == null)
                return BadRequest("Failed");

            var hotDrink = new HotDrink
            {
                DrinkName = hotDrinksDto.DrinkName,
                DrinkPrice = hotDrinksDto.DrinkPrice,
                DrinkDescription = hotDrinksDto.DrinkDescription,
                categoryId = hotDrinksDto.categoryId
            };

            _context.HotDrinks.Add(hotDrink);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{drinkId}")]
        public async Task<ActionResult<List<HotDrink>>> UpdateDrink(int drinkId, InsertHotDrinksDto hotDrinksDto)
        {
            var update = await _context.HotDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (update == null)
                return BadRequest("Drink not found");

            update.DrinkName = hotDrinksDto.DrinkName;
            update.DrinkPrice = hotDrinksDto.DrinkPrice;
            update.DrinkDescription = hotDrinksDto.DrinkDescription;
            update.categoryId = hotDrinksDto.categoryId;


            _context.HotDrinks.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{drinkId}")]

        public async Task<ActionResult<List<HotDrink>>> DeleteDrink(int drinkId)
        {
            var delete = await _context.HotDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (delete == null)
                return BadRequest("Drink not found");

            _context.HotDrinks.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
