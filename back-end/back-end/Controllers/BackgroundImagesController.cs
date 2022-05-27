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
    [Route("api/BackgroundImages")]
    [ApiController]
    public class BackgroundImagesController : ControllerBase
    {
        private readonly BackgroundImagesServices backgroundImagesServices;

        public BackgroundImagesController(BackgroundImagesServices backgroundImagesServices)
        {
            this.backgroundImagesServices = backgroundImagesServices;
        }

        /// <summary>
        /// Gets all of the backgroundImages regardless of category
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetAllImages
        ///     {
        ///        "id": "5ce37619a9e07c300c1e6a7d",
        ///        "category": "Nature",
        ///        "backgroundImages": [1,2],
        ///        "cloudinaryRP": "/relative_path"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/BackgroundImages/GetAllImages

        [Route("GetAllImages")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Images>>> GetAllImages()
        {
            List<Images> imagesList = await Task.Run(() => backgroundImagesServices.GetAllImages());
            if (imagesList == null)
                return null;
            else
                return imagesList;
        }

        /// <summary>
        /// Gets all of the backgroundImages based on category Id
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /GetImagesFromCategory/{Id}
        ///     {
        ///        "id": "5ce37619a9e07c300c1e6a7d",
        ///        "category": "Nature",
        ///        "backgroundImages": [1,2],
        ///        "cloudinaryRP": "/relative_path"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/BackgroundImages/GetAllImages
        [Route("GetImagesFromCategory/{Id}")]
        [HttpGet]
        public async Task<ActionResult<Images>> GetImagesFromCategory(string Id)
        {
            Images images = await Task.Run(() => backgroundImagesServices.Get(Id));
            if (images == null)
                return null;
            else
                return images;
        }

        /// <summary>
        /// Gets all of the backgroundImages based on category Id
        /// </summary>
        /// Sample request:
        ///
        ///      /GetImagesFromCategory/{Id}
        ///     {
        ///        "id": "5ce37619a9e07c300c1e6a7d",
        ///        "category": "Nature",
        ///        "backgroundImages": [1,2],
        ///        "cloudinaryRP": "/relative_path"
        ///     }
        ///
        /// <param name="category"></param>
        /// <returns></returns>
        [Route("GetImagefromCategory/{category}")]
        [HttpGet]
        public async Task<ActionResult<Images>> GetImageFromCategory(string category)
        {
            Images images = await Task.Run(() => backgroundImagesServices.GetCategory(category));
            if (images == null)
                return null;
            else
                return images;
        }

        /// <summary>
        /// Create a new category of images
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /CreateNewCategory
        ///     {
        ///        "id": "5cea58888578a12e180e9703",
        ///        "category": "Wildlife",
        ///        "backgroundImages": [1,2],
        ///        "cloudinaryRP": "./."
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        //POST: create new category of images
        [Route("CreateNewCategory")]
        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<ActionResult<Images>> CreateNewCategory(string category, List<int> backgroundImages,string cloudinaryRP)
        {
            // the loop will continue to run if we are able to find any phone model 
            // with an exisiting ID
            Images newCategoryOfImages = new Images();
            // this is bad algo
            // o(n) when data is damn huge
            // improve this algo
            while (true)
            {
                //create a new objectId
                var objectId = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
                //check for the objectId if it exists
                var checkId = backgroundImagesServices.Get(objectId);
                if (checkId == null)
                {
                    newCategoryOfImages.Id = objectId;
                    newCategoryOfImages.category = category;
                    newCategoryOfImages.backgroundImages = backgroundImages;
                    newCategoryOfImages.cloudinaryRP = cloudinaryRP;
                    await Task.Run(() => backgroundImagesServices.Create(newCategoryOfImages));
                    return newCategoryOfImages;
                }
                else
                    continue;
            }
        }


    }
}
