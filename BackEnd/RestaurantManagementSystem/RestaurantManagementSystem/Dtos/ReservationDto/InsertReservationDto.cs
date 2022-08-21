using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Dtos.ReservationDto
{
    public class InsertReservationDto
    {
        [Key]
        public int ReservationId { get; set; }
        public string ClientName { get; set; }
        public string DateAndTime { get; set; }
        public string ClientContact { get; set; }

        [ForeignKey("TableId")]
        public int TableId { get; set; }
    }
}
