using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers;

[Route("api/[controller]")]
[ApiController]

public class OrganizationTypeController : ControllerBase
{

    private readonly IOrganizationTypeRepository _organizationTypeRepository;

    public OrganizationTypeController(IOrganizationTypeRepository organizationTypeRepository)
    {
        _organizationTypeRepository = organizationTypeRepository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok(_organizationTypeRepository.GetById(id));
    }
    [HttpGet]
    public IActionResult GetAllOrganizations()
    {
        return Ok(_organizationTypeRepository.GetAll());
    }
}
