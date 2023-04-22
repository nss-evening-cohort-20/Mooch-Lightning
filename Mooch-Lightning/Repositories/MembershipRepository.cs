using System;
using System.Reflection.PortableExecutable;
using Gifter.Repositories;
using Gifter.Utils;
using Microsoft.Extensions.Hosting;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories;

public class MembershipRepository : BaseRepository, IMembershipRepository
{
    public MembershipRepository(IConfiguration configuration) : base(configuration) { }


    public List<Membership> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                 SELECT [Id]
                        ,[Description]
                        ,[OrganizationId]
                        ,[ImageUrl]
                FROM [Mooch].[dbo].[Membership]";

                var reader = cmd.ExecuteReader();

                var memberships = new List<Membership>();
                while (reader.Read())
                {
                    memberships.Add(new Membership()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Description = DbUtils.GetString(reader, "Description"),
                        OrganizationId = DbUtils.GetInt(reader, "OrganizationId"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                    });
                }

                reader.Close();

                return memberships;
            }
        }
    }
    public Membership GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    SELECT [Id]
                           ,[Description]
                           ,[OrganizationId]
                           ,[ImageUrl]
                    FROM [Mooch].[dbo].[Membership]
                    WHERE Id = @id;";
                cmd.Parameters.AddWithValue("@id", id);
                var reader = cmd.ExecuteReader();
                Membership membership = null;

                if (reader.Read())
                {
                    membership = new Membership()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Description = DbUtils.GetString(reader, "Description"),
                        OrganizationId = DbUtils.GetInt(reader, "OrganizationId"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl")

                    };
                }


                reader.Close();
                return membership;
            }
        }
    }
}
