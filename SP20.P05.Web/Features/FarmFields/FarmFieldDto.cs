using System.ComponentModel.DataAnnotations;
using SP20.P05.Web.Features.Shared;

namespace SP20.P05.Web.Features.FarmFields
{
    public class FarmFieldDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public bool Active { get; set; }

        public string Description { get; set; }

        public string Src { get; set; }

        [Required]
        public DimensionsDto Dimensions { get; set; }
    }
}