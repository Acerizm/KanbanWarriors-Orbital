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
    }

    public class Users
    {
        [BsonElement("userId")]
        [JsonPropertyName("userId")]
        public string userId { get; set; }

        [BsonElement("userAvatar")]
        [JsonPropertyName("userAvatar")]
        public string userAvatar { get;set; }

        [BsonElement("userName")]
        [JsonPropertyName("userName")]
        public string userName { get; set; }    
    }

}

