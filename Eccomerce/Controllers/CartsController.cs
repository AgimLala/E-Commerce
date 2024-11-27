using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eccomerce.CartModel;
using Eccomerce.Context;

namespace Eccomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems()
        {
            var cartItems = await _context.CartItems
                .Include(ci => ci.Product)
                .Select(ci => new CartItemDto
                {
                    CartItemId= ci.CartItemId,
                    ProductImage = ci.Product.ImageUrl,
                    Name = ci.Product.Name,
                    Price = ci.Product.Price,
                    Quantity = ci.Quantity,
                    Total = ci.Quantity * ci.Product.Price
                })
                .ToListAsync();

            return cartItems;
        }


        // POST: api/Carts
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(AddToCartRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            if (request.Quantity > product.Stock)
            {
                return BadRequest(new { message = "Quantity exceeds available stock" });
            }

            var existingCartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.ProductId == request.ProductId);

            if (existingCartItem != null)
            {
                return BadRequest(new { message = "Product is already in the cart" });
            }


            var cartItem = new CartItem
            {
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                Total = request.Quantity * product.Price
            };

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartItem", new { id = cartItem.CartItemId }, cartItem);
        }



        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(Guid id)
        {
            var cartItem = await _context.CartItems.Include(ci => ci.Product).FirstOrDefaultAsync(ci => ci.CartItemId == id);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }

        // PUT: api/Carts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartItem(Guid id, [FromBody] UpdateCartItemDto updateDto)
        {
            if (id != updateDto.CartItemID)
            {
                return BadRequest();
            }

            var existingCartItem = await _context.CartItems.FindAsync(id);
            if (existingCartItem == null)
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(existingCartItem.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            if (updateDto.Quantity > product.Stock)
            {
                return BadRequest(new { message = "Quantity exceeds available stock" });
            }

            existingCartItem.Quantity = updateDto.Quantity;
            existingCartItem.Total = product.Price * updateDto.Quantity;

            _context.Entry(existingCartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Create the CartItemDto to return
            var updatedCartItemDto = new CartItemDto
            {
                CartItemId = existingCartItem.CartItemId,
                ProductImage = product.ImageUrl, // Assuming Product has an Image property
                Name = product.Name, // Assuming Product has a Name property
                Price = product.Price,
                Quantity = existingCartItem.Quantity,
                Total = existingCartItem.Total
            };

            return Ok(updatedCartItemDto);
        }



        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(Guid id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        //HELPER METHODS
        private bool CartItemExists(Guid id)
        {
            return _context.CartItems.Any(e => e.CartItemId == id);
        }
    }
}
