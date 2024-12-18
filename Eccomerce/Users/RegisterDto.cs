﻿using System.ComponentModel.DataAnnotations;

namespace Eccomerce.Users
{
    public class RegisterDto
    {

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
