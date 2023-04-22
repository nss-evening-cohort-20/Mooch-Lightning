using Gifter.Repositories;
using Gifter.Utils;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories
{
    public class MoochRequestRepository : BaseRepository, IMoochRequestRepository
    {
        public MoochRequestRepository(IConfiguration configuration) : base(configuration) { }

        public MoochRequest GetMoochRequestById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT [Id]
                                      ,[UserId]
                                      ,[MoochPostId]
                                      ,[StartDate]
                                      ,[EndDate]
                                      ,[IsApproved]
                                      ,[DateCreated]
                                      FROM [MoochRequest]
                                      WHERE [Id] = @id;
                                      ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    MoochRequest mr = null;
                    if (reader.Read())
                    {
                        mr = new MoochRequest()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            MoochPostId = DbUtils.GetInt(reader, "MoochPostId"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                            IsApproved = DbUtils.GetNullableBool(reader, "IsApproved"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")

                        };
                    }
                    reader.Close();
                    return mr;

                }
            }
        }
    }
}
