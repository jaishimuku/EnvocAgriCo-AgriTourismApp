using Microsoft.EntityFrameworkCore;

namespace SP20.P05.Web.Features.Shared
{
    [Owned]
    public class Dimensions
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}