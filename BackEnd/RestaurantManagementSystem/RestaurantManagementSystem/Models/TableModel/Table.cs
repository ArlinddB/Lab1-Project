using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementSystem.Models.TableModel
{
    public class Table
    {
        [Key]
        public int TableId { get; set; }
        public int NumberOfChairs { get; set; }
        public string Place { get; set; }
    }
}
