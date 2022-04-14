using System.Threading.Tasks;
using DatingApps.Api.Entities;

namespace DatingApps.Api.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}