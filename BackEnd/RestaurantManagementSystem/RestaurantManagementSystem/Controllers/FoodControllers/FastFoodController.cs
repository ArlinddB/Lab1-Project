using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Dtos.FoodDto;
using RestaurantManagementSystem.Models.FoodModels;

namespace RestaurantManagementSystem.Controllers.FoodControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FastFoodController : Controller
    {
        private readonly DataContext _context;

        public FastFoodController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<FastFood>>> GetAll()
        {
            var fastFoods = await _context.FastFoods.Include(c => c.category).ToListAsync();
            return Ok(fastFoods);
        }

        [HttpGet("{foodId}")]
        public async Task<ActionResult<List<FastFood>>> GetById(int foodId)
        {
            var fastFood = await _context.FastFoods.Include(c => c.category).FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(fastFood);
        }

        [HttpPost]
        public async Task<ActionResult<List<FastFood>>> AddFastFood(InsertFastFoodDto fastFoodDto)
        {
            if (fastFoodDto == null)
                return BadRequest("Failed");

            var fastfood = new FastFood
            {
                FoodName = fastFoodDto.FoodName,
                FoodPrice = fastFoodDto.FoodPrice,
                FoodDescription = fastFoodDto.FoodDescription,
                categoryId = fastFoodDto.categoryId
            };

            _context.FastFoods.Add(fastfood);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<FastFood>>> UpdateFastFood(int foodId, InsertFastFoodDto fastFoodDto)
        {
            var update = await _context.FastFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = fastFoodDto.FoodName;
            update.FoodPrice = fastFoodDto.FoodPrice;
            update.FoodDescription = fastFoodDto.FoodDescription;
            update.categoryId = fastFoodDto.categoryId;

            _context.FastFoods.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{foodId}")]

        public async Task<ActionResult<List<FastFood>>> DeleteCategory(int foodId)
        {
            var delete = await _context.FastFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (delete == null)
                return BadRequest("Food not found");

            _context.FastFoods.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}

