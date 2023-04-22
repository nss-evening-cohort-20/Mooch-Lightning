namespace Mooch_Lightning.Model;

public class UserMembership
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int MembershipId { get; set; }
}
