using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Dtos;
using RestaurantManagementSystem.Models;
using RestaurantManagementSystem.Models.OrderModels;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<List<OrderMaster>>> GetOrderMasters()
        {
            return await _context.OrderMasters.Include(c => c.OrderDetails).ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<OrderMaster>>> GetOrderMaster(long id)
        {
            var order = await _context.OrderMasters.Include(c => c.OrderDetails).FirstOrDefaultAsync(c => c.OrderMasterId == id);
            return Ok(order);
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<List<OrderMaster>>> PutOrderMaster(long id, InsertOrderMasterDto dtoOrderMaster)
        {
            var update = await _context.OrderMasters.FirstOrDefaultAsync(c => c.OrderMasterId == id);
            if (update == null)
                return BadRequest("Food not found");

            update.OrderNumber = dtoOrderMaster.OrderNumber;
            update.GTotal = dtoOrderMaster.GTotal;
            update.orderDetailId = dtoOrderMaster.orderDetailId;

            _context.OrderMasters.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<OrderMaster>>> PostOrderMaster(InsertOrderMasterDto dtoOrderMaster)
        {
            if (dtoOrderMaster == null)
                return BadRequest("Failed");

            var ordermaster = new OrderMaster
            {
                OrderNumber = dtoOrderMaster.OrderNumber,
                GTotal = dtoOrderMaster.GTotal,
                orderDetailId = dtoOrderMaster.orderDetailId,
                
            };

            _context.OrderMasters.Add(ordermaster);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<OrderMaster>>> DeleteOrderMaster(long id)
        {
            var delete = await _context.OrderMasters.FirstOrDefaultAsync(c => c.OrderMasterId == id);
            if (delete == null)
                return BadRequest("Order not found");

            _context.OrderMasters.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}