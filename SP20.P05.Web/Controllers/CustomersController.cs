using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using SP20.P05.Web.Data;
using SP20.P05.Web.Features.Authentication;

namespace SP20.P05.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;

        public CustomersController(UserManager<User> userManager, DataContext dataContext)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
        }

        [HttpPost("populate")]
        public async Task<ActionResult<UserDto>> Populatecustomers() {
            
            var customeroneexists = dataContext.Users.Where(x => x.UserName == "customerone").FirstOrDefault();
            
            if (customeroneexists == null)
            {
                var customeronedto = new CreateCustomerDto()
                {
                    Username = "customerone",
                    Password = "pass",
                    PhoneNumber = "12345",
                    Email = "emailone@gmail.com"
                };
                var customertwodto = new CreateCustomerDto()
                {
                    Username = "customertwo",
                    Password = "pass",
                    PhoneNumber = "12345",
                    Email = "emailtwo@gmail.com"
                };
                var customerthreedto = new CreateCustomerDto()
                {
                    Username = "customerthree",
                    Password = "pass",
                    PhoneNumber = "12345",
                    Email = "emailthree@gmail.com"
                };

                await CreateUser(customeronedto);
                await CreateUser(customertwodto);
                await CreateUser(customerthreedto);

                return Created(string.Empty, customerthreedto);
            }
            else
                return BadRequest();

        }
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(CreateCustomerDto dto)
          {
            var newUser = new User
            {
                UserName = dto.Username,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email
            };

            newUser.Cart = new Features.Cart_and_transactions.Cart();    //initializing cart while creating customer

            
            // wrapping in a transaction means that if part of the transaction fails then everything saved is undone
            using (var transaction = await dataContext.Database.BeginTransactionAsync())
            {

                var identityResult = await userManager.CreateAsync(newUser, dto.Password);
                if (!identityResult.Succeeded)
                {
                    return BadRequest();
                }

                var roleResult = await userManager.AddToRoleAsync(newUser, Roles.Customer);
                if (!roleResult.Succeeded)
                {
                    return BadRequest();
                }

                transaction.Commit(); // this marks our work as done

                newUser.Cart.UserId = newUser.Id; //setting user id of cart

                dataContext.SaveChanges();
                
                return Created(string.Empty, new UserDto
                {   //UserId = newUser.Id,
                    Username = newUser.UserName
                });
            }

        }
    }
}