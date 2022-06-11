using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Models.FoodModels;

namespace RestaurantManagementSystem.Controllers.FoodControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PastaController : Controller
    {
        private readonly DataContext _context;

        public PastaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Pasta>>> GetAll()
        {
            var pasta = await _context.Pastas.Include(c => c.category).ToListAsync();
            return Ok(pasta);
        }

        [HttpGet("{foodId}")]
        public async Task<ActionResult<List<Pasta>>> GetById(int foodId)
        {
            var pasta = await _context.Pastas.FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(pasta);
        }

        [HttpPost]
        public async Task<ActionResult<List<Pasta>>> AddPasta(Pasta pasta)
        {
            if (pasta == null)
                return BadRequest("Failed");

            _context.Entry(pasta.category).State = EntityState.Unchanged;
            _context.Pastas.Add(pasta);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<Pasta>>> UpdatePasta(int foodId, Pasta pasta)
        {
            var update = await _context.Pastas.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = pasta.FoodName;
            update.FoodPrice = pasta.FoodPrice;
            update.categoryId = pasta.categoryId;
            update.FoodDescription = pasta.FoodDescription;
            update.categoryId = pasta.categoryId;
            update.category = pasta.category;

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{foodId}")]

        public async Task<ActionResult<List<Pasta>>> DeleteCategory(int foodId)
        {
            var delete = await _context.Pastas.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (delete == null)
                return BadRequest("Food not found");

            _context.Pastas.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
