using System;
namespace Mooch_Lightning.Model
{
    public class Membership

    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int OrganizationId { get; set; }
        public string ImageUrl { get; set; }
    }

    public class MembershipAndOrg
    {
        public int Id { get; set; }
        public string Organization { get; set; }
        public string Description { get; set; }
    }
}

