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
            var pasta = await _context.Pastas.Include(c => c.category).FirstOrDefaultAsync(c => c.FoodId == foodId);
            return Ok(pasta);
        }

        [HttpPost]
        public async Task<ActionResult<List<Pasta>>> AddPasta(InsertPastaDto pastaDto)
        {
            if (pastaDto == null)
                return BadRequest("Failed");

            var pasta = new Pasta
            {
                FoodName = pastaDto.FoodName,
                FoodPrice = pastaDto.FoodPrice,
                FoodDescription = pastaDto.FoodDescription,
                categoryId = pastaDto.categoryId
            };

            _context.Pastas.Add(pasta);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{foodId}")]
        public async Task<ActionResult<List<Pasta>>> UpdatePasta(int foodId, InsertPastaDto pastaDto)
        {
            var update = await _context.Pastas.FirstOrDefaultAsync(c => c.FoodId == foodId);
            if (update == null)
                return BadRequest("Food not found");

            update.FoodName = pastaDto.FoodName;
            update.FoodPrice = pastaDto.FoodPrice;
            update.categoryId = pastaDto.categoryId;
            update.FoodDescription = pastaDto.FoodDescription;
            update.categoryId = pastaDto.categoryId;

            _context.Pastas.Update(update);
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
