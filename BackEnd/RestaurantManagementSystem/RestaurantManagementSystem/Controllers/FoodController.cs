using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly DataContext _context;


        public FoodController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Food>>> Get()
        {
            var Food = await _context.Foods.ToListAsync();
            return Ok(Food);
        }

        [HttpPost]
        public async Task<ActionResult<List<Food>>> AddFood(Food food)
        {
            var addFood = _context.Foods.Add(food);
            await _context.SaveChangesAsync();
            if (addFood == null)
                return Ok("Failed");
            return Ok("Added succesfuly");
        }


        [HttpPut]
        public async Task<ActionResult<List<Food>>> UpdateFood(Food f)
        {
            var foodUpdate = await _context.Foods.FindAsync(f.food_id);
            if (foodUpdate == null)
                return BadRequest("Food not found.");

            foodUpdate.food_type = f.food_type;
            foodUpdate.food_name = f.food_name;
            foodUpdate.food_price = f.food_price;


            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Food>>> DeleteFood(int id)
        {
            var foodDelete = await _context.Foods.FindAsync(id);
            if (foodDelete == null)
                return BadRequest("Food not found.");

            _context.Foods.Remove(foodDelete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}