namespace Mooch_Lightning.Model
{
    public class MoochRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int MoochPostId { get; set; }
        public MoochPost MoochPost { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsApproved { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
