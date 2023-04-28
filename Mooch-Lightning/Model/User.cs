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
    //public List<MoochRequest> MoochRequests { get; set; }
    //public List<UserMembership> UserMemberships { get; set; }
    //public List<MoochPost> MoochPosts { get; set;}
}
