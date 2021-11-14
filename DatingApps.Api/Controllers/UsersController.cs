using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using DatingApps.Api.Interfaces;
using DatingApps.Api.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace DatingApps.Api.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //var users = await this.userRepository.GetUsersAsync();
            //var usersToReturn = this.mapper.Map<IEnumerable<MemberDto>>(users);

            var users = await this.userRepository.GetMembersAsync();

            return Ok(users);
        }

        //[HttpGet("{username}")]
        //public async Task<ActionResult<MemberDto>> GetUser(string username)
        //{
        //    //var user = await this.userRepository.GetUserByUsername(username);
        //    //return this.mapper.Map<MemberDto>(user);
        //    return await this.userRepository.GetMemberAsync(username);
        //}

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await this.userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await this.userRepository.GetUserByUsernameAsync(username);

            this.mapper.Map(memberUpdateDto, user);
            this.userRepository.Update(user);

            if(await this.userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("gagal update usernya");
        }
    }
}
