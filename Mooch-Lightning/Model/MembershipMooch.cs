namespace Mooch_Lightning.Model
{
    public class MembershipMooch
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int UserMembershipId { get; set; }
        // membership
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsApproved { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
