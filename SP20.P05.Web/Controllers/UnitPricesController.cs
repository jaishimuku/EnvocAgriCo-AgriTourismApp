using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Cart_and_transactions;

namespace SP20.P05.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitPricesController : ControllerBase
    {
        private readonly DataContext _context;

        public UnitPricesController(DataContext context)
        {
            _context = context;
        }


        // GET: api/UnitPrices/5
        [HttpGet("{id}")]
        public Dictionary<string, int> GetUnitPriceByFarmFieldId(int id)
        {
            var AllPrices = new Dictionary<string, int>();

            var smallPrice = _context.Set<UnitPrice>().Where(x => x.farmFieldId == id && x.sizeId == 1).Select(y => y.rate).FirstOrDefault();
            var mediumPrice = _context.Set<UnitPrice>().Where(x => x.farmFieldId == id && x.sizeId == 2).Select(y => y.rate).FirstOrDefault();
            var largePrice = _context.Set<UnitPrice>().Where(x => x.farmFieldId == id && x.sizeId == 3).Select(y => y.rate).FirstOrDefault();

            AllPrices.Add("sprice", smallPrice);
            AllPrices.Add("mprice", mediumPrice);
            AllPrices.Add("lprice", largePrice);


            return AllPrices;
        }

        
    }
}
