using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IMembershipRepository
    {
        List<Membership> GetAll();
        Membership GetById(int id);
    }
}