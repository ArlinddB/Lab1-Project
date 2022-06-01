using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime DateOfJoining { get; set; }
        //public string DateOfJoining { get; set; }
        [ForeignKey("Roles")]
        public int e_roleID { get; set; }
        public virtual Roles Roles { get; set; }
    }
}
