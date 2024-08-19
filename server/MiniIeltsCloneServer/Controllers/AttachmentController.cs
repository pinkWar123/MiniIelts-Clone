using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniIeltsCloneServer.Models.Dtos.Upload;
using MiniIeltsCloneServer.Services.BlobService;
using MiniIeltsCloneServer.Wrappers;

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
            var response = await _service.UploadFiles(files);
            var uploadResultDto = new UploadResultDto
            {
                FileNames = response
            };
            return Ok(new Response<UploadResultDto>(uploadResultDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlobs()
        {
            var response = await _service.GetUploadedBlobs();
            return Ok(response);
        }
    }
}