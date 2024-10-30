using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Extensions
{
    public static class IeltsScoreExtensions
    {
        public static double GetListeningReadingTestScore(this int correctAnswers)
        {
            if (correctAnswers < 0 || correctAnswers > 40)
            throw new ArgumentOutOfRangeException(nameof(correctAnswers), "Number of correct answers must be between 0 and 40.");

            if (correctAnswers >= 39) return 9.0;
            else if (correctAnswers >= 37) return 8.5;
            else if (correctAnswers >= 35) return 8.0;
            else if (correctAnswers >= 32) return 7.5;
            else if (correctAnswers >= 30) return 7.0;
            else if (correctAnswers >= 26) return 6.5;
            else if (correctAnswers >= 23) return 6.0;
            else if (correctAnswers >= 18) return 5.5;
            else if (correctAnswers >= 15) return 5.0;
            else if (correctAnswers >= 13) return 4.5;
            else if (correctAnswers >= 10) return 4.0;
            else if (correctAnswers >= 8) return 3.5;
            else if (correctAnswers >= 6) return 3.0;
            else if (correctAnswers >= 4) return 2.5;
            else if (correctAnswers >= 2) return 2.0;
            else return 1.0; // Minimum band score
        }
    }
}