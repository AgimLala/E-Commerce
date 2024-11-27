using System.ComponentModel.DataAnnotations;

namespace Eccomerce.OrderModel
{
    public class OrderInputModel
    {
        [Required]
        public string Country { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? CompanyName { get; set; }

        [Required]
        public string Address { get; set; }

        public string? Address2 { get; set; }

        [Required]
        public string StateCounty { get; set; }

        [Required]
        public string PostcodeZip { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public string? OrderNotes { get; set; }
    }
}
