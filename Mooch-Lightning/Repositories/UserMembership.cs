using Gifter.Repositories;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories;

public class UserMembershipRepository : BaseRepository, IUserMembershipRepository
{
    public UserMembershipRepository(IConfiguration configuration) : base(configuration) { }
    public UserMembership GetById(int id) { return new UserMembership(); }
}
