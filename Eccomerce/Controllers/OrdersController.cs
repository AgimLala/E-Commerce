using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eccomerce.Context;
using Eccomerce.Orders;
using Eccomerce.CartModel;
using Eccomerce.OrderModel;

namespace Eccomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderWithItemsDto>>> GetOrders()
        {
            // Perform an inner join between Orders and OrderItems
            var ordersWithItems = await (from o in _context.Orders
                                         join oi in _context.OrderItems
                                         on o.OrderId equals oi.OrderId
                                         select new
                                         {
                                             o.OrderId,
                                             o.Country,
                                             o.FirstName,
                                             o.LastName,
                                             o.CompanyName,
                                             o.Address,
                                             o.Address2,
                                             o.StateCounty,
                                             o.PostcodeZip,
                                             o.EmailAddress,
                                             o.Phone,
                                             o.OrderNotes,
                                             o.OrderedDate,
                                             OrderItem = new OrderItemDto
                                             {
                                                 OrderItemId = oi.OrderItemId,
                                                 ProductId = oi.ProductId,
                                                 ProductName = oi.ProductName,
                                                 Quantity = oi.Quantity,
                                                 Price = oi.Price
                                             }
                                         }).ToListAsync();

            if (ordersWithItems.Count == 0)
            {
                return NoContent();
            }

            // Group the order items by OrderId to reassemble the orders
            var groupedOrders = ordersWithItems
                .GroupBy(o => o.OrderId)
                .Select(g => new OrderWithItemsDto
                {
                    OrderId = g.Key,
                    Country = g.First().Country,
                    FirstName = g.First().FirstName,
                    LastName = g.First().LastName,
                    CompanyName = g.First().CompanyName,
                    Address = g.First().Address,
                    Address2 = g.First().Address2,
                    StateCounty = g.First().StateCounty,
                    PostcodeZip = g.First().PostcodeZip,
                    EmailAddress = g.First().EmailAddress,
                    Phone = g.First().Phone,
                    OrderNotes = g.First().OrderNotes,
                    OrderedDate = g.First().OrderedDate,
                    OrderItems = g.Select(o => o.OrderItem).ToList()
                }).ToList();

            return Ok(groupedOrders);
        }



        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] OrderInputModel orderInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Retrieve cart items and join with products to get product names and prices
                    var cartItemsWithProducts = await (from cartItem in _context.CartItems
                                                       join product in _context.Products on cartItem.ProductId equals product.ProductId
                                                       select new
                                                       {
                                                           cartItem.ProductId,
                                                           product.Name,
                                                           cartItem.Quantity,
                                                           product.Price,
                                                           product.Stock
                                                       }).ToListAsync();

                    // Create an order from user input
                    var order = new Order
                    {
                        Country = orderInput.Country,
                        FirstName = orderInput.FirstName,
                        LastName = orderInput.LastName,
                        CompanyName = orderInput.CompanyName,
                        Address = orderInput.Address,
                        Address2 = orderInput.Address2,
                        StateCounty = orderInput.StateCounty,
                        PostcodeZip = orderInput.PostcodeZip,
                        EmailAddress = orderInput.EmailAddress,
                        Phone = orderInput.Phone,
                        OrderNotes = orderInput.OrderNotes
                    };

                    // Add order to the context first
                    _context.Orders.Add(order);
                    await _context.SaveChangesAsync(); // Save to get the OrderId

                    // Add order items from cart items and update stock
                    foreach (var item in cartItemsWithProducts)
                    {
                        if (item.Stock < item.Quantity)
                        {
                            return BadRequest(new { message = $"Not enough stock for product {item.Name}" });
                        }

                        // Update the stock quantity
                        var product = await _context.Products.FindAsync(item.ProductId);
                        product.Stock -= item.Quantity;
                        _context.Products.Update(product);

                        // Add order item
                        _context.OrderItems.Add(new OrderItem
                        {
                            ProductId = item.ProductId,
                            OrderId = order.OrderId, // Ensure OrderId is set correctly
                            ProductName = item.Name,
                            Quantity = item.Quantity,
                            Price = item.Price
                        });
                    }

                    // Save the order items to the database
                    await _context.SaveChangesAsync();

                    // Clear the cart after creating the order
                    var cartItems = await _context.CartItems.ToListAsync();
                    _context.CartItems.RemoveRange(cartItems);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return Ok(order);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    // Log the exception (ex) if necessary
                    return StatusCode(500, new { message = "An error occurred while processing your order.", detail = ex.Message });
                }
            }
        }

            // GET: api/Orders/5
            [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
