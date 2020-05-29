using System.ComponentModel.DataAnnotations;

namespace SP20.P05.Web.Features.Shared
{
    public class DimensionsDto
    {
        [Range(1, int.MaxValue)]
        public int Width { get; set; }

        [Range(1, int.MaxValue)]
        public int Height { get; set; }
    }
}