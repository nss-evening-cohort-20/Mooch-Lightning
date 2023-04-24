using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IUserRepository
    {
        User GetById(int id);
        User AddUser(User user);
        User UpdateUser(User user);
        void DeleteUser(int id);
        User GetByFirebaseUId(string FbId);
    }
}