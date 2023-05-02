﻿namespace Mooch_Lightning.Model;

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
    public List<MoochRequest>? MoochRequests { get; set; }
    public List<UserMembership>? UserMemberships { get; set; }
    public List<MoochPost>? MoochPosts { get; set; }
}




public class UserLastestMoochRequest
{
    public string Username { get; set; }
    public string ImageUrl { get; set; }
}

public class UserMembershipList 
{ 
    public List<MembershipAndOrg> Memberships { get; set; }
}

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

