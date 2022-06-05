using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Services;
using back_end.Models;

namespace back_end.Controllers
{
    [Produces("application/json")]
    [Route("api/Videos")]
    [ApiController]
    public class VideosController
    {
        private readonly VideosServices videosServices;

        public VideosController(VideosServices videosServices)
        {
            this.videosServices = videosServices;
        }
        // CRUD stands for Create Read Update Delete
        // Create -> HttpPost
        // Read -> HttpGet
        // Update -> HttpPut
        // Delete -> HttpDelete

        // ---------------------------------------------------------------------------- HTTPGET / READ -------------------------------------------------------------------------------------

        /// <summary>
        /// Gets all of the videos regardless of category
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetAllVideos
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/Videos/GetAllVideos

        [Route("GetAllVideos")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Videos>>> GetAllVideos()
        {
            List<Videos> videos = await Task.Run(() => videosServices.GetAllVideos());
            if (videos == null)
                return null;
            else
                return videos;
        }

        /// <summary>
        /// Gets a random video regardless of category
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetRandomVideo
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///     {
        ///        "id": "123124523124123452341",
        ///        "category": "Space",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/Videos/GetAllVideos

        [Route("GetRandomVideo")]
        [HttpGet]
        public async Task<ActionResult<string>> GetRandomVideo()
        {
            List<Videos> videos = await Task.Run(() => videosServices.GetAllVideos());
            List<string> allVideos = new List<string>();
            if (videos == null)
                return null;
            else
            {
                videos.ForEach((category) =>
                {
                    category.videoList.ForEach((videoId) =>
                    {
                        allVideos.Add(videoId);
                    });
                });
                // RNG 
                var random = new Random();
                int randomVideoIndex = random.Next(allVideos.Count);
                string randomVideo = allVideos[randomVideoIndex];
                return randomVideo;
            }
        }

        /// <summary>
        /// Gets all of the videos based on category id
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetVideosFromCategoryId/{id}
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/Videos/GetVideosFromCategoryId/{id}

        [Route("GetVideosFromCategoryId/{id}")]
        [HttpGet]
        public async Task<ActionResult<Videos>> GetVideosFromCategoryId(string id)
        {
            Videos videos = await Task.Run(() => videosServices.Get(id));
            if (videos == null)
                return null;
            else
                return videos;
        }

        /// <summary>
        /// Gets all of the videos based on category type eg. "Wildlife"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetVideosFromCategory/{category}
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/Videos/GetVideosFromCategory/{category}

        [Route("GetVideosFromCategory/{category}")]
        [HttpGet]
        public async Task<ActionResult<Videos>> GetVideosFromCategory(string category)
        {
            Videos videos = await Task.Run(() => videosServices.GetFromCategory(category));
            if (videos == null)
                return null;
            else
                return videos;
        }

        /// <summary>
        /// Gets a random video id based on category type eg. "Wildlife"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetRandomVideoFromCategory/{category}
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/Videos/GetRandomVideoFromCategory/{category}

        [Route("GetRandomVideoFromCategory")]
        [HttpGet]
        public async Task<ActionResult<string>> GetRandomVideoFromCategory(string category)
        {
            Videos videos = await Task.Run(() => videosServices.GetFromCategory(category));
            int numOfVideos = videos.videoList.Count();
            Random rng = new Random();
            int randomNumber = rng.Next(1,numOfVideos + 1);  
            return videos.videoList.ElementAt(randomNumber - 1);
        }

        // ---------------------------------------------------------------------------- HTTPPOST / CREATE -------------------------------------------------------------------------------------

        /// <summary>
        /// Create a new category of videos.
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /CreateNewVideoCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/CreateNewVideoCategory

        [Route("CreateNewVideoCategory")]
        [HttpPost]
        public async Task<ActionResult<Videos>> CreateNewVideoCategory(string category,List<string> videoList)
        {
            Videos newVideos = new Videos();

            while (true)
            {
                // create a new object id for MongoDB
                var objectId = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
                //check for the objectId if it exists
                var checkId = videosServices.Get(objectId);
                if (checkId == null)
                {
                    newVideos.id = objectId;
                    newVideos.category = category;
                    newVideos.videoList = videoList;
                    await Task.Run(() => videosServices.Create(newVideos));
                    return newVideos;
                }
                else
                    continue;
            }
        }

        // ---------------------------------------------------------------------------- HTTPPUT / UPDATE -------------------------------------------------------------------------------------

        /// <summary>
        /// update videos from a particular category based on category type.
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /UpdateVideosFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["HjvIAJMbXi4","anotherYoutubeVideoId","anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/UpdateVideosFromCategory

        [Route("UpdateVideosFromCategory")]
        [HttpPut]
        public async Task<ActionResult<Videos>> UpdateVideosFromCategory(string category, List<string> videoList)
        {
            //var checkCategory = videosServices.GetFromCategory(category);
            //if (checkCategory == null)
            //{
            //    // update the code here in the future for error handling
            //    // Microsoft's doucmentation is trash
            //    return null;
            //}
            var updatedVideoCategory = videosServices.GetFromCategory(category);
            updatedVideoCategory.videoList = videoList;
            await videosServices.UpdateByCategoryAsync(category, updatedVideoCategory);
            return updatedVideoCategory;
        }

        /// <summary>
        /// add more videos to an exisiting video category.
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /AddVideosFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["anotherYoutubeVideoId","anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/UpdateVideosFromCategory

        [Route("AddVideosFromCategory")]
        [HttpPut]
        public async Task<ActionResult<Videos>> AddVideosFromCategory(string category, List<string> addtionalVideoList)
        {
            //var checkCategory = videosServices.GetFromCategory(category);
            //if (checkCategory == null)
            //{
            //    // update the code here in the future for error handling
            //    // Microsoft's doucmentation is trash
            //    return null;
            //}
            var updatedVideoCategory = videosServices.GetFromCategory(category);
            List<string> updatedVideoList = updatedVideoCategory.videoList;

            // add each item from additionalVideoList to the updatedVideoList
            addtionalVideoList.ForEach(newVideoId =>
            {
                updatedVideoList.Add(newVideoId);
            });
            await videosServices.UpdateByCategoryAsync(category, updatedVideoCategory);
            return updatedVideoCategory;
        }

        /// <summary>
        /// add a video exisiting video category.
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /AddVideoFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/UpdateVideoFromCategory

        [Route("AddVideoFromCategory")]
        [HttpPut]
        public async Task<ActionResult<Videos>> AddVideoFromCategory(string category, string newVideoId)
        {
            //var checkCategory = videosServices.GetFromCategory(category);
            //if (checkCategory == null)
            //{
            //    // update the code here in the future for error handling
            //    // Microsoft's doucmentation is trash
            //    return null;
            //}
            var updatedVideoCategory = videosServices.GetFromCategory(category);
           updatedVideoCategory.videoList.Add(newVideoId);
            await videosServices.UpdateByCategoryAsync(category, updatedVideoCategory);
            return updatedVideoCategory;
        }

        // ---------------------------------------------------------------------------- HTTPDELETE / DELETE -------------------------------------------------------------------------------------

        /// <summary>
        /// delete ALL videos from an exisiting category!
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /DeleteAllVideosFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/DeleteAllVideosFromCategory

        [Route("DeleteAllVideosFromCategory")]
        [HttpDelete]
        public async Task<ActionResult<string>> DeleteAllVideosFromCategory(string category)
        {
            await videosServices.RemoveAsync(category);
            // change the logic here in the future
            // at the momemnt there is no use of deletion
            // this is just an example to show a use case of deletion for other features such as To-Do list
            return "Videos has been deleted :p";
        }

        /// <summary>
        /// delete a video from an exisiting category!
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /DeleteAllVideosFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/DeleteVideoFromCategory

        [Route("DeleteVideoFromCategory")]
        [HttpDelete]
        public async Task<ActionResult<string>> DeleteVideoFromCategory(string category, string videoId)
        {
            Videos videos = videosServices.GetFromCategory(category);
            videos.videoList.Remove(videoId);
            await videosServices.UpdateByCategoryAsync(category, videos);
            return String.Format("{0} has been deleted!",videoId);
        }

        /// <summary>
        /// delete multiple videos from an exisiting category!
        /// Please note that the video list contains "youtube video ids"
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /DeleteAllVideosFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/DeleteVideoFromCategory

        [Route("DeleteVideosFromCategory")]
        [HttpDelete]
        public async Task<ActionResult<string>> DeleteVideosFromCategory(string category, List<string> videosToBeDeleted)
        {
            Videos videos = videosServices.GetFromCategory(category);
            string alertVideosDeleted = "";
            foreach(var videosToBeDeletedItem in videosToBeDeleted)
            {
                alertVideosDeleted += videosToBeDeletedItem + ", ";
                videos.videoList.Remove(videosToBeDeletedItem);
            }
            await videosServices.UpdateByCategoryAsync(category, videos);
            return alertVideosDeleted + " has been deleted!";
        }





    } // End of VideoController class
}
