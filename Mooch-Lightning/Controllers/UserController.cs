﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers;

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

    [HttpGet("UserExists/{firebaseUid}")]
    public IActionResult GetByFirebaseUId(int firebaseUid)
    {
        var user = _userRepository.GetByFirebaseUId(firebaseUid);

        if (user == null)
        {
            return NotFound();
        }
        return Ok();
    }
}
