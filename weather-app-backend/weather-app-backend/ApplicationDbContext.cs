using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace weather_app_backend
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .OwnsMany(u => u.FavoriteLocations, location =>
                {
                    location.Property(l => l.city).HasColumnName("city");
                    location.Property(l => l.street).HasColumnName("street");
                    location.Property(l => l.zipCode).HasColumnName("zipCode");
                    location.Property(l => l.country).HasColumnName("country");
                    location.Property(l => l.lat).HasColumnName("lat");
                    location.Property(l => l.lon).HasColumnName("lon");
                });
        }
    }
}
