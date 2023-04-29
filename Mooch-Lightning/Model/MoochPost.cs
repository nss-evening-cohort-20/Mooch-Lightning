namespace Mooch_Lightning.Model
{
    public class MoochPost
    {
        public int Id { get; set; }
        public int UserMembershipId { get; set; }
        public bool? IsMooched { get; set; }
        public DateTime? AvailabilityStartDate { get; set; }
        public DateTime? AvailabilityEndDate { get; set; }
    }

    public class MoochPostSearchResult
    {
        public int Id { get; set; }
        public string OrganizationName { get; set; }
        public string MembershipDescription { get; set; }
        public string MembershipImageUrl { get; set; }
        public string Type { get; set; }
        public string UserName { get; set; }
        public string UserImageUrl { get; set; }
        public bool? IsMooched { get; set; }
        public DateTime? AvailabilityStartDate { get; set; }
        public DateTime? AvailabilityEndDate { get; set; }
        
    }
}
