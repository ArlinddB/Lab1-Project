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
using RestaurantManagementSystem.Dtos;
using RestaurantManagementSystem.Data;

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
            var emps = await _context.Employees.Include(c => c.Role).FirstOrDefaultAsync(c => c.e_id == empId);
            return Ok(emps);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(InsertEmployeeDto empDto)
        {
            if (empDto == null)
                return BadRequest();


            var employee = new Employee 
            { 
                e_name = empDto.e_name,
                e_username = empDto.e_username,
                e_password = empDto.e_password,
                e_phone = empDto.e_phone,
                e_address = empDto.e_address,
                DateOfJoining = empDto.DateOfJoining,
                roleId = empDto.roleId,
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok("Added succesfuly");
        }

        [HttpPut("{empId}")]
        public async Task<ActionResult<List<Employee>>> UpdateEmp(int empId, InsertEmployeeDto empDto)
        {
            var empUpdate = await _context.Employees.FirstOrDefaultAsync(e => e.e_id == empId);
            if (empUpdate == null)
                return BadRequest("Employee not found.");

            empUpdate.e_name = empDto.e_name;
            empUpdate.e_username = empDto.e_username;
            empUpdate.e_password = empDto.e_password;
            empUpdate.e_phone = empDto.e_phone;
            empUpdate.e_address = empDto.e_address;
            empUpdate.DateOfJoining = empDto.DateOfJoining;
            empUpdate.roleId = empDto.roleId;

            _context.Employees.Update(empUpdate);

            await _context.SaveChangesAsync();


            return Ok("Updated successfuly");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Roles>>> DeleteEmp(int id)
        {
            var empDelete = await _context.Employees.FindAsync(id);
            if (empDelete == null)
                return BadRequest("Employee not found.");

            _context.Employees.Remove(empDelete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}