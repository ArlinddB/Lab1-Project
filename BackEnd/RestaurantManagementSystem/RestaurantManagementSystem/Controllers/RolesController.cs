using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Models;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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

        [HttpGet("{roleId}")]
        public async Task<ActionResult<List<Roles>>> GetByRoleId(int roleId)
        {
            var roles = await _context.Roles.FirstOrDefaultAsync(c  => c.roleId == roleId);
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


        [HttpPut("{roleId}")]
        public async Task<ActionResult<List<Roles>>> UpdateRole(int roleId, Roles role)
        {
            var roleUpdate = await _context.Roles.FirstOrDefaultAsync(c => c.roleId == roleId);
            if (roleUpdate == null)
                return BadRequest("Role not found.");

            roleUpdate.roleName = role.roleName;
            

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Roles>>> DeleteRole(int id)
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