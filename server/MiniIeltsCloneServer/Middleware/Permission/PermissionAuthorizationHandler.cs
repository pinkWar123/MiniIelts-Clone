using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace MiniIeltsCloneServer.Middleware.Permission
{
    internal class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        public PermissionAuthorizationHandler() { }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            Console.WriteLine("Run here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            if (requirement.Permission.Length == 0)
                context.Succeed(requirement);
            if (context.User == null)
            {
                return;
            }
            var claims = context.User.Claims.Select(x => x.Value).ToList();
            foreach (var claim in claims)
            {
                Console.WriteLine($"User claim: {claim}");
            }
            Console.WriteLine($"Require: {requirement.Permission}");
            var permissionss = context.User.Claims.Where(x => x.Type == "Permission" &&
                                                                x.Value == requirement.Permission);
            if (permissionss.Any())
            {
                context.Succeed(requirement);
                return;
            }
        }
    }
}
