using Eccomerce.Auth;
using Eccomerce.Context;
using Eccomerce.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
            _authService = new AuthService();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
                return BadRequest("Email already exists.");

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = _authService.HashPassword(model.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null || !_authService.VerifyPassword(user.PasswordHash, model.Password))
                return Unauthorized("Invalid email or password.");

            // Store user details in the session.
            HttpContext.Session.SetInt32("UserId", user.UserId);
            HttpContext.Session.SetString("Username", user.Username);

            return Ok(new { message = "Login successful.", userId = user.UserId });
        }

        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
                return Unauthorized("User not logged in.");

            var username = HttpContext.Session.GetString("Username");
            return Ok(new { userId, username });
        }
    }
}