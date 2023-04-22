using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Model;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserMembershipController : ControllerBase
{
    private readonly IUserMembershipRepository _userMembershipRepository;

    public UserMembershipController(IUserMembershipRepository userMembershipRepository)
    {
        _userMembershipRepository = userMembershipRepository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok(_userMembershipRepository.GetById(id));
    }

    [HttpPost]

    public IActionResult Add(UserMembership userMembership)
    {
        var newUserMembership = _userMembershipRepository.Add(userMembership);
        return Ok(new
        {
            Message = "Created",
            UserMembership = newUserMembership
        }); 
    }

    [HttpPut]

    public IActionResult Update(UserMembership userMembership)
    {
        _userMembershipRepository.Update(userMembership);
        return NoContent();
    }

    [HttpDelete]

    public IActionResult Delete(int id)
    {
        _userMembershipRepository.Delete(id);
        return NoContent();
    }

}
