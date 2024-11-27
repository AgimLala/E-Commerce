namespace Eccomerce.Products
{
    public class ProductCategory
    {
        public Guid ProductId { get; set; }
        public int CategoryId { get; set; }
        public Product Product { get; set; }
        public Category Category { get; set; }
    }
}
