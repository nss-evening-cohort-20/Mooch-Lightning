using Gifter.Repositories;
using Gifter.Utils;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public class LocationRepository : BaseRepository, ILocationRepository
    {
        public LocationRepository(IConfiguration configuration) : base(configuration) { }

        public Location GetLocationById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
SELECT [Id]
      ,[OrganizationId]
      ,[StreetAddress]
      ,[City]
      ,[Zipcode]
  FROM [Location]
WHERE ID = @id;
";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    Location location = null;
                    if (reader.Read())
                    {
                        location = new Location()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            OrganizationId = DbUtils.GetInt(reader, "OrganizationId"),
                            StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                            City = DbUtils.GetString(reader, "City"),
                            ZipCode = DbUtils.GetInt(reader, "Zipcode")
                        };

                    }
                    reader.Close();
                    return location;

                }
            }
        }
    }
}
