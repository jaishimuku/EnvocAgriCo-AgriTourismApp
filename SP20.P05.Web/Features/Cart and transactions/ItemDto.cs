using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP20.P05.Web.Features.Cart_and_transactions
{
    public class ItemDto
    {
        
        public int FarmFieldId { get; set; }
        public int SizeId { get; set; }
        public int Quantity { get; set; }
        /// <summary>
        //above three should be specified from swagger or front end to store 
        /// </summary>


        //below three is for returning data
        public string SizeName { get; set; }
        public int Price { get; set; }
        public string FarmFieldName { get; set; }
    }
}
