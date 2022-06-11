using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using RestaurantManagementSystem.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;


        public EmployeeController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Employee>>> Get()
        {
            var emps = await _context.Employees
                .Include(c => c.Role)
                .AsNoTracking()
                .ToListAsync();
            return Ok(emps);
        }

        [HttpGet("{empId}")]
        public async Task<ActionResult<List<Employee>>> GetEmpById(int empId)
        {
            var emps = await _context.Employees.FirstOrDefaultAsync(c => c.e_id == empId);
            return Ok(emps);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(Employee emp)
        {
            if (emp == null)
                return BadRequest();

            _context.Entry(emp.Role).State = EntityState.Unchanged;
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
           
            return Ok("Added succesfuly");
        }

        [HttpPut("{empId}")]
        public async Task<ActionResult<List<Employee>>> UpdateEmp(int empId, Employee emp)
        {
            var empUpdate = await _context.Employees.FirstOrDefaultAsync(e => e.e_id == empId);
            if (empUpdate == null)
                return BadRequest("Employee not found.");

            empUpdate.e_name = emp.e_name;
            empUpdate.e_username = emp.e_username;
            empUpdate.e_password = emp.e_password;
            empUpdate.e_phone = emp.e_phone;
            empUpdate.e_address = emp.e_address;
            empUpdate.DateOfJoining = emp.DateOfJoining;
            empUpdate.roleId = emp.roleId;
            empUpdate.Role = emp.Role;

            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Roles>>> DeleteEmp(int id)
        {
            var empDelete = await _context.Employees.FindAsync(id);
            if (empDelete == null)
                return BadRequest("Role not found.");

            _context.Employees.Remove(empDelete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}