using Mooch_Lightning.Repositories;
using Mooch_Lightning.Utils;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public class OrganizationTypeRepository : BaseRepository, IOrganizationTypeRepository
    {
        public OrganizationTypeRepository(IConfiguration configuration) : base(configuration) { }

        public OrganizationType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT [Id],
                                        [Description] 
                                        FROM [Mooch].[dbo].[OrganizationType] 
                                        WHERE [Id] = @id;";
                    cmd.Parameters.AddWithValue("id", id);
                    var reader = cmd.ExecuteReader();
                    OrganizationType organizationType = null;

                    if (reader.Read())
                    {
                        organizationType = new OrganizationType()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Description = DbUtils.GetString(reader, "description")
                        };
                    }
                    reader.Close();
                    return organizationType;
                }
            }
        }

        public List<OrganizationType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT [Id],
                                        [Description] 
                                        FROM [Mooch].[dbo].[OrganizationType]";

                    var reader = cmd.ExecuteReader();
                    List<OrganizationType> types= new List<OrganizationType>();
                    while (reader.Read())
                    {
                        types.Add(new OrganizationType()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Description = DbUtils.GetString(reader, "description")
                        });
                    }
                    reader.Close();
                    return types;
                };
            }
        }


    }
}
