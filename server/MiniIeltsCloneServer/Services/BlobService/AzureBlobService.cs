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

        public async Task<List<Azure.Response<BlobContentInfo>>> UploadFiles(List<IFormFile> files)
        {

            var azureResponse = new List<Azure.Response<BlobContentInfo>>();
            foreach(var file in files)
            {
                string fileName = file.FileName;
                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    memoryStream.Position = 0;
                    var client = await _containerClient.UploadBlobAsync(fileName, memoryStream, default);
                    azureResponse.Add(client);
                }
            };

            return azureResponse;
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