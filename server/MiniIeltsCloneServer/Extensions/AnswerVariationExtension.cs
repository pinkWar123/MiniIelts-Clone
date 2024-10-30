using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Extensions
{
    public static class AnswerVariationExtension
    {
        public static List<string> GenerateAnswerVariations(this string input)
        {
            if(String.IsNullOrEmpty(input)) return new List<string>{ "" };
            input = input.ToLower().Trim();

            var regex = new Regex(@"\(([^)]+)\)");
            var matches = regex.Matches(input);

            var variations = new List<string>{input};
            foreach(Match match in matches)
            {
                var optionalText = match.Value;
                var textWithoutOptional = input.Replace(optionalText, "").Trim();
                var textWithOptional = input.Replace(optionalText, match.Groups[1].Value).Trim();

                variations.Add(textWithOptional);
                variations.Add(textWithoutOptional);
            }

            return variations.Distinct().Select(v => v.Trim()).ToList();
        }
    }
}