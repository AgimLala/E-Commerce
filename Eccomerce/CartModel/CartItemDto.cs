namespace Eccomerce.CartModel
{
    public class CartItemDto
    {
        public Guid CartItemId { get; set; }
        public string ProductImage { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }

       
    }
}
    