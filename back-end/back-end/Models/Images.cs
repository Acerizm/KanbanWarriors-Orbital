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
    // class -> collection/table in MongoDB
    // do not confuse with "databases" and "collections" in MongoDB's schema
    // Bson is a data type created by MongoDB

    // Serialization/Deserialization -> [BsonRepresentation(BsonType.<type>)]
    public class Images
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("category")]
        [JsonPropertyName("category")]
        [Required]
        public string category { get; set; }

        [BsonElement("backgroundImages")]
        [JsonPropertyName("backgroundImages")]
        [BsonRepresentation(BsonType.Int32)]
        public List<int> backgroundImages { get; set; }

        // decide on image cdn to use
        // proposed: Cloudinary
        // if brave, can try Amazon S3 bucket I guess for our CDN
        // cloudinaryRP means cloudinary relative path
        // eg. /PhoneModels/Apple_Logo
        [BsonElement("cloudinaryRP")]
        [JsonPropertyName("cloudinaryRP")]
        [Required]
        public string cloudinaryRP { get; set; }
    }
}
