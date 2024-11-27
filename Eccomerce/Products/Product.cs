using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;




namespace Eccomerce.Products
{
    public class Product
    {

        [Key]
        public Guid ProductId { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Rating { get; set; } 
        public string ImageUrl { get; set; }
        public string SmallImageUrl { get; set; }
        public string Description { get; set; } 
        public string LongDescription { get; set; } 
        public int Stock {  get; set; }
        public List<string> Departments { get; set; }
        public List<string> Tags { get; set; }
        public List<string> Size { get; set; }
        public DateTime AddedDate { get; set; }





    }
}
