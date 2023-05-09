using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IUserRepository
    {
        User GetById(int id);
        UserDetails AddUser(UserDetails userDetails);
        void UpdateUser(UserDetails userDetails);
        void DeleteUser(int id);
        List<MembershipAndOrg> GetUserMemberships(int userId);
        User GetByFirebaseUId(string FbId);

        UserMembershipsAndMoochRequests GetUserMembershipsAndRequestsById(int userId);
    }
}