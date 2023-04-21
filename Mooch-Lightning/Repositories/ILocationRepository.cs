using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface ILocationRepository
    {
        Location GetLocationById(int id);
    }
}