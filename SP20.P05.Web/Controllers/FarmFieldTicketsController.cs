using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Authentication;
using SP20.P05.Web.Features.FarmFieldTickets;

namespace SP20.P05.Web.Controllers
{
    [ApiController]
    [Route("api/farm-field-tickets")]
    public class FarmFieldTicketsController : ControllerBase
    {
        private readonly DataContext context;
        

        public FarmFieldTicketsController(DataContext context)
        {
            this.context = context;
            
        }

        [HttpPost]
        [Authorize(Roles = Roles.Customer)]
        // Dear 383 student, below is an example of async / await
        // further reading: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/
        public async Task<ActionResult<FarmFieldTicketDto>> CreateTicket(FarmFieldTicketDto targetValue)
        {
            if (!await context.FarmFields.AnyAsync(x => x.Active && x.Id == targetValue.FarmFieldId))
            {
                return BadRequest();
            }
           
            var addedItem = context.Set<FarmFieldTicket>().Add(new FarmFieldTicket
            {
                FarmFieldId = targetValue.FarmFieldId

            }) ;
            await context.SaveChangesAsync();
            targetValue.Id = addedItem.Entity.Id;
            return Created(string.Empty, targetValue);
        }

        [HttpPost("{id}/redeem")]
        [Authorize(Roles = Roles.EmplyoyeePlus)]
        public ActionResult<FarmFieldTicketDto> RedeemTicket(int id)
        {
            
            var targetValue = context.Set<FarmFieldTicket>()
                .Include(x => x.FarmField) // include ensures that the 'farm field' is eagerly loaded
                .FirstOrDefault(x => x.Id == id);
            if (targetValue == null)
            {
                return NotFound();
            }

            if (targetValue.Redeemed != null || !targetValue.FarmField.Active)
            {
                return BadRequest();
            }

            targetValue.Redeemed = DateTimeOffset.UtcNow;
            context.SaveChanges();

            return Ok();
        }
    }
}