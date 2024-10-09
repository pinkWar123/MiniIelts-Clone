using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Web;
using MiniIeltsCloneServer.Helpers;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Services.PostService
{
    public class PostQueryObject : QueryObject
    {
        public string? Title { get; set; }
        public Skill? Tag { get; set; }
    }
}