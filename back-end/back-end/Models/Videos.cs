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
    public class Videos
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("category")]
        [JsonPropertyName("category")]
        [Required]
        public string category { get; set; }

        [BsonElement("videoList")]
        [JsonPropertyName("videoList")]
        [BsonRepresentation(BsonType.String)]
        public List<string> videoList { get; set; }
    }
}
