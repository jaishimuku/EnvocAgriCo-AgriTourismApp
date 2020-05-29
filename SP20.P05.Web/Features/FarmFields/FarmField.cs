using System.Collections.Generic;
using SP20.P05.Web.Features.FarmFieldTickets;
using SP20.P05.Web.Features.Shared;

namespace SP20.P05.Web.Features.FarmFields
{
    public class FarmField
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public string Description { get; set; }

        public string Src { get; set; }
        public Dimensions Dimensions { get; set; } = new Dimensions();
        public virtual ICollection<FarmFieldTicket> Tickets { get; set; }= new List<FarmFieldTicket>();
    }
}