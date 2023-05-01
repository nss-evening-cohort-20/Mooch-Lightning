using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mooch_Lightning.Model;
using Mooch_Lightning.Repositories;

namespace Mooch_Lightning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoochPostController : ControllerBase
    {
        private readonly IMoochPostRepository _MoochPostRepository;

        public MoochPostController(IMoochPostRepository moochPostRepository)
        {
            _MoochPostRepository = moochPostRepository;
        }

        [HttpPost]
        public IActionResult Add(MoochPost moochPost)
        {
            var newMoochPost = _MoochPostRepository.Add(moochPost);
            return Ok(new
            {
                message = "Created",
                moochPost = newMoochPost
            });
        }

        [HttpPut("{id}")]

        public IActionResult Update(MoochPost moochPost, int id)
        {
            _MoochPostRepository.Update(moochPost, id);
            return NoContent();
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            _MoochPostRepository.Delete(id);
            return NoContent();
        }

        [HttpGet]

        public IActionResult GetAll() 
        {
            return Ok(_MoochPostRepository.GetAll()); 
        }
    }
}
