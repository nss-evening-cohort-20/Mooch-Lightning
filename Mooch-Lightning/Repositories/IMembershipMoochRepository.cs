using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public interface IMembershipMoochRepository
    {
        MembershipMooch GetMembershipMoochbyId(int id);
    }
}