using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using test4.Entities;
using test4.Helpers;
using test4.Models;

namespace test4.Services
{

    public interface IUserService
    {
        Users Authenticate(string username, string password);
        IEnumerable<Users> GetAll();
        Users GetById(int id);
        IEnumerable<Users> AddUser(Users u);

    }

    public class UserService : IUserService
    {
         
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Users> _users;
        //private List<Users> _users = new List<Users>
        //{
        //    new Users { UserId = 1, FirstName = "Admin", LastName = "User", Username = "admin", Password = "admin", Role = Role.Admin },
        //    new Users { UserId = 2, FirstName = "Normal", LastName = "User", Username = "user", Password = "user", Role = Role.User }
        //};
        private readonly AppSettings _appSettings;
        Atess1Context _context;
        public UserService(IOptions<AppSettings> appSettings, Atess1Context context)
        {
            _appSettings = appSettings.Value;
            _context = context;
            this._users = _context.Users.ToList();
        }

        public Users Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user.WithoutPassword();
        }

        public IEnumerable<Users> GetAll()
        {
            return _users.WithoutPasswords();
        }

        public Users GetById(int id)
        {
            var user = _users.FirstOrDefault(x => x.UserId == id);
            return user.WithoutPassword();
        }

        public IEnumerable<Users> AddUser(Users us) {
            _context.Users.Add(us);
            _context.SaveChangesAsync();
            return _users.WithoutPasswords();
        }
    }
}