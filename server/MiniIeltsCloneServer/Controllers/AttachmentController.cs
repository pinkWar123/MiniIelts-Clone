using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Services.BlobService;

namespace MiniIeltsCloneServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttachmentController : ControllerBase
    {
        AzureBlobService _service;
        public AttachmentController(AzureBlobService service)
        {
            _service = service;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> UploadBlobs(List<IFormFile> files)
        {
            Console.WriteLine("Hello");
            var response = await _service.UploadFiles(files);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlobs()
        {
            var response = await _service.GetUploadedBlobs();
            return Ok(response);
        }
    }
}