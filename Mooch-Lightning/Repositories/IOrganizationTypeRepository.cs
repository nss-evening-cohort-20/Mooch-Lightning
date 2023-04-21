using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IOrganizationTypeRepository
    {
        OrganizationType GetById(int id);
    }
}