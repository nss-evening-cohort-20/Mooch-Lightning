﻿namespace Mooch_Lightning.Model
{
    public class MembershipMooch
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int UserMembershipId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsApproved { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}