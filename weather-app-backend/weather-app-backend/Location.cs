using System.Collections.Generic;

namespace weather_app_backend
{
    public class Location
    {
        public string? city { get; set; }
        public string? street { get; set; }
        public string? zipCode { get; set; }
        public string? country { get; set; }
        public double? lat { get; set; }
        public double? lon { get; set; }
    }
}
