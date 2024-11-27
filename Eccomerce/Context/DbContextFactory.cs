using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Eccomerce.Context;


namespace EntityFramework.Context
{
    public class DbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public Eccomerce.Context.ApplicationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();

            builder.UseMySql("server=localhost;user=root;database=eccomerceV1;port=3306;password=Imaginedragons", new MySqlServerVersion(new Version(8, 0, 21)));

            return new ApplicationDbContext(builder.Options);
        }
    }
}