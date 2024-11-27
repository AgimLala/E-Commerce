using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eccomerce.Context;
using Eccomerce.SubscribeModel;

namespace Eccomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Subscriptions
        [HttpPost]
        public async Task<ActionResult<Subscription>> Subscribe([FromBody] SubscribeRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required.");
            }

            // Check if the email is already subscribed
            var existingSubscription = await _context.Subscriptions
                .FirstOrDefaultAsync(s => s.Email == request.Email);

            if (existingSubscription != null)
            {
                return BadRequest(new { message = "Email is already subscribed." });
            }

            var subscription = new Subscription
            {
                Email = request.Email,
                SubscribedOn = DateTime.UtcNow
            };

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubscription), new { id = subscription.SubscriptionId }, subscription);
        }

        // GET: api/Subscriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscription>> GetSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }
    }
}

