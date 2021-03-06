using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using back_end.Models;
using Microsoft.Extensions.Options;

namespace back_end.Services
{
    public class LiveRoomServices
    {
        private readonly IMongoCollection<LockedRooms> lockedRoomsCollection;

        // to get the collection from MongoDB
        public LiveRoomServices(IOptions<LiveRoomDatabaseSettings> liveRoomDatabaseSettings)
        {
            // something is wrong here
            // the value is null here
            var mongoClient = new MongoClient(liveRoomDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(liveRoomDatabaseSettings.Value.DatabaseName);

            lockedRoomsCollection = mongoDatabase.GetCollection<LockedRooms>(liveRoomDatabaseSettings.Value.CollectionNames.Find(
               collectionName => collectionName == "LockedRooms"
               ));
        }
        // CRUD interfaces will be done here
        public LockedRooms Get(string objectId)
        {
            LockedRooms result = lockedRoomsCollection.Find(lockedRoom => lockedRoom.id == objectId).FirstOrDefault();
            return result;
        }

        public LockedRooms Get(string roomId, string password)
        {
            LockedRooms result = lockedRoomsCollection.Find(lockedRoom => lockedRoom.roomId == roomId 
            && lockedRoom.password == password).FirstOrDefault();
            return result;
        }

        public LockedRooms GetByRoomId(string roomId)
        {
            LockedRooms result = lockedRoomsCollection.Find(lockedRoom => lockedRoom.roomId == roomId).FirstOrDefault();
            return result;
        }

        public LockedRooms GetBySocketId(string socketId)
        {
            LockedRooms result = lockedRoomsCollection.Find(lockedRoom => lockedRoom.socketId == socketId).FirstOrDefault();
            return result;
        }
        
        public List<LockedRooms> GetAllLockedRooms()
        {
            List<LockedRooms> list = lockedRoomsCollection.Find(lockedRooms => true).ToList();
            return list;
        }

        public LockedRooms Create(LockedRooms lockedRoom)
        {
            lockedRoomsCollection.InsertOne(lockedRoom);
            return lockedRoom;
        }

        public async Task RemoveAsync(string socketId)
        {
            await lockedRoomsCollection.DeleteOneAsync(lockedRoom => lockedRoom.socketId == socketId);
        }
        
    }
}

