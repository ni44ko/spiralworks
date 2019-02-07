using spiralworksmvp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spiralworksmvp.Data
{
    public interface IAuthRepository
{
    Task<User> Register(User user, string password);
    Task<User> Login(string emailPhone, string password);
    Task<bool> UserExists(string emailPhone);
}
}
