using FirebaseAdmin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Model;
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

        return Ok(_userRepository.GetById(id));


    }

    [HttpGet("/api/UserExists/{firebaseUid}")]
    public IActionResult GetByFirebaseUId(string firebaseUid)
    {
        var user = _userRepository.GetByFirebaseUId(firebaseUid);

        if (user == null)
        {
            return Ok(false);
        }
        return Ok(user);
    }

    [HttpPost]
    public IActionResult AddUser(User user)
    {
        return Ok(_userRepository.AddUser(user));
    }

    //
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        _userRepository.DeleteUser(id);
        return NoContent();
    }
}
