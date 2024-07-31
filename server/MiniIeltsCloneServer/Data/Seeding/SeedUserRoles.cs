using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Data.Seeding
{
    public class SeedUserRoles
    {
        private readonly List<IdentityRole> _roles;
        private readonly List<AppUser> _users;
        private readonly List<IdentityUserRole<string>> _userRoles;

        public SeedUserRoles()
        {
            _roles = GetRoles();
            _users = GetUsers();
            _userRoles = GetUserRoles();
        }

        public List<IdentityRole> Roles { get { return _roles; } }
        public List<AppUser> Users { get { return _users; } }
        public List<IdentityUserRole<string>> UserRoles { get { return _userRoles; } }

        private List<IdentityRole> GetRoles()
        {
            var adminRole = new IdentityRole
            {
                Name = RolesEnum.SuperAdmin.ToString(),
                NormalizedName = RolesEnum.SuperAdmin.ToString().ToUpper(),
            };

            var userRole = new IdentityRole
            {
                Name = RolesEnum.User.ToString(),
                NormalizedName = RolesEnum.User.ToString().ToUpper()
            };

            return new List<IdentityRole>() { adminRole, userRole };
        }

        private List<AppUser> GetUsers()
        {
            var pwd = "P@$$w0rd";
            var passwordHasher = new PasswordHasher<AppUser>();

            var adminUserName = "super_admin";
            var adminUserEmail = "nquan003@gmail.com";

            var adminUser = new AppUser
            {
                UserName = adminUserName.ToString(),
                NormalizedUserName = adminUserName.ToString().ToUpper(),
                Email = adminUserEmail,
                NormalizedEmail = adminUserEmail.ToUpper(),
                EmailConfirmed = true,
            };
            adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, pwd);

            var memberUserName = "basic_user";
            var memberUserEmail = "mm@mm.com";

            var memberUser = new AppUser
            {
                UserName = memberUserName.ToString(),
                NormalizedUserName = memberUserName.ToString().ToUpper(),
                Email = memberUserEmail,
                NormalizedEmail = memberUserEmail.ToUpper(),
                EmailConfirmed = true,
            };
            memberUser.PasswordHash = passwordHasher.HashPassword(memberUser, pwd);

            return new List<AppUser>() { adminUser, memberUser };
        }

        private List<IdentityUserRole<string>> GetUserRoles()
        {
            var userRoles = new List<IdentityUserRole<string>>();

            userRoles.Add(new IdentityUserRole<string>
            {
                UserId = _users[0].Id,
                RoleId = _roles.First(q => q.Name == RolesEnum.SuperAdmin.ToString()).Id
            });

            userRoles.Add(new IdentityUserRole<string>
            {
                UserId = _users[1].Id,
                RoleId = _roles.First(q => q.Name == RolesEnum.User.ToString()).Id,
            });

            return userRoles;
        }
    }
}
