
using Eccomerce.OrderModel;
using Eccomerce.Products;


namespace Eccomerce.CartModel
{
    public class CartItem
    {
        public Guid CartItemId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }
        public Product Product { get; set; }
        
    }
}
