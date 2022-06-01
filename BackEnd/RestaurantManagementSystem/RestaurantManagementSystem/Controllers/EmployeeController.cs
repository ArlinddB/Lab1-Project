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

namespace RestaurantManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            var emps = await _context.Employees.ToListAsync();
            return Ok(emps);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(Employee emp)
        {
            var addEmp = _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            if (addEmp == null)
                return Ok("Failed");
            return Ok("Added succesfuly");
        }

        [HttpPut]
        public async Task<ActionResult<List<Employee>>> UpdateEmp(Employee emp)
        {
            var empUpdate = await _context.Employees.FindAsync(emp.e_id);
            if (empUpdate == null)
                return BadRequest("Employee not found.");

            empUpdate.e_name = emp.e_name;
            empUpdate.e_username = emp.e_username;
            empUpdate.e_password = emp.e_password;
            empUpdate.e_phone = emp.e_phone;
            empUpdate.e_address = emp.e_address;
            empUpdate.DateOfJoining = emp.DateOfJoining;
            empUpdate.e_roleID = emp.e_roleID;

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