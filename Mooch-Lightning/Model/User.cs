namespace Mooch_Lightning.Model;

public class User
{
    public int Id { get; set; }
    public string FirebaseUid { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public int SubscriptionLevelId { get; set; }
    public string ImageUrl { get; set; }
    public List<UserMoochRequestDetails>? UserMoochRequestDetails { get; set; }
    public List<UserMembershipDetails>? UserMembershipsDetails { get; set; }
    public List<UserMoochPostDetails>? UserMoochPostDetails { get; set; }
}

public class UserMoochPostDetails
{
    public int UserId { get; set; }
    public int MembershipId { get; set; }
    public int MoochPostId { get; set; }
    public bool? IsMooched { get; set; }
    public DateTime? AvailabilityStartDate { get; set; }
    public DateTime? AvailabilityEndDate { get; set; }

}

public class UserMembershipDetails
{
    public int UserId { get; set; }
    public int MembershipId { get; set; }
    public string? MembershipDescription { get; set; }
    public string? MembershipImageUrl { get; set; }
    public int OrganizationId { get; set; }
    public string? OrganizationName { get; set; }
    public string? OrignizationImageUrl { get; set; }
    public string? OrganizationType { get; set; }

}
public  class UserMoochRequestDetails
{
    public int UserId { get; set; }
    public int MoochRequestId { get; set; }
    public int MoochPostId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool? IsApproved { get; set; }
    public DateTime? DateCreated { get; set; }


}

public class UserLastestMoochRequest
{
    public string Username { get; set; }
    public string ImageUrl { get; set; }
}

//public class UserMembershipList 
//{ 
//    public List<MembershipAndOrg> Memberships { get; set; }
//}

public class UserMembershipsAndMoochRequests
{ 
    public string MembershipDescription { get; set; }

    public string MembershipImageUrl { get; set; }

    public int MoochRequestId { get; set; }

    public DateTime? MoochRequestDateCreated { get; set; }

    public int MoochRequestMoochPostId { get; set; }

    public DateTime? MoochRequestStartDate { get; set; }

    public DateTime? MoochRequestEndDate { get; set; }

    public bool? MoochRequestIsApproved { get; set; }

}

public class UserDetails
{
    public int Id { get; set; }
    public string FirebaseUid { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public int SubscriptionLevelId { get; set; }
    public string ImageUrl { get; set; }
}

