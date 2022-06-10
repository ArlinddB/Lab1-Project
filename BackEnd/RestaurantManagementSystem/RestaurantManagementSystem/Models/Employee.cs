﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RestaurantManagementSystem.Models
{
    public class Employee
    {
        [Key]
        public int e_id { get; set; }
        public string  e_name { get; set; }
        public string e_username { get; set; }
        public string e_password { get; set; }
        public string e_phone { get; set; }
        public string e_address { get; set; }

        //[DataType(DataType.Date)]
        //[Column(TypeName = "Date")]
        //public DateTime DateOfJoining { get; set; }
        public string DateOfJoining { get; set; }
        [JsonIgnore]

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        public virtual Roles Role { get; set; }
    }
}
