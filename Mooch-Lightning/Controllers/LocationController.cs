using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;


namespace Mooch_Lightning.Controllers;
[Route("api/[controller]")]
[ApiController]
public class LocationController : ControllerBase
{
    private readonly ILocationRepository _locationRepo;

    public LocationController(ILocationRepository locationRepo)
    {
        _locationRepo = locationRepo; 
    }

    [HttpGet("{id}")]
    public IActionResult GetLocationById(int id)
    {
        if (_locationRepo.GetLocationById(id) == null)
        {
            return NotFound();
        }
        return Ok(_locationRepo.GetLocationById(id));
    }
}
