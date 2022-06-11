using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Models.FoodModels;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class FoodCategoryController : Controller
    {
        private readonly DataContext _context;

        public FoodCategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<FoodCategory>>> GetAll()
        {
            var categories = await _context.FoodCategories.ToListAsync();
            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<List<FoodCategory>>> GetById(int categoryId)
        {
            var category = await _context.FoodCategories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            return Ok(category);    
        }

        [HttpPost]
        public async Task<ActionResult<List<FoodCategory>>> AddFoodCategory(FoodCategory foodCategory)
        {
            var addCategory = _context.FoodCategories.Add(foodCategory);
            await _context.SaveChangesAsync();

            if (addCategory == null)
                return BadRequest("Failed");

            return Ok("Added successfuly");
        }

        [HttpPut("{categoryId}")]
        public async Task<ActionResult<List<FoodCategory>>> UpdateFoodCategory(int categoryId, FoodCategory foodCategory)
        {
            var update = await _context.FoodCategories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            if (update == null)
                return BadRequest("Category not found");

            update.CategoryName = foodCategory.CategoryName;

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");

        }

        [HttpDelete("{categoryId}")]

        public async Task<ActionResult<List<FoodCategory>>> DeleteCategory(int categoryId)
        {
            var delete = await _context.FoodCategories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            if (delete == null)
                return BadRequest("Category not found");

            _context.FoodCategories.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
