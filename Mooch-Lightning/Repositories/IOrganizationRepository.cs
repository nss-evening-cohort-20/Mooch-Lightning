using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IOrganizationRepository
    {
        List<Organization> GetAll();
        Organization GetById(int id);
        Organization GetOrganizationWithMembership(int Id);
    }
}