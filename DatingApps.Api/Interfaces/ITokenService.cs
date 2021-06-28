using DatingApps.Api.Entities;

namespace DatingApps.Api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}