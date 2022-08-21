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
    public class NonAlcoholicDrinksController : Controller
    {
        private readonly DataContext _context;

        public NonAlcoholicDrinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<NonAlcoholicDrink>>> GetAll()
        {
            var drinks = await _context.NonAlcoholicDrinks.Include(c => c.category).ToListAsync();
            return Ok(drinks);
        }

        [HttpGet("{drinkId}")]
        public async Task<ActionResult<List<NonAlcoholicDrink>>> GetById(int drinkId)
        {
            var drink = await _context.NonAlcoholicDrinks.Include(c => c.category).FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            return Ok(drink);
        }

        [HttpPost]
        public async Task<ActionResult<List<NonAlcoholicDrink>>> AddDrink(InsertNonAlcoholicDrinksDto nonAlcoholicDrinkDto)
        {
            if (nonAlcoholicDrinkDto == null)
                return BadRequest("Failed");

            var nonAlcoholicDrink = new NonAlcoholicDrink
            {
                DrinkName = nonAlcoholicDrinkDto.DrinkName,
                DrinkPrice = nonAlcoholicDrinkDto.DrinkPrice,
                DrinkDescription = nonAlcoholicDrinkDto.DrinkDescription,
                categoryId = nonAlcoholicDrinkDto.categoryId
            };

            _context.NonAlcoholicDrinks.Add(nonAlcoholicDrink);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{drinkId}")]
        public async Task<ActionResult<List<NonAlcoholicDrink>>> UpdateDrink(int drinkId, InsertNonAlcoholicDrinksDto nonAlcoholicDrinkDto)
        {
            var update = await _context.NonAlcoholicDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (update == null)
                return BadRequest("Drink not found");

            update.DrinkName = nonAlcoholicDrinkDto.DrinkName;
            update.DrinkPrice = nonAlcoholicDrinkDto.DrinkPrice;
            update.DrinkDescription = nonAlcoholicDrinkDto.DrinkDescription;
            update.categoryId = nonAlcoholicDrinkDto.categoryId;


            _context.NonAlcoholicDrinks.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{drinkId}")]

        public async Task<ActionResult<List<NonAlcoholicDrink>>> DeleteDrink(int drinkId)
        {
            var delete = await _context.NonAlcoholicDrinks.FirstOrDefaultAsync(c => c.DrinkId == drinkId);
            if (delete == null)
                return BadRequest("Drink not found");

            _context.NonAlcoholicDrinks.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
