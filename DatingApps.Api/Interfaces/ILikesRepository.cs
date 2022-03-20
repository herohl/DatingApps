using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApps.Api.DTOs;
using DatingApps.Api.Entities;

namespace DatingApps.Api.Interfaces;

public interface ILikesRepository
{
    Task<UserLike> GetUserLike(int sourceUserId, int likeUserId);
    Task<AppUser> GetUserWithLikes(int userId);
    Task<IEnumerable<LikeDTO>> GetUserLikes(string predicate, int userId);
    
}