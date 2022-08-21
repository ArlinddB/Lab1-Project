using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Models.TableModel;

namespace RestaurantManagementSystem.Controllers.TableController
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TableController : ControllerBase
    {
        private readonly DataContext _context;


        public TableController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Table>>> Get()
        {
            var tables = await _context.Tables.ToListAsync();
            return Ok(tables);
        }

        [HttpGet("{tableId}")]
        public async Task<ActionResult<List<Table>>> GetByTableId(int tableId)
        {
            var table = await _context.Tables.FirstOrDefaultAsync(c => c.TableId == tableId);
            return Ok(table);
        }


        [HttpPost]
        public async Task<ActionResult<List<Table>>> AddTable(Table table)
        {
            var addTable = _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            if (addTable == null)
                return Ok("Failed");
            return Ok("Added succesfuly");
        }


        [HttpPut("{tableId}")]
        public async Task<ActionResult<List<Table>>> UpdateTable(int tableId, Table table)
        {
            var tableUpdate = await _context.Tables.FirstOrDefaultAsync(c => c.TableId == tableId);
            if (tableUpdate == null)
                return BadRequest("Role not found.");

            tableUpdate.NumberOfChairs = table.NumberOfChairs;
            tableUpdate.Place = table.Place;


            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{tableId}")]
        public async Task<ActionResult<List<Table>>> DeleteTable (int tableId)
        {
            var tableDelete = await _context.Tables.FindAsync(tableId);
            if (tableDelete == null)
                return BadRequest("Role not found.");

            _context.Tables.Remove(tableDelete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
