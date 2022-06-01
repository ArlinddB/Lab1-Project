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
    public class RolesController : ControllerBase
    {
        private readonly DataContext _context;


        public RolesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Roles>>> Get()
        {
            var roles = await _context.Roles.ToListAsync();
            return Ok(roles);
        }
       
        [HttpPost]
        public async Task<ActionResult<List<Roles>>> AddRole(Roles role)
        {
            var addRole = _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            if(addRole == null)
                return Ok("Failed");
            return Ok("Added succesfuly");
        }


        [HttpPut]
        public async Task<ActionResult<List<Roles>>> UpdateHero(Roles role)
        {
            var roleUpdate = await _context.Roles.FindAsync(role.r_id);
            if (roleUpdate == null)
                return BadRequest("Role not found.");

            roleUpdate.r_name = role.r_name;
            

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Roles>>> DeleteHero(int id)
        {
            var roleDelete = await _context.Roles.FindAsync(id);
            if (roleDelete == null)
                return BadRequest("Role not found.");

            _context.Roles.Remove(roleDelete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}