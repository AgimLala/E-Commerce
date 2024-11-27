namespace Eccomerce.Products
{
    public class ProductWithCountdownDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Rating { get; set; }
        public int Stock { get; set; }  
        public string ImageUrl { get; set; }
        public DateTime CountdownStart { get; set; }
        public DateTime CountdownEnd { get; set; }
        public string ProductCategories { get; set; }
    }
}
