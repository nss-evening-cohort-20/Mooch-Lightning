using FirebaseAdmin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var loggedInUser = User;
        
        //var fb = FirebaseApp.DefaultInstance;

        return Ok(_userRepository.GetById(id));


    }

    [HttpGet("/api/UserExists/{firebaseUid}")]
    public IActionResult GetByFirebaseUId(string firebaseUid)
    {
        var user = _userRepository.GetByFirebaseUId(firebaseUid);

        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
}
