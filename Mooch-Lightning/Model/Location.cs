namespace Mooch_Lightning.Model
{
    public class Location
    {
        public int Id { get; set; }
        public int OrganizationId { get; set; }
        public string StreetAddress { get; set;  }
        public string City { get; set; }    
        public int ZipCode { get; set; }
        public Organization Organization { get; set; }

    }
}
