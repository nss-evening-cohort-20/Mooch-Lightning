using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;


namespace Mooch_Lightning.Controllers;

[Route("api/[controller]")]
[ApiController]

public class MembershipMoochController : ControllerBase
{
    private readonly IMembershipMoochRepository _membershipMoochRepo;

    public MembershipMoochController(IMembershipMoochRepository membershipMoochRepo)
    {
        _membershipMoochRepo = membershipMoochRepo;
    }

    [HttpGet("{id}")]
    public IActionResult GetMembershipMoochById(int id)
    {
        if(_membershipMoochRepo.GetMembershipMoochbyId(id) == null)
        {
            return NotFound();
        }
        return Ok(_membershipMoochRepo.GetMembershipMoochbyId(id));
    }
    
}
