using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Eccomerce.Products
{
    public class ProductWithCountdown
    {


        [Key]
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public DateTime CountdownStart { get; set; }
        public DateTime CountdownEnd { get; set; }
        public Product Product { get; set; }
    }
}
