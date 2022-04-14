using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace DatingApps.Api.Entities;

public class AppUserRole : IdentityUserRole<int>
{
    public AppUser User { get; set; }
    public AppRole Role { get; set; }
}