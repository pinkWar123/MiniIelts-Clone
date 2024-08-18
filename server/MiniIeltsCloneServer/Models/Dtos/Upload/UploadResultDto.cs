using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Models.Dtos.Upload
{
    public class UploadResultDto
    {
        public List<string> FileNames { get; set; } = new List<string>();
    }
}