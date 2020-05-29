using SP20.P05.Web.Features.FarmFields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Cart_and_transactions
{
    public class UnitPrice
    {
        public int Id { get; set; }
        public int farmFieldId { get; set; }
        //public FarmField farmField { get; set; }
        public int sizeId { get; set; }
       //
       // public Size size { get; set; }
        public int rate { get; set; }
    }
}
