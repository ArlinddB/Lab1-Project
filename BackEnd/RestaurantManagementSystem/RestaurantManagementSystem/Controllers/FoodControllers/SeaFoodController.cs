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
            var seaFood = await _context.SeaFoods.Include(c => c.category).FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(seaFood);
        }

        [HttpPost]
        public async Task<ActionResult<List<SeaFood>>> AddSeaFood(InsertSeaFoodDto seaFoodDto)
        {
            if (seaFoodDto == null)
                return BadRequest("Failed");

            var seafood = new SeaFood
            {
                FoodName = seaFoodDto.FoodName,
                FoodPrice = seaFoodDto.FoodPrice,
                FoodDescription = seaFoodDto.FoodDescription,
                categoryId = seaFoodDto.categoryId
            };


            _context.SeaFoods.Add(seafood);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<SeaFood>>> UpdateSeaFood(int foodId, InsertSeaFoodDto seaFoodDto)
        {
            var update = await _context.SeaFoods.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = seaFoodDto.FoodName;
            update.FoodPrice = seaFoodDto.FoodPrice;
            update.categoryId = seaFoodDto.categoryId;
            update.FoodDescription = seaFoodDto.FoodDescription;
            update.categoryId = seaFoodDto.categoryId;

            _context.SeaFoods.Update(update);
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
