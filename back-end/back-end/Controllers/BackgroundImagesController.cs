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

    }
}
