using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
}
