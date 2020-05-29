using SP20.P05.Web.Features.FarmFieldTickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Cart_and_transactions
{
    public class Item
    {
        public int Id { get; set; }
        public int farmFieldTicketId { get; set; }//considering that for any number of quantity, one ticket is made for same size and same farmfield
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }


        
       

    }
}
