using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Services;
using back_end.Models;

namespace back_end.Controllers
{
    [Produces("application/json")]
    [Route("api/LiveRoom")]
    [ApiController]
    public class LiveRoomController
    {
        private readonly LiveRoomServices liveRoomServices;

        public LiveRoomController(LiveRoomServices liveRoomServices)
        {
            this.liveRoomServices = liveRoomServices;
        }
        // CRUD stands for Create Read Update Delete
        // Create -> HttpPost
        // Read -> HttpGet
        // Update -> HttpPut
        // Delete -> HttpDelete

        // ---------------------------------------------------------------------------- HTTPGET / READ -------------------------------------------------------------------------------------

        /// <summary>
        /// Check if locked room exists
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /CheckLockedRoom
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "userId": "62979eb0c19fd38c79cdb3b8",
        ///        "roomId": "123"
        ///        "password": "pwd"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/LiveRoom/CheckLockedRoom

        [Route("CheckLockedRoom")]
        [HttpGet]
        public async Task<ActionResult<bool>> CheckLockedRoom(string roomId, string password)
        {
            LockedRooms lockedRoom = await Task.Run(() => liveRoomServices.Get(roomId,password));
            if (lockedRoom == null)
                return false;
            else
                return true;
        }

        /// <summary>
        /// Check if locked room exists by roomId
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /CheckRoomIdAvailable
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "userId": "62979eb0c19fd38c79cdb3b8",
        ///        "roomId": "123"
        ///        "password": "pwd"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/LiveRoom/CheckRoomIdAvailable

        [Route("CheckRoomIdAvailable")]
        [HttpGet]
        public async Task<ActionResult<bool>> CheckRoomIdAvailable(string roomId)
        {
            LockedRooms lockedRoom = await Task.Run(() => liveRoomServices.GetByRoomId(roomId));
            if (lockedRoom == null)
                return false;
            else
                return true;
        }

        /// <summary>
        /// Check if locked room exists by socketId
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /CheckRoomBySocketId
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "userId": "62979eb0c19fd38c79cdb3b8",
        ///        "roomId": "123"
        ///        "password": "pwd"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/LiveRoom/CheckRoomBySocketId

        [Route("CheckRoomBySocketId")]
        [HttpGet]
        public async Task<ActionResult<string>> CheckRoomBySocketId(string socketId)
        {
            LockedRooms lockedRoom = await Task.Run(() => liveRoomServices.GetBySocketId(socketId));
            if (lockedRoom == null)
                return null;
            else
                return lockedRoom.roomId;
        }

        /// <summary>
        /// Create a new locked room
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /CreateNewLockedRoom
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "userId": "62979eb0c19fd38c79cdb3b8",
        ///        "roomId": "123"
        ///        "password": "pwd"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // GET: api/LiveRoom/CreateNewLockedRoom

        [Route("CreateNewLockedRoom")]
        [HttpPost]
        public async Task<ActionResult<LockedRooms>> CreateNewLockedRoom(string socketId, string roomId, string password)
        {
            LockedRooms newLockedRoom = new LockedRooms();
            while(true)
            {
                // create a new object id for MongoDB
                var objectId = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
                var checkId = liveRoomServices.Get(objectId);
                //check for the objectId if it exists
                if (checkId == null)
                {
                    newLockedRoom.id = objectId;
                    newLockedRoom.socketId = socketId;
                    newLockedRoom.roomId = roomId;
                    newLockedRoom.password = password;
                    await Task.Run(() => liveRoomServices.Create(newLockedRoom));
                    return newLockedRoom;
                }
                else
                    continue;

            }
        }

        /// <summary>
        /// delete socket host from the server
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      /DeleteSocketHost
        ///     {
        ///        "id": "62979eb0c19fd38c79cdb3b8",
        ///        "userId": "62979eb0c19fd38c79cdb3b8",
        ///        "roomId": "123"
        ///        "password": "pwd"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>       
        // POST: api/Videos/DeleteSocketHost

        [Route("DeleteSocketHost")]
        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteSocketHost(string socketId)
        {
            await liveRoomServices.RemoveAsync(socketId);
            return true;
        }


    } // End of LiveRoomController class
}
