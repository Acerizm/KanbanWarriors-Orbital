using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using back_end.Models;
using Microsoft.Extensions.Options;

namespace back_end.Services
{
    public class VideosServices
    {
        private readonly IMongoCollection<Videos> videosCollection;

        // to get the collection from MongoDB
        public VideosServices(IOptions<BackgroundImagesDatabaseSettings> backgroundImagesDatabaseSettings)
        {
            // something is wrong here
            // the value is null here
            var mongoClient = new MongoClient(backgroundImagesDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(backgroundImagesDatabaseSettings.Value.DatabaseName);

            videosCollection = mongoDatabase.GetCollection<Videos>(backgroundImagesDatabaseSettings.Value.CollectionNames.Find(
               collectionName => collectionName == "Videos"
               ));
        }
        // CRUD interfaces will be done here

        // 1. Get All Items
        public List<Videos> GetAllVideos()
        {
            // error here for deserialization
            List<Videos> videos = videosCollection.Find(videos => true).ToList();
            return videos;
        }

        // 2. Get videos by id
        public Videos Get(string id)
        {
            Videos videos = videosCollection.Find(videos => videos.id == id).FirstOrDefault();
            return videos;
        }

        // 3. Get videos by category
        public Videos GetFromCategory(string category)
        {
            Videos videos = videosCollection.Find(videos => videos.category == category).FirstOrDefault();
            return videos;
        }

        // 3.Create a new category of images
        public Videos Create(Videos videos)
        {
            videosCollection.InsertOne(videos);
            return videos;
        }

        // 4. Update existing category
        // this is just an example to update the whole category
        public void UpdateById(string id, Videos updatedVideos)
        {
            videosCollection.ReplaceOne(oldVideos => oldVideos.id == id, updatedVideos);
        }

        // Update existing category by category
        public async Task UpdateByCategoryAsync(string category,Videos updatedVideos)
        {
            await videosCollection.ReplaceOneAsync(oldVideos => oldVideos.category == category, updatedVideos);
        }


        // 5. Remove the whole category of images
        public object Remove(string id)
        {
            var result = videosCollection.DeleteOne(videos => videos.id == id);
            return result;
        }
    }
}
