using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Models.DrinksModels;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DrinksCategoryController : Controller
    {
        private readonly DataContext _context;

        public DrinksCategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<DrinksCategory>>> GetAll()
        {
            var categories = await _context.DrinksCategories.ToListAsync();
            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<List<DrinksCategory>>> GetById(int categoryId)
        {
            var category = await _context.DrinksCategories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<List<DrinksCategory>>> AddFoodCategory(DrinksCategory drinksCategory)
        {
            var addCategory = _context.DrinksCategories.Add(drinksCategory);
            await _context.SaveChangesAsync();

            if (addCategory == null)
                return BadRequest("Failed");

            return Ok("Added successfuly");
        }

        [HttpPut("{categoryId}")]
        public async Task<ActionResult<List<DrinksCategory>>> UpdateFoodCategory(int categoryId, DrinksCategory drinksCategory)
        {
            var update = await _context.DrinksCategories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            if (update == null)
                return BadRequest("Category not found");

            update.CategoryName = drinksCategory.CategoryName;

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");

        }

        [HttpDelete("{categoryId}")]

        public async Task<ActionResult<List<DrinksCategory>>> DeleteCategory(int categoryId)
        {
            var delete = await _context.DrinksCategories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            if (delete == null)
                return BadRequest("Category not found");

            _context.DrinksCategories.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
