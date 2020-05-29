using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Cart_and_transactions
{
    public class CartDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public virtual ICollection<TransactionDto> TransactionDtos { get; set; }
    }
}
