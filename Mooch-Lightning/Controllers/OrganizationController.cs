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

        // GET: Organization/Create
       // public ActionResult Create()
        //{
        //    return View();
        //}

        // POST: Organization/Create
        //[HttpPost]
       // [ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        // TODO: Add insert logic here

        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        // GET: Organization/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        // POST: Organization/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        // TODO: Add update logic here

        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        // GET: Organization/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        // POST: Organization/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        // TODO: Add delete logic here

        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
