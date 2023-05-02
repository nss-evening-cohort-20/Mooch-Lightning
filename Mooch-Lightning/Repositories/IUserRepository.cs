using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IUserRepository
    {
        User GetById(int id);
        User AddUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
        UserMembershipList GetUserMemberships(int userId);
        User GetByFirebaseUId(string FbId);
    }
}