using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace back_end.Models
{
    public class LockedRooms
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        // this is the socketId of the host
        [BsonElement("socketId")]
        [JsonPropertyName("socketId")]
        [Required]
        public string socketId { get; set; }

        [BsonElement("roomId")]
        [JsonPropertyName("roomId")]
        [Required]
        public string roomId { get; set; }

        [BsonElement("password")]
        [JsonPropertyName("password")]
        [BsonRepresentation(BsonType.String)]
        public string password { get; set; }

        public List<Channel> channelList { get; set; }

        // there is a need to store a list of users who are currently
        // or print all the users based on the channelList? 
        // Ans: Keep another list of users to list who is currently online and joined the room

        public List<Users> onlineUsersList { get; set; }
    }

    public class Channel {
        [BsonElement("channelId")]
        [JsonPropertyName("channelId")]
        public string channelId { get; set; }

        [BsonElement("channelName")]
        [JsonPropertyName("channelName")]
        public string channelName { get; set; }

        [BsonElement("users")]
        [JsonPropertyName("users")]
        public List<Users> users { get; set; }

        // One of the constructors for creating a new channel when the host creates a new room
        public Channel(string channelId, string channelName)
        {
            this.channelId = channelId;
            this.channelName = channelName;
            this.users = new List<Users>();
        }
    }

    public class Users
    {
        [BsonElement("userId")]
        [JsonPropertyName("userId")]
        public string userId { get; set; }

        // need to store the socketId of the user
        // so that when disconnect/disconnecting event happens,
        // remove the user from the userList based on the socketId
        [BsonElement("socketId")]
        [JsonPropertyName("socketId")]
        public string socketId { get; set; }

        [BsonElement("userAvatar")]
        [JsonPropertyName("userAvatar")]
        public string userAvatar { get;set; }

        [BsonElement("userName")]
        [JsonPropertyName("userName")]
        public string userName { get; set; }    
    }

}

