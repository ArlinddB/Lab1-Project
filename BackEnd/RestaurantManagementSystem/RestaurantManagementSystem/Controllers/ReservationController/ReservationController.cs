using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantManagementSystem.Data;
using RestaurantManagementSystem.Dtos.ReservationDto;
using RestaurantManagementSystem.Models.ReservationModel;

namespace RestaurantManagementSystem.Controllers.ReservationController
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReservationController : Controller
    {
        private readonly DataContext _context;

        public ReservationController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetAll()
        {
            var reservations = await _context.Reservations.Include(c => c.Table).ToListAsync();
            return Ok(reservations);
        }

        [HttpGet("{reservationId}")]
        public async Task<ActionResult<List<Reservation>>> GetById(int reservationId)
        {
            var drink = await _context.Reservations.Include(c => c.Table).FirstOrDefaultAsync(c => c.ReservationId == reservationId);
            return Ok(drink);
        }

        [HttpPost]
        public async Task<ActionResult<List<Reservation>>> AddReservation(InsertReservationDto reservationDto)
        {
            if (reservationDto == null)
                return BadRequest("Failed");

            var reservation = new Reservation
            {
                ClientName = reservationDto.ClientName,
                DateAndTime = reservationDto.DateAndTime,
                ClientContact = reservationDto.ClientContact,
                TableId = reservationDto.TableId
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Ok("Added successfuly");
        }

        [HttpPut("{reservationId}")]
        public async Task<ActionResult<List<Reservation>>> UpdateReservation(int reservationId, InsertReservationDto reservationDto)
        {
            var update = await _context.Reservations.FirstOrDefaultAsync(c => c.ReservationId == reservationId);
            if (update == null)
                return BadRequest("Drink not found");

            update.ClientName = reservationDto.ClientName;
            update.DateAndTime = reservationDto.DateAndTime;
            update.ClientContact = reservationDto.ClientContact;
            update.TableId = reservationDto.TableId;


            _context.Reservations.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfuly");
        }

        [HttpDelete("{reservationId}")]

        public async Task<ActionResult<List<Reservation>>> DeleteReservation(int reservationId)
        {
            var delete = await _context.Reservations.FirstOrDefaultAsync(c => c.ReservationId == reservationId);
            if (delete == null)
                return BadRequest("Drink not found");

            _context.Reservations.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfuly");
        }
    }
}
