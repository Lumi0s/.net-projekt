using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace weather_app_backend
{
    public class ApplicationUser : IdentityUser
    {
        // Navigation property
        public ICollection<Location> FavoriteLocations { get; set; } = new List<Location>();
    }
}
