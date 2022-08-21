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
    public class SaladController : Controller
    {
        private readonly DataContext _context;

        public SaladController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Salad>>> GetAll()
        {
            var salads = await _context.Salads.Include(c => c.category).ToListAsync();
            return Ok(salads);
        }

        [HttpGet("{saladId}")]
        public async Task<ActionResult<List<Salad>>> GetById(int saladId)
        {
            var salad = await _context.Salads.Include(c => c.category).FirstOrDefaultAsync(c => c.SaladId == saladId);
            return Ok(salad);
        }

        [HttpPost]
        public async Task<ActionResult<List<Salad>>> AddSalad(InsertSaladDto saladDto)
        {
            if (saladDto == null)
                return BadRequest("Failed");

            var salad = new Salad
            {
                SaladName = saladDto.SaladName,
                SaladPrice = saladDto.SaladPrice,
                SaladDescription = saladDto.SaladDescription,
                categoryId = saladDto.categoryId
            };

            _context.Salads.Add(salad);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{saladId}")]
        public async Task<ActionResult<List<Salad>>> UpdatePasta(int saladId, InsertSaladDto saladDto)
        {
            var update = await _context.Salads.FirstOrDefaultAsync(c => c.SaladId == saladId);
            if (update == null)
                return BadRequest("Food not found");

            update.SaladName = saladDto.SaladName;
            update.SaladPrice = saladDto.SaladPrice;
            update.SaladDescription = saladDto.SaladDescription;
            update.categoryId = saladDto.categoryId;

            _context.Salads.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{saladId}")]

        public async Task<ActionResult<List<Salad>>> DeleteCategory(int saladId)
        {
            var delete = await _context.Salads.FirstOrDefaultAsync(c => c.SaladId == saladId);
            if (delete == null)
                return BadRequest("Food not found");

            _context.Salads.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
