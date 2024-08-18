using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;
using MiniIeltsCloneServer.Settings;

namespace MiniIeltsCloneServer.Services.BlobService
{
    public class AzureBlobService
    {
        BlobServiceClient _blobClient;
        BlobContainerClient _containerClient;
        private readonly AzureConfig _azureConfig;
        public AzureBlobService(IOptions<AzureConfig> azureConfig)
        {
            _azureConfig = azureConfig.Value;
            _blobClient = new BlobServiceClient(_azureConfig.AzureConnectionString);
            _containerClient = _blobClient.GetBlobContainerClient(_azureConfig.BlobContainerClient);
        }

        public async Task<List<string>> UploadFiles(List<IFormFile> files)
        {

            var azureResponse = new List<Azure.Response<BlobContentInfo>>();
            var fileNameList = new List<string>();
            foreach(var file in files)
            {
                // Get the original file name without the extension
                string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(file.FileName);
                // Get the file extension
                string fileExtension = Path.GetExtension(file.FileName);
                // Create a new file name with a timestamp
                string newFileName = $"{fileNameWithoutExtension}_{DateTime.UtcNow:yyyyMMdd_HHmmssfff}{fileExtension}";

                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    memoryStream.Position = 0;
                    var client = await _containerClient.UploadBlobAsync(newFileName, memoryStream, default);
                    azureResponse.Add(client);
                }

                fileNameList.Add(newFileName);
            };

            return fileNameList;
        }

        public async Task<List<BlobItem>> GetUploadedBlobs()
        {
            var items = new List<BlobItem>();
            var uploadedFiles = _containerClient.GetBlobsAsync();
            await foreach (BlobItem file in uploadedFiles)
            {
                items.Add(file);
            }

            return items;
        }
    }
}