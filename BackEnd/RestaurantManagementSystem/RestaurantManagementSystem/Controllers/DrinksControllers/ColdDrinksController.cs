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
    public class ColdDrinksController : Controller
    {
        private readonly DataContext _context;

        public ColdDrinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ColdDrink>>> GetAll()
        {
            var drinks = await _context.ColdDrinks.Include(c => c.category).ToListAsync();
            return Ok(drinks);
        }

        [HttpGet("{drinkId}")]
        public async Task<ActionResult<List<ColdDrink>>> GetById(int drinkId)
        {
            var drink = await _context.ColdDrinks.Include(c => c.category).FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            return Ok(drink);
        }

        [HttpPost]
        public async Task<ActionResult<List<ColdDrink>>> AddDrink(InsertColdDrinksDto coldDrinksDto)
        {
            if (coldDrinksDto == null)
                return BadRequest("Failed");

            var coldDrink = new ColdDrink
            {
                DrinkName = coldDrinksDto.DrinkName,
                DrinkPrice = coldDrinksDto.DrinkPrice,
                DrinkDescription = coldDrinksDto.DrinkDescription,
                categoryId = coldDrinksDto.categoryId
            };

            _context.ColdDrinks.Add(coldDrink);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{drinkId}")]
        public async Task<ActionResult<List<ColdDrink>>> UpdateDrink(int drinkId, InsertColdDrinksDto coldDrinksDto)
        {
            var update = await _context.ColdDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (update == null)
                return BadRequest("Drink not found");

            update.DrinkName = coldDrinksDto.DrinkName;
            update.DrinkPrice = coldDrinksDto.DrinkPrice;
            update.DrinkDescription = coldDrinksDto.DrinkDescription;
            update.categoryId = coldDrinksDto.categoryId;


            _context.ColdDrinks.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{drinkId}")]

        public async Task<ActionResult<List<ColdDrink>>> DeleteDrink(int drinkId)
        {
            var delete = await _context.ColdDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (delete == null)
                return BadRequest("Drink not found");

            _context.ColdDrinks.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
