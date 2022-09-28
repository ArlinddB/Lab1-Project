using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantManagementSystem.Models.OrderModels
{
    public class OrderMaster
    {
        [Key]
        public long OrderMasterId { get; set; }

        public string OrderNumber { get; set; }

        public int GTotal { get; set; }

        [ForeignKey("orderDetailId")]
        public int orderDetailId { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }

    }
}