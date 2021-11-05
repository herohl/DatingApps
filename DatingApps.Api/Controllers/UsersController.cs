using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using DatingApps.Api.Interfaces;
using DatingApps.Api.DTOs;
using AutoMapper;

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
    }
}
