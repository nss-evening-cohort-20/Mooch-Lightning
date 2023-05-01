namespace Mooch_Lightning.Model;

public class UserMembership
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; } = null;
    public int MembershipId { get; set; }
    public Membership? Membership { get; set; } = null;
}

