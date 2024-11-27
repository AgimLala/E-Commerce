using Eccomerce.CartModel;
using Eccomerce.OrderModel;
using Eccomerce.Orders;
using Eccomerce.Products;
using Eccomerce.SubscribeModel;
using Eccomerce.Users;
using Microsoft.EntityFrameworkCore;



namespace Eccomerce.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
             : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductWithCountdown> ProductsWithCountdown { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<User> Users { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Product Category Relationship

            modelBuilder.Entity<ProductCategory>()
         .HasKey(pc => new { pc.ProductId, pc.CategoryId });

            modelBuilder.Entity<ProductCategory>()
                .HasOne(pc => pc.Category)
                .WithMany(c => c.ProductCategories)
                .HasForeignKey(pc => pc.CategoryId);
           
            
            modelBuilder.Entity<ProductCategory>()
                .HasOne(pc => pc.Category)
                .WithMany(c => c.ProductCategories)
                .HasForeignKey(pc => pc.CategoryId);
            
            //Product With Countdown Relationship
            
            modelBuilder.Entity<ProductWithCountdown>()
                .HasKey(pwc => pwc.ProductId);

            modelBuilder.Entity<ProductWithCountdown>()
                .HasOne(pwc => pwc.Product)
                .WithMany()
                .HasForeignKey(pwc => pwc.ProductId);



            // CartItem Relationship
            modelBuilder.Entity<CartItem>()
                .ToTable("carts")
                .HasKey(ci => ci.CartItemId);

            modelBuilder.Entity<CartItem>()
                    .HasOne(ci => ci.Product )
                    .WithMany()
                    .HasForeignKey(ci => ci.ProductId);



            // Configure Order and OrderItem Relationship
            modelBuilder.Entity<Order>()
                .HasKey(o => o.OrderId);



            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => oi.OrderItemId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany()
                .IsRequired()
                .HasForeignKey(oi => oi.OrderId)
               .OnDelete(DeleteBehavior.Restrict);









        }


    }

}
    

