using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eccomerce.Context;
using Eccomerce.Products;

namespace Eccomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context.Products
                
                .OrderBy(p => p.ProductId)
                .ToListAsync();

            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                var categoryNames = await GetCategoryNames(product.ProductId); // Fetch category names
                var productDto = new ProductDto
                {
                    ProductId = product.ProductId,
                    Name = product.Name,
                    Price = product.Price,
                    ImageUrl = product.ImageUrl,
                    Rating = product.Rating,
                    Description = product.Description,
                    LongDescription = product.LongDescription,
                    Stock = product.Stock,
                    Size = product.Size,
                    Departments = product.Departments,
                    Tags = product.Tags,

                    ProductCategories = string.Join(", ", categoryNames) // Join category names
                };

                productDtos.Add(productDto);
            }

            return Ok(productDtos);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(Guid id)
        {
            var product = await _context.Products
                
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            var categoryNames = await GetCategoryNames(product.ProductId);
            var productDto = new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                ImageUrl=product.ImageUrl,
                Rating = product.Rating, 
                Description=product.Description,
                LongDescription=product.LongDescription,
                Stock=product.Stock,
                Size=product.Size,
                Departments=product.Departments,
                Tags=product.Tags,
                ProductCategories = string.Join(", ", categoryNames)
            };

            return Ok(productDto);
        }

        [HttpGet("ProductsWithCountdown")]
        public async Task<ActionResult<IEnumerable<ProductWithCountdownDto>>> GetProductsWithCountdown()
        {
            var currentDateTime = DateTime.UtcNow;

            var products = await _context.ProductsWithCountdown
                .Join(_context.Products, pwc => pwc.ProductId, p => p.ProductId, (pwc, p) => new ProductWithCountdownDto
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Price = p.Price,
                    Rating = p.Rating,
                    Stock = p.Stock,
                    ImageUrl = p.ImageUrl,
                    CountdownStart = pwc.CountdownStart,
                    CountdownEnd = pwc.CountdownEnd
                })
                .ToListAsync();

            if (!products.Any())
            {
                return NotFound();
            }

            foreach (var product in products)
            {
                var categoryNames = await GetCategoryNames(product.ProductId);
                product.ProductCategories = string.Join(", ", categoryNames);
            }

            return Ok(products);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetFeaturedProducts()
        {
            var products = await _context.Products
                .OrderBy(p => Guid.NewGuid()) 
                .Take(3)
                .ToListAsync();

            var productDtos = products.Select(product => new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                SmallImageUrl = product.SmallImageUrl, 
                Rating = product.Rating,
                Description = product.Description,
                LongDescription = product.LongDescription,
                Stock = product.Stock,
                Departments = product.Departments,
                Tags = product.Tags,
                Size = product.Size,
                ProductCategories = string.Join(", ", GetCategoryNames(product.ProductId).Result)
            }).ToList();

            return Ok(productDtos);
        }

        [HttpGet("new-arrivals")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetNewArrivals()
        {
            var products = await _context.Products
                .OrderByDescending(p => p.AddedDate) 
                .Take(3)
                .ToListAsync();

            var productDtos = products.Select(product => new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                SmallImageUrl = product.SmallImageUrl, 
                Rating = product.Rating,
                Description = product.Description,
                LongDescription = product.LongDescription,
                Stock = product.Stock,
                Departments = product.Departments,
                Tags = product.Tags,
                Size = product.Size,
                ProductCategories = string.Join(", ", GetCategoryNames(product.ProductId).Result)
            }).ToList();

            return Ok(productDtos);
        }


        [HttpGet("best-sellers")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetBestSellers()
        {
            var bestSellingProducts = await _context.OrderItems
                .GroupBy(oi => oi.ProductId)
                .Select(group => new
                {
                    ProductId = group.Key,
                    UnitsSold = group.Sum(oi => oi.Quantity)
                })
                .OrderByDescending(p => p.UnitsSold)
                .Take(3)
                .ToListAsync();

            var productIds = bestSellingProducts.Select(p => p.ProductId).ToList();

            var products = await _context.Products
                .Where(p => productIds.Contains(p.ProductId))
                .ToListAsync();

            var productDtos = products.Select(product => new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                SmallImageUrl = product.SmallImageUrl, 
                Rating = product.Rating,
                Description = product.Description,
                LongDescription = product.LongDescription,
                Stock = product.Stock,
                Departments = product.Departments,
                Tags = product.Tags,
                Size = product.Size,
                ProductCategories = string.Join(", ", GetCategoryNames(product.ProductId).Result)
            }).ToList();

            return Ok(productDtos);
        }



        [HttpGet("byCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategoryId(int categoryId)
        {
            var products = await _context.ProductCategories
                .Where(pc => pc.CategoryId == categoryId)
                .Select(pc => pc.Product)
                .ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound();
            }

            var productDtos = new List<ProductDto>();
            foreach (var product in products)
            {
                var categoryNames = await GetCategoryNames(product.ProductId);
                var productDto = new ProductDto
                {
                    ProductId = product.ProductId,
                    Name = product.Name,
                    Price = product.Price,
                    ImageUrl = product.ImageUrl,
                    Rating = product.Rating,
                    ProductCategories = string.Join(", ", categoryNames)
                };
                productDtos.Add(productDto);
            }

            return Ok(productDtos);
        }








        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(Guid id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        //HELPER METHODS
        private bool ProductExists(Guid id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
        private async Task<IEnumerable<string>> GetCategoryNames(Guid productId)
        {
            var categoryIds = await _context.ProductCategories
                .Where(pc => pc.ProductId == productId)
                .Select(pc => pc.CategoryId)
                .ToListAsync();

            var categoryNames = await _context.Categories
                .Where(c => categoryIds.Contains(c.CategoryId))
                .Select(c => c.Name)
                .ToListAsync();

            return categoryNames;
        }
    }
}
