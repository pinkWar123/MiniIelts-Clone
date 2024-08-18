using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniIeltsCloneServer.Settings
{
    public class AzureConfig
    {
        public string? AzureConnectionString { get; set; }
        public string? BlobContainerClient { get; set; }
    }
}