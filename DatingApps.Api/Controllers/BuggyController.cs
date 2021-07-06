﻿using System;
using DatingApps.Api.Data;
using DatingApps.Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DatingApps.Api.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }
        
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }
        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);

            var thingToReturn = thing.ToString();

            return thingToReturn;
            
        }
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this was not a good request");
        }
    }
}