using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_app_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LocationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public LocationController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("add-favorite")]
        public async Task<IActionResult> AddFavorite([FromBody] Location location, [FromQuery] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            user.FavoriteLocations.Add(location);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("remove-favorite")]
        public async Task<IActionResult> RemoveFavorite([FromBody] Location location, [FromQuery] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var favoriteLocation = user.FavoriteLocations
                .FirstOrDefault(l => l.city == location.city &&
                                     l.street == location.street &&
                                     l.zipCode == location.zipCode &&
                                     l.country == location.country &&
                                     l.lat == location.lat &&
                                     l.lon == location.lon);

            if (favoriteLocation == null)
            {
                return NotFound();
            }

            user.FavoriteLocations.Remove(favoriteLocation);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("favorites")]
        public async Task<IEnumerable<Location>> GetFavorites([FromQuery] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Enumerable.Empty<Location>();
            }

            return user.FavoriteLocations;
        }
    }
}
