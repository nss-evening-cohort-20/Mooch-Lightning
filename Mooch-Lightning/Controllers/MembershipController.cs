using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Mooch_Lightning.Model;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers;

[Route("api/[controller]")]
[ApiController]

public class MembershipController : ControllerBase
{


    private readonly IMembershipRepository _membershipRepository;

    public MembershipController(IMembershipRepository membershipRepository)
    {
        _membershipRepository = membershipRepository;
    }
    // GET: Membership
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_membershipRepository.GetAll());
    }

    // GET: Membership/Details/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var membership = _membershipRepository.GetById(id);
        if (membership == null)
        {
            return NotFound();
        }
        return Ok(membership);
    }


    [HttpPost]
    public IActionResult Post(Membership membership)
    {
        _membershipRepository.Add(membership);
        return CreatedAtAction("Get", new { id = membership.Id }, membership);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Membership membership)
    {
        if (id != membership.Id)
        {
            return BadRequest();
        }

        _membershipRepository.Update(membership);
        return Ok(membership); 
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _membershipRepository.Delete(id);
        return NoContent();
    }
}