using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using back_end.Models;
using Microsoft.Extensions.Options;


// these will be the interfaces that we will use for our controllers/APIs
// so that we dont need to repeat the code again

// namespace -> refers to project solution
// this service is only for backgroundImages!

// Helpful Documentation on APIs -> https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-6.0&tabs=visual-studio
namespace back_end.Services
{
    public class BackgroundImagesServices
    {
        private readonly IMongoCollection<Images> imagesCollection;

        // to get the collection from MongoDB
        public BackgroundImagesServices(IOptions<BackgroundImagesDatabaseSettings> backgroundImagesDatabaseSettings)
        {
            // something is wrong here
            // the value is null here
            var mongoClient = new MongoClient(backgroundImagesDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(backgroundImagesDatabaseSettings.Value.DatabaseName);

            imagesCollection = mongoDatabase.GetCollection<Images>(backgroundImagesDatabaseSettings.Value.CollectionName);
        }

        // CRUD interfaces will be done here

        // 1. Get All Items
        public List<Images> GetAllImages()
        {
            // error here for deserialization
            List<Images> images = imagesCollection.Find(image => true).ToList();
            Images test = imagesCollection.Find(image => true).FirstOrDefault();
            return images;
        }

        // 2. Get images from category/id
        public Images Get(string id)
        {
            Images images = imagesCollection.Find(images => images.Id == id).FirstOrDefault();
            return images;
        }

        // 3.Create a new category of images
        public Images Create(Images images)
        {
            imagesCollection.InsertOne(images);
            return images;
        }

        // 4. Update existing category
        // this is just an example to update the whole category
        public void Update(string id, Images updatedImages)
        {
            imagesCollection.ReplaceOne(oldImages => oldImages.Id == id, updatedImages);
        }

        // 5. Remove the whole category of images
        public object Remove(string id)
        {
            var result = imagesCollection.DeleteOne(images => images.Id == id);
            return result;
        }
    }
}
