using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace back_end.Models
{
    public class BackgroundImages
    {
        // Bson is a data type created by MongoDB
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("Category")]
        [Required]
        public string category { get; set; }

        [BsonElement("backgroundImages")]
        [BsonRepresentation(BsonType.String)]
        public List<string> backgroundImages { get; set; }

        // decide on image cdn to use
        // proposed: Cloudinary
        // if brave, can try Amazon S3 bucket I guess for our CDN
        // cloudinaryRP means cloudinary relative path
        // eg. /PhoneModels/Apple_Logo
        [BsonElement]
        [Required]
        public string cloudinaryRP { get; set; }
    }
}
