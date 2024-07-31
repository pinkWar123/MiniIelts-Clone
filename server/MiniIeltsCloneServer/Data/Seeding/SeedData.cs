using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MiniIeltsCloneServer.Constants.Permissions;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Data.Seeding
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, UserManager<AppUser> userManager)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string[] roleNames = { "Admin", "User", "SuperAdmin" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    var newRole = new IdentityRole()
                    {
                        Name = roleName,
                    };
                    roleResult = await roleManager.CreateAsync(newRole);
                    if (roleName == "SuperAdmin")
                    {
                        await roleManager.AddClaimAsync(newRole, new Claim("Permission", TestPermission.CreateTest));
                    }
                }
            }

            // Create an admin user
            var admin = new AppUser
            {
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
            };

            string adminPassword = "Admin@123456";

            var user = await userManager.FindByEmailAsync(admin.Email);
            Console.WriteLine($"----------------------------USER:{user}");
            Console.WriteLine("ENdDDDDD");
            if (user == null)
            {
                Console.WriteLine("Run here");
                var createPowerUser = await userManager.CreateAsync(admin, adminPassword);
                Console.WriteLine(createPowerUser);
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                    // await userManager.AddClaimAsync(admin, new Claim("Permission", TestPermission.CreateTest));
                }
            }

            var secondAdmin = new AppUser
            {
                UserName = "useruser",
                Email = "admin@admi1.com"
            };
            user = await userManager.FindByEmailAsync(secondAdmin.Email);
            if (user == null)
            {
                Console.WriteLine("Run here");
                var createPowerUser = await userManager.CreateAsync(secondAdmin, adminPassword);
                Console.WriteLine(createPowerUser);
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(secondAdmin, "Admin");
                    // await userManager.AddClaimAsync(admin, new Claim("Permission", TestPermission.CreateTest));
                }
            }

            var thirdAdmin = new AppUser
            {
                UserName = "use1user",
                Email = "admi1@admi1.com"
            };
            user = await userManager.FindByEmailAsync(thirdAdmin.Email);
            if (user == null)
            {
                Console.WriteLine("Run here");
                var createPowerUser = await userManager.CreateAsync(thirdAdmin, adminPassword);
                Console.WriteLine(createPowerUser);
                if (createPowerUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(thirdAdmin, "SuperAdmin");
                    // await userManager.AddClaimAsync(admin, new Claim("Permission", TestPermission.CreateTest));
                }
            }

            var basicUser = new AppUser
            {
                UserName = "basic"
            };
            var createBasicUser = await userManager.CreateAsync(basicUser, adminPassword);
            Console.WriteLine(createBasicUser);
            if (createBasicUser.Succeeded)
            {
                await userManager.AddToRoleAsync(basicUser, "User");
                // await userManager.AddClaimAsync(admin, new Claim("Permission", TestPermission.CreateTest));
            }
        }
    }
}
