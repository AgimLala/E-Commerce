﻿namespace Eccomerce.OrderModel
{
    public class OrderWithItemsDto
    {
        public Guid OrderId { get; set; }
        public string Country { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? CompanyName { get; set; }
        public string Address { get; set; }
        public string? Address2 { get; set; }
        public string StateCounty { get; set; }
        public string PostcodeZip { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        public string? OrderNotes { get; set; }
        public DateTime OrderedDate { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }

    }
}
