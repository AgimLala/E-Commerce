namespace Eccomerce.OrderModel
{
    public class OrderItemDto
    {
        public Guid OrderItemId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
