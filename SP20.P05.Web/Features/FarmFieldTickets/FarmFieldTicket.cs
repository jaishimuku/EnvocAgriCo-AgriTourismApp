using System;
using SP20.P05.Web.Features.FarmFields;

namespace SP20.P05.Web.Features.FarmFieldTickets
{
    public class FarmFieldTicket
    {
        public int Id { get; set; }
        public DateTimeOffset? Redeemed { get; set; }
        public int FarmFieldId { get; set; }
        public virtual FarmField FarmField { get; set; }
    }
}