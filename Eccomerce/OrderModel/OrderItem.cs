using Eccomerce.Orders;
using Eccomerce.Products;

namespace Eccomerce.OrderModel
{
    public class OrderItem
    {
        public Guid OrderItemId { get; set; } = Guid.NewGuid();
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
         public Order Order { get; set; }

       

    }
}
