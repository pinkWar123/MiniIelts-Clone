using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Data.Seeding
{
    public static class Permission
    {
        public static List<string> GetTestPermissions()
        {
            return new List<string>()
            {
                 $"Permissions.Test.Create",
                $"Permissions.Test.View",
                $"Permissions.Test.Edit",
                $"Permissions.Test.Delete",
            };
        }
    }
}
