using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Models.FoodModels;

namespace RestaurantManagementSystem.Controllers.FoodControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TraditonalFoodController : Controller
    {
        private readonly DataContext _context;

        public TraditonalFoodController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TraditionalFood>>> GetAll()
        {
            var traditionals = await _context.TraditionalFoods.Include(c => c.category).ToListAsync();
            return Ok(traditionals);
        }

        [HttpGet("{foodId}")]
        public async Task<ActionResult<List<TraditionalFood>>> GetById(int foodId)
        {
            var traditional = await _context.TraditionalFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(traditional);
        }

        [HttpPost]
        public async Task<ActionResult<List<TraditionalFood>>> AddTraditonalFood(TraditionalFood traditionalFood)
        {
            if (traditionalFood == null)
                return BadRequest("Failed");

            _context.Entry(traditionalFood.category).State = EntityState.Unchanged;
            _context.TraditionalFoods.Add(traditionalFood);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<TraditionalFood>>> UpdateTraditionalFood(int foodId, TraditionalFood traditionalFood)
        {
            var update = await _context.TraditionalFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = traditionalFood.FoodName;
            update.FoodPrice = traditionalFood.FoodPrice;
            update.categoryId = traditionalFood.categoryId;
            update.FoodDescription = traditionalFood.FoodDescription;
            update.categoryId = traditionalFood.categoryId;
            update.category = traditionalFood.category;

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{foodId}")]

        public async Task<ActionResult<List<TraditionalFood>>> DeleteCategory(int foodId)
        {
            var delete = await _context.TraditionalFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (delete == null)
                return BadRequest("Food not found");

            _context.TraditionalFoods.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
