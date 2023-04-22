using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IUserMembershipRepository
    {
        UserMembership Add(UserMembership userMembership);
        void Delete(int id);
        UserMembership GetById(int id);
        UserMembership Update(UserMembership userMembership);
    }
}