using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Data;
using MiniIeltsCloneServer.Models;

public class DatabaseSeeder
{
    public static void Seed(IServiceProvider serviceProvider)
    {
        using (var scope = serviceProvider.CreateScope())
        {
            var services = scope.ServiceProvider;

            var context = services.GetRequiredService<ApplicationDbContext>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();

            context.Database.Migrate(); // Apply pending migrations

            SeedRoles(roleManager);
            SeedUsers(userManager, roleManager);
        }
    }

    private static void SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        var roles = GetRoles();

        foreach (var role in roles)
        {
            var roleExists = roleManager.RoleExistsAsync(role.Name).Result;
            if (!roleExists)
            {
                roleManager.CreateAsync(role).Wait();

                // Define claims for each role
                var claims = new List<Claim>();

                if (role.Name == RolesEnum.SuperAdmin.ToString())
                {
                    claims = new List<Claim>
                    {
                        new Claim("Permission", "ManageUsers"),
                        new Claim("Permission", "ViewReports")
                    };
                }
                else if (role.Name == RolesEnum.User.ToString())
                {
                    claims = new List<Claim>
                    {
                        new Claim("Permission", "ViewContent")
                    };
                }

                AddClaimsToRole(roleManager, role, claims);
            }
        }
    }

    private static void SeedUsers(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        var adminUser = new AppUser
        {
            UserName = "super_admin",
            Email = "superadmin@gmail.com",
            EmailConfirmed = true
        };

        var defaultUser = new AppUser
        {
            UserName = "basic_user",
            Email = "basicuser@gmail.com",
            EmailConfirmed = true
        };

        if (userManager.Users.All(u => u.UserName != adminUser.UserName))
        {
            var user = userManager.FindByEmailAsync(adminUser.Email).Result;
            if (user == null)
            {
                userManager.CreateAsync(adminUser, "123456").Wait();
                userManager.AddToRolesAsync(adminUser, new[] { RolesEnum.SuperAdmin.ToString(), RolesEnum.User.ToString() }).Wait();
            }
        }

        if (userManager.Users.All(u => u.UserName != defaultUser.UserName))
        {
            var user = userManager.FindByEmailAsync(defaultUser.Email).Result;
            if (user == null)
            {
                userManager.CreateAsync(defaultUser, "123456").Wait();
                userManager.AddToRoleAsync(defaultUser, RolesEnum.User.ToString()).Wait();
            }
        }
    }

    private static void AddClaimsToRole(RoleManager<IdentityRole> roleManager, IdentityRole role, IEnumerable<Claim> claims)
    {
        foreach (var claim in claims)
        {
            var existingClaims = roleManager.GetClaimsAsync(role).Result;
            if (!existingClaims.Any(c => c.Type == claim.Type && c.Value == claim.Value))
            {
                roleManager.AddClaimAsync(role, claim).Wait();
            }
        }
    }

    private static List<IdentityRole> GetRoles()
    {
        var adminRole = new IdentityRole
        {
            Name = RolesEnum.SuperAdmin.ToString(),
            NormalizedName = RolesEnum.SuperAdmin.ToString().ToUpper()
        };

        var userRole = new IdentityRole
        {
            Name = RolesEnum.User.ToString(),
            NormalizedName = RolesEnum.User.ToString().ToUpper()
        };

        return new List<IdentityRole> { adminRole, userRole };
    }
}
