using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Dtos.DrinksDto;
using RestaurantManagementSystem.Models;
using RestaurantManagementSystem.Models.DrinksModels;

namespace RestaurantManagementSystem.Controllers.DrinksControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AlcoholicDrinksController : Controller
    {
        private readonly DataContext _context;

        public AlcoholicDrinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AlcoholicDrink>>> GetAll()
        {
            var drinks = await _context.AlcoholicDrinks.Include(c => c.category).ToListAsync();
            return Ok(drinks);
        }

        [HttpGet("{drinkId}")]
        public async Task<ActionResult<List<AlcoholicDrink>>> GetById(int drinkId)
        {
            var drink = await _context.AlcoholicDrinks.Include(c => c.category).FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            return Ok(drink);
        }

        [HttpPost]
        public async Task<IActionResult> AddDrink(InsertAlcoholicDrinksDto alcoholicDrinkDto)
        {
            if (alcoholicDrinkDto == null)
                return BadRequest("Failed");

            var alcoholicdrink = new AlcoholicDrink
            {
                DrinkName = alcoholicDrinkDto.DrinkName,
                DrinkPrice = alcoholicDrinkDto.DrinkPrice,
                DrinkDescription = alcoholicDrinkDto.DrinkDescription,
                categoryId = alcoholicDrinkDto.categoryId
            };

            _context.AlcoholicDrinks.Add(alcoholicdrink);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{drinkId}")]
        public async Task<ActionResult<List<AlcoholicDrink>>> UpdateDrink(int drinkId, InsertAlcoholicDrinksDto alcoholicDrinkDto)
        {
            var update = await _context.AlcoholicDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (update == null)
                return BadRequest("Drink not found");

            update.DrinkName = alcoholicDrinkDto.DrinkName;
            update.DrinkPrice = alcoholicDrinkDto.DrinkPrice;
            update.DrinkDescription = alcoholicDrinkDto.DrinkDescription;
            update.categoryId = alcoholicDrinkDto.categoryId;


            _context.AlcoholicDrinks.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{drinkId}")]

        public async Task<ActionResult<List<AlcoholicDrink>>> DeleteDrink(int drinkId)
        {
            var delete = await _context.AlcoholicDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (delete == null)
                return BadRequest("Drink not found");

            _context.AlcoholicDrinks.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
