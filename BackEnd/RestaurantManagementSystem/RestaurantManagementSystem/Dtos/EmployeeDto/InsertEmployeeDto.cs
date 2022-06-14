using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantManagementSystem.Dtos
{
    public class InsertEmployeeDto
    {
        [Key]
        public int e_id { get; set; }
        public string e_name { get; set; }
        public string e_username { get; set; }
        public string e_password { get; set; }
        public string e_phone { get; set; }
        public string e_address { get; set; }
        public string DateOfJoining { get; set; }

        [ForeignKey("roleId")]
        public int roleId { get; set; }
    }
}
