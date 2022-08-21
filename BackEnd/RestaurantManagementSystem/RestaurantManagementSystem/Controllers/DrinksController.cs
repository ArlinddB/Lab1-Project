using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DrinksController : ControllerBase
    {
        private readonly DataContext _context;


        public DrinksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Drinks>>> Get()
        {
            var drinks = await _context.Drinks.ToListAsync();
            return Ok(drinks);
        }

        [HttpPost]
        public async Task<ActionResult<List<Drinks>>> AddDrink(Drinks d)
        {
            var addDrink = _context.Drinks.Add(d);
            await _context.SaveChangesAsync();
            if (addDrink == null)
                return Ok("Failed");
            return Ok("Added succesfuly");
        }


        [HttpPut]
        public async Task<ActionResult<List<Drinks>>> UpdateDrink(Drinks d)
        {
            var drinkUpdate = await _context.Drinks.FindAsync(d.drink_id);
            if (drinkUpdate == null)
                return BadRequest("Drink not found.");

            drinkUpdate.drink_type = d.drink_type;
            drinkUpdate.drink_name = d.drink_name;
            drinkUpdate.drink_price =d.drink_price;


            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Drinks>>> DeleteDrink(int id)
        {
            var drinkDelete = await _context.Drinks.FindAsync(id);
            if (drinkDelete == null)
                return BadRequest("Food not found.");

            _context.Drinks.Remove(drinkDelete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}