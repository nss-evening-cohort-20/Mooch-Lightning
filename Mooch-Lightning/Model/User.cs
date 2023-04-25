namespace Mooch_Lightning.Model;

public class User
{
    public int Id { get; set; }
    public string FirebaseUid { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int SubscriptionLevelId { get; set; }
    public string ImageUrl { get; set; }
    public List<MembershipMooch> MembershipMooches { get; set; } = new List<MembershipMooch>();
    public List<UserMembership> UserMemberships { get; set; } = new List<UserMembership>();
}
