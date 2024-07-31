using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Data.Seeding
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await roleManager.CreateAsync(new IdentityRole(RolesEnum.SuperAdmin.ToString()));
            await roleManager.CreateAsync(new IdentityRole(RolesEnum.User.ToString()));
        }

        public static async Task SeedBasicUserAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var defaultUser = new AppUser
            {
                UserName = "basic_user",
                Email = "basicuser@gmail.com",
                EmailConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                var user = userManager.FindByEmailAsync(defaultUser.Email).Result;
                if (user == null)
                {
                    await userManager.CreateAsync(defaultUser, "123456");
                    await userManager.AddToRoleAsync(defaultUser, RolesEnum.User.ToString());
                }
            }
        }

        public static async Task SeedAdminAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var adminUser = new AppUser
            {
                UserName = "super_admin",
                Email = "superadmin@gmail.com",
                EmailConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != adminUser.Id))
            {
                var user = userManager.FindByEmailAsync(adminUser.Email).Result;
                if (user == null)
                {
                    await userManager.CreateAsync(adminUser, "123456");
                    var roles = new List<string>() { RolesEnum.SuperAdmin.ToString(), RolesEnum.User.ToString() };
                    await userManager.AddToRolesAsync(adminUser, roles);
                }
            }
            await SeedClaimsForAdminAsync(roleManager);
        }

        private static async Task SeedClaimsForAdminAsync(this RoleManager<IdentityRole> roleManager)
        {
            var adminRole = await roleManager.FindByNameAsync(RolesEnum.SuperAdmin.ToString());
            await roleManager.AddPermissionClaim(adminRole, "Test");
        }

        private static async Task AddPermissionClaim(this RoleManager<IdentityRole> roleManager, IdentityRole role, string module)
        {
            var allClaims = await roleManager.GetClaimsAsync(role);
            var allPermissions = Permission.GetTestPermissions();
            foreach (var permission in allPermissions)
            {
                if (!allClaims.Any(a => a.Type == "Permission" && a.Value == permission))
                {
                    await roleManager.AddClaimAsync(role, new Claim("Permission", permission));
                }
            }
        }
    }
}
