using Microsoft.AspNetCore.Identity;

namespace weather_app_backend
{
    public class UserFavoriteLocation
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Location Location { get; set; }
    }
}
