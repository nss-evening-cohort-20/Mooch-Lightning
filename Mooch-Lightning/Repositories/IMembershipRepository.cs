using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IMembershipRepository
    {
        void Add(Membership membership);
        void Delete(int id);
        List<Membership> GetAll();
        Membership GetById(int id);
        void Update(Membership membership);
    }
}