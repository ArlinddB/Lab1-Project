using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantManagementSystem.Models.OrderModels
{
    public class OrderDetail
    {
        [Key]
        public long OrderDetailId { get; set; }

        public long OrderMasterId { get; set; }

        public string FoodName{ get; set; }

        public float FoodPrice { get; set; }

        public int Quantity { get; set; }

    }
}