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
            var traditional = await _context.TraditionalFoods.Include(c => c.category).FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(traditional);
        }

        [HttpPost]
        public async Task<ActionResult<List<TraditionalFood>>> AddTraditonalFood(InsertTraditionalFoodDto traditionalFoodDto)
        {
            if (traditionalFoodDto == null)
                return BadRequest("Failed");

            var traditionalfood = new TraditionalFood
            {
                FoodName = traditionalFoodDto.FoodName,
                FoodPrice = traditionalFoodDto.FoodPrice,
                FoodDescription = traditionalFoodDto.FoodDescription,
                categoryId = traditionalFoodDto.categoryId
            };


            _context.TraditionalFoods.Add(traditionalfood);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<TraditionalFood>>> UpdateTraditionalFood(int foodId, InsertTraditionalFoodDto traditionalFoodDto)
        {
            var update = await _context.TraditionalFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = traditionalFoodDto.FoodName;
            update.FoodPrice = traditionalFoodDto.FoodPrice;
            update.categoryId = traditionalFoodDto.categoryId;
            update.FoodDescription = traditionalFoodDto.FoodDescription;
            update.categoryId = traditionalFoodDto.categoryId;

            _context.TraditionalFoods.Update(update);
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
