using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Helpers
{
    public static class Password
    {
        public static bool IsValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return false;
            }

            bool hasDigit = password.Any(char.IsDigit);
            bool hasLowercase = password.Any(char.IsLower);
            bool hasUppercase = password.Any(char.IsUpper);
            bool hasNonAlphanumeric = password.Any(ch => !char.IsLetterOrDigit(ch));

            return hasDigit && hasLowercase && hasUppercase && hasNonAlphanumeric;
        }
    }
}
