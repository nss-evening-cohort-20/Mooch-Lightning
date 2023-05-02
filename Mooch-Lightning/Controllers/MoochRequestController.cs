using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;


namespace Mooch_Lightning.Controllers;

[Route("api/[controller]")]
[ApiController]

public class MoochRequestController : ControllerBase
{
    private readonly IMoochRequestRepository _moochRequestRepo;

    public MoochRequestController(IMoochRequestRepository moochRequestRepo)
    {
        _moochRequestRepo = moochRequestRepo;
    }

    [HttpGet("{id}")]
    public IActionResult GetMoochRequestById(int id)
    {
        if(_moochRequestRepo.GetMoochRequestById(id) == null)
        {
            return NotFound();
        }
        return Ok(_moochRequestRepo.GetMoochRequestById(id));
    }

    [HttpGet ("TopFiveApproved")]
    public IActionResult TopFiveApprovedMoochRequests()
    {
        return Ok(_moochRequestRepo.TopFiveApprovedMoochRequests());
    }

    [HttpGet("TopFivePending")]
    public IActionResult TopFivePendingMoochRequests()
    {
        return Ok(_moochRequestRepo.TopFivePendingMoochRequests());
    }


}
