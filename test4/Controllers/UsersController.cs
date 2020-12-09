using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using test4.Services;
using test4.Entities;
using test4.Models;

namespace test4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
            
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }



        [Authorize(Roles = Role.Admin)]
        [HttpPost("adduser")]
        public IActionResult AddUser([FromBody]Users user)
        {
            
            if (user == null)
                return BadRequest(new { message = "No User provided" });
                _userService.AddUser(user);
            //return Ok(_userService.GetAll());
            return CreatedAtAction("GetById", new { id = user.UserId }, user);
        }



        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            //only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
                return Forbid();

            var user = _userService.GetById(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}