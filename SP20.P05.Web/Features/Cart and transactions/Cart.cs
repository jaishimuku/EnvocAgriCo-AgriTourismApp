using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Cart_and_transactions
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; } 
    }
}
