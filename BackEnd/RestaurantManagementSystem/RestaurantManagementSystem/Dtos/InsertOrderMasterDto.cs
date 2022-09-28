using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Dtos
{
    public class InsertOrderMasterDto
    {
        [Key]
        public long OrderMasterId { get; set; }

        public string OrderNumber { get; set; }

        public int GTotal { get; set; }

        [ForeignKey("orderDetailId")]
        public int orderDetailId { get; set; }

    }
}
