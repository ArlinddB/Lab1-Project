using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Models.FoodModels;

namespace RestaurantManagementSystem.Controllers.FoodControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SeaFoodController : Controller
    {
        private readonly DataContext _context;

        public SeaFoodController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SeaFood>>> GetAll()
        {
            var seaFoods = await _context.SeaFoods.Include(c => c.category).ToListAsync();
            return Ok(seaFoods);
        }

        [HttpGet("{foodId}")]
        public async Task<ActionResult<List<SeaFood>>> GetById(int foodId)
        {
            var seaFood = await _context.SeaFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(seaFood);
        }

        [HttpPost]
        public async Task<ActionResult<List<SeaFood>>> AddSeaFood(SeaFood seaFood)
        {
            if (seaFood == null)
                return BadRequest("Failed");

            _context.Entry(seaFood.category).State = EntityState.Unchanged;
            _context.SeaFoods.Add(seaFood);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<SeaFood>>> UpdateSeaFood(int foodId, SeaFood seaFood)
        {
            var update = await _context.SeaFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = seaFood.FoodName;
            update.FoodPrice = seaFood.FoodPrice;
            update.categoryId = seaFood.categoryId;
            update.FoodDescription = seaFood.FoodDescription;
            update.categoryId = seaFood.categoryId;
            update.category = seaFood.category;

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{foodId}")]

        public async Task<ActionResult<List<SeaFood>>> DeleteCategory(int foodId)
        {
            var delete = await _context.SeaFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (delete == null)
                return BadRequest("Food not found");

            _context.SeaFoods.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
