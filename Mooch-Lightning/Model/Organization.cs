using System;
namespace Mooch_Lightning.Model
{
	public class Organization

    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OrganizationTypeId { get; set; }
        public OrganizationType OrganizationType { get; set; }
        public string ImageUrl { get; set; }
        public List<Location> Locations { get; set; }

        // List of Memberships
    }
}

