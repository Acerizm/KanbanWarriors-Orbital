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
    }
}

