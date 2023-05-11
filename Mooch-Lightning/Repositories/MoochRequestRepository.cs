using Mooch_Lightning.Repositories;
using Mooch_Lightning.Utils;
using Mooch_Lightning.Model;
using NuGet.Protocol.Plugins;
using Microsoft.Extensions.Hosting;

namespace Mooch_Lightning.Repositories;

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


    public List<MoochRequest> TopFiveApprovedMoochRequests()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                     SELECT TOP (5) mr.[Id]
                                            ,mr.[UserId]
                                            ,mr.[MoochPostId]
                                            ,mr.[StartDate]
                                            ,mr.[EndDate]
                                            ,mr.[IsApproved]
                                            ,mr.[DateCreated]
                                            ,[User].[UserName] 
                                            ,[User].ImageUrl
                                    FROM [Mooch].[dbo].[MoochRequest] mr
                                    JOIN [User] on mr.UserId = [User].Id
                                    WHERE mr.IsApproved = 1 
                                    ORDER BY mr.StartDate DESC;";


                var reader = cmd.ExecuteReader();

                var requests = new List<MoochRequest>();
                while (reader.Read())
                {
                    requests.Add(new MoochRequest()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        MoochPostId = DbUtils.GetInt(reader, "MoochPostId"),
                        User = new UserLastestMoochRequest()
                        {
                            Username = DbUtils.GetString(reader, "UserName"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                        },
                        StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                        EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                        IsApproved = DbUtils.GetNullableBool(reader, "IsApproved"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                    });
                }

                reader.Close();

                return requests;
            }
        }
    }

    public List<MoochRequest> TopFivePendingMoochRequests()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                     SELECT TOP (5) mr.[Id]
                                            ,mr.[UserId]
                                            ,mr.[MoochPostId]
                                            ,mr.[StartDate]
                                            ,mr.[EndDate]
                                            ,mr.[IsApproved]
                                            ,mr.[DateCreated]
                                            ,[User].[UserName] 
                                            ,[User].ImageUrl
                                    FROM [Mooch].[dbo].[MoochRequest] mr
                                    JOIN [User] on mr.UserId = [User].Id
                                    WHERE mr.IsApproved = NULL
                                    ORDER BY mr.StartDate DESC;";


                var reader = cmd.ExecuteReader();

                var requests = new List<MoochRequest>();
                while (reader.Read())
                {
                    requests.Add(new MoochRequest()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        MoochPostId = DbUtils.GetInt(reader, "MoochPostId"),
                        User = new UserLastestMoochRequest()
                        {
                            Username = DbUtils.GetString(reader, "UserName"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                        },
                        StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                        EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                        IsApproved = DbUtils.GetNullableBool(reader, "IsApproved"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                    });
                }

                reader.Close();

                return requests;
            }
        }
    }

    public void Add(MoochRequest request)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Mooch].[dbo].[MoochRequest] (MoochPostId, UserId, StartDate, EndDate, DateCreated)
                                        OUTPUT inserted.Id
                                        VALUES (@MoochPostId,@UserId, @StartDate, @EndDate, @DateCreated);";
                cmd.Parameters.AddWithValue("@MoochPostId", request.MoochPostId);
                cmd.Parameters.AddWithValue("@UserId", request.UserId);
                cmd.Parameters.AddWithValue("@StartDate", request.StartDate);
                cmd.Parameters.AddWithValue("@EndDate", request.EndDate);
                cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                cmd.ExecuteNonQuery();
            }
        }
    }
}