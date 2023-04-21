using System;
using System.Reflection.PortableExecutable;
using Gifter.Repositories;
using Gifter.Utils;
using Microsoft.Extensions.Hosting;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories;

public class OrganizationRepository : BaseRepository, IOrganizationRepository

{
    public OrganizationRepository(IConfiguration configuration) : base(configuration) { }


    public List<Organization> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                 SELECT [Id]
                        ,[Name]
                        ,[OrganizationTypeId]
                        ,[ImageUrl]
                 FROM [Mooch].[dbo].[Organization]";

                var reader = cmd.ExecuteReader();

                var organizations = new List<Organization>();
                while (reader.Read())
                {
                    organizations.Add(new Organization()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        OrganizationTypeId = DbUtils.GetInt(reader, "OrganizationTypeId"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                    });
                }

                reader.Close();

                return organizations;
            }
        }
    }
    public Organization GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    SELECT [Id]
                           ,[Name]
                           ,[OrganizationTypeId]
                           ,[ImageUrl]
                    FROM [Mooch].[dbo].[Organization]
                    WHERE Id = @id;";
                cmd.Parameters.AddWithValue("@id", id);
                var reader = cmd.ExecuteReader();
                Organization organization = null;

                if (reader.Read())
                {
                    organization = new Organization()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        OrganizationTypeId = DbUtils.GetInt(reader, "OrganizationTypeId"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl")

                    };
                }


                reader.Close();
                return organization;
            }
        }
    }
}
