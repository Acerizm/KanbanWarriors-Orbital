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

        public List<Users> GetOnlineUsers(string roomId)
        {
            return lockedRoomsCollection.Find(room => room.roomId == roomId).First().onlineUsersList;
        }

        public async Task<bool> CheckOnlineUserExist(string userId, string roomId)
        {
            LockedRooms tempRoom = await lockedRoomsCollection.Find(room => room.roomId == roomId).FirstOrDefaultAsync();
            return tempRoom.onlineUsersList.Exists(user => user.userId == userId);
        
        }

        public LockedRooms Create(LockedRooms lockedRoom)
        {
            lockedRoomsCollection.InsertOne(lockedRoom);
            return lockedRoom;
        }

        public async Task UpdateChannelUsers(string roomId,string channelId, Users user)
        {
            // in the future redo this code with atomic operations to optimize code
            LockedRooms tempRoom = lockedRoomsCollection.Find(room => room.roomId == roomId).First();
            var tempChannel = tempRoom.channelList.Find(channel => channel.channelId == channelId);
            if(tempChannel != null)
            {
                // then check if the user already exists in the list
                bool isUserExist = tempChannel.users.Any(ChannelUser => ChannelUser.userId == user.userId);
                if (isUserExist)
                {
                    // remove the user from the channel
                    tempRoom.channelList.Find(channel => channel.channelId == channelId).users.RemoveAll(ChannelUser => ChannelUser.userId == user.userId);
                } else
                {
                    tempRoom.channelList.Find(channel => channel.channelId == channelId).users.Add(user);
                }
                // then update the whole document inside mongodb
                await lockedRoomsCollection.ReplaceOneAsync(room => room.roomId == roomId, tempRoom);
            }
        }

        public async Task AddUserToOnlineList(string roomId, Users user)
        {
            LockedRooms tempRoom = lockedRoomsCollection.Find(room => room.roomId == roomId).First();
            tempRoom.onlineUsersList.Add(user);
            await lockedRoomsCollection.ReplaceOneAsync(room => room.roomId == roomId, tempRoom);
        }

        // method overloading here
        public async Task DeleteUserFromOnlineList(string roomId, string socketId)
        {
            LockedRooms tempRoom = lockedRoomsCollection.Find(room => room.roomId == roomId).First();
            await Task.Run(() => tempRoom.onlineUsersList.RemoveAll(user => user.socketId == socketId));
            await lockedRoomsCollection.ReplaceOneAsync(room => room.roomId == roomId, tempRoom);
        }
        public async Task DeleteUserFromOnlineList(string roomId, Users user)
        {
            LockedRooms tempRoom = lockedRoomsCollection.Find(room => room.roomId == roomId).First();
            await Task.Run(() => tempRoom.onlineUsersList.RemoveAll(TempUser => TempUser.userId == user.userId));
            await lockedRoomsCollection.ReplaceOneAsync(room => room.roomId == roomId, tempRoom);
        }

        public async Task UpdateRoom(LockedRooms newRoom)
        {
            await lockedRoomsCollection.ReplaceOneAsync(room => room.roomId == newRoom.roomId, newRoom);
        }

        public async Task RemoveAsync(string socketId)
        {
            await lockedRoomsCollection.DeleteOneAsync(lockedRoom => lockedRoom.socketId == socketId);
        }
        
    }
}

