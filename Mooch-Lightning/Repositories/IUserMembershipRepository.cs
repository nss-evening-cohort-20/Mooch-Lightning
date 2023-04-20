using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IUserMembershipRepository
    {
        UserMembership GetById(int id);
    }
}