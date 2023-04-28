using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers;

[Route("api/[controller]")]
[ApiController]

public class OrganizationController : ControllerBase
{


    private readonly IOrganizationRepository _organizationRepository;

    public OrganizationController(IOrganizationRepository organizationRepository)
    {
        _organizationRepository = organizationRepository;
    }
    // GET: Organization
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_organizationRepository.GetAll());
    }

    // GET: Organization/Details/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var organization = _organizationRepository.GetById(id);
        if (organization == null)
        {
            return NotFound();
        }
        return Ok(organization);
    }

    //Get: Organization with Membership
    [HttpGet("withMembership/{Id}")]
    public IActionResult GetOrganizationWithMemberships(int Id)
    {
        return Ok(_organizationRepository.GetOrganizationWithMembership(Id));
    }
}