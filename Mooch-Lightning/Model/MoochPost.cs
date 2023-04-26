namespace Mooch_Lightning.Model
{
    public class MoochPost
    {
        public int Id { get; set; }
        public int UserMembershipId { get; set; }
        public bool IsMooched { get; set; }
        public DateTime? AvailabilityStartDate { get; set; }
        public DateTime? AvailabilityEndDate { get; set; }
    }
}
