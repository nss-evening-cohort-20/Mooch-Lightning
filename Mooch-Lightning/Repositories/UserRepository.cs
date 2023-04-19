using Gifter.Repositories;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }
    public User GetById(int id) { return new User(); }
}
