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
        // GET: api/BackgroundImages/GetAllVideos

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
        // GET: api/BackgroundImages/GetVideosFromCategoryId/{id}

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
        // GET: api/BackgroundImages/GetVideosFromCategory/{category}

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
        // POST: api/BackgroundImages/CreateNewVideoCategory

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
        // POST: api/BackgroundImages/UpdateVideosFromCategory

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
        // POST: api/BackgroundImages/UpdateVideosFromCategory

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
        ///      /AddVideosFromCategory
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "category": "Wildlife",
        ///        "videoList": ["anotherVideoId"],     
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/BackgroundImages/UpdateVideosFromCategory

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





    } // End of VideoController class
}
