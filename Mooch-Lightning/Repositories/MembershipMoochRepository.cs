using Gifter.Repositories;
using Gifter.Utils;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public class MembershipMoochRepository : BaseRepository, IMembershipMoochRepository
    {
        public MembershipMoochRepository(IConfiguration configuration) : base(configuration) { }

        public MembershipMooch GetMembershipMoochbyId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
SELECT [Id]
      ,[UserId]
      ,[UserMembershipId]
      ,[StartDate]
      ,[EndDate]
      ,[IsApproved]
      ,[DateCreated]
  FROM [MembershipMooch]
WHERE [Id] = @id;
";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    MembershipMooch mm = null;
                    if (reader.Read())
                    {
                        mm = new MembershipMooch()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            UserMembershipId = DbUtils.GetInt(reader, "UserMembershipId"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                            IsApproved = DbUtils.GetNullableBool(reader, "IsApproved"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")

                        };
                    }
                    reader.Close();
                    return mm;

                }
            }
        }
    }
}
