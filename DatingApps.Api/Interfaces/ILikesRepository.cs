using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApps.Api.DTOs;
using DatingApps.Api.Entities;
using DatingApps.Api.Helpers;

namespace DatingApps.Api.Interfaces;

public interface ILikesRepository
{
    Task<UserLike> GetUserLike(int sourceUserId, int likeUserId);
    Task<AppUser> GetUserWithLikes(int userId);
    Task<PagedList<LikeDTO>> GetUserLikes(LikesParams likesParams);
    
}