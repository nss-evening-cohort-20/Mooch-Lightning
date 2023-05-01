using Mooch_Lightning.Repositories;
using Mooch_Lightning.Utils;
using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow;
using Mooch_Lightning.Model;


namespace Mooch_Lightning.Repositories
{
    public class MoochPostRepository : BaseRepository, IMoochPostRepository
    {

        public MoochPostRepository(IConfiguration configuration) : base(configuration) { }

        public MoochPost GetById(int id) { return new MoochPost(); }

        //Get All MoochPosts

        public List<DetailedMoochPost> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        MP.Id,
                                        O.Name,
                                        M.Description,
                                        M.ImageUrl,
                                        MP.AvailabiltyStartDate,
                                        MP.AvailabiltyEndDate,
                                        OT.Description,
                                        U.Username,
                                        U.ImageUrl

                                        FROM MoochPost MP

                                        JOIN UserMembership UM
                                        ON UM.Id = MP.UserMembershipId

                                        JOIN Membership M
                                        ON M.Id = Um.MembershipId

                                        JOIN Organization O
                                        ON M.OrganizationId = O.Id

                                        JOIN OrganizationType OT
                                        ON O.OrganizationTypeId = OT.Id

                                        JOIN [User] U
                                        ON UM.UserId = U.Id
                                        ;
                                        ";

                    var reader = cmd.ExecuteReader();

                    var moochPost = new List<DetailedMoochPost>();
                    while (reader.Read())
                    {
                        moochPost.Add(new DetailedMoochPost()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            OrganizationName = DbUtils.GetString(reader, "Name"),
                            MembershipDescription = DbUtils.GetString(reader, "Description"),
                            MembershipImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            AvailabilityStartDate = DbUtils.GetDateTime(reader, "AvailabiltyStartDate"),
                            AvailabilityEndDate = DbUtils.GetDateTime(reader, "AvailabiltyEndDate"),
                            OrganizationTypeDescription = DbUtils.GetString(reader, "Description"),
                            Username = DbUtils.GetString(reader, "Username"),
                            UserImageUrl = DbUtils.GetString(reader, "ImageUrl")
                        });
                    }

                    reader.Close();
                    return moochPost;
                }
            }
        }

        //Add New MoochPost

        public MoochPost Add(MoochPost post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Mooch].[dbo].[MoochPost] (UserMembershipId, IsMooched, AvailabilityStartDate,AvailabilityEndDate)
                                        OUTPUT inserted.Id
                                        VALUES (@UserMembershipId,@IsMooched,@AvailabilityStartDate,@AvailabilityEndDate);";
                    cmd.Parameters.AddWithValue("@UserMemberShipId", post.UserMembershipId);
                    cmd.Parameters.AddWithValue("@IsMooched", post.IsMooched);
                    cmd.Parameters.AddWithValue("@AvailabilityStartDate", post.AvailabilityStartDate);
                    cmd.Parameters.AddWithValue("@AvailabilityEndDate", post.AvailabilityEndDate);
                    post.Id = (int)cmd.ExecuteScalar();
                    return post;
                }
            }
        }

        //Update MoochPost

        public void Update(MoochPost post, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [Mooch].[dbo].[MoochPost]
                                        SET UserMembershipId = @UserMembershipId, IsMooched = @IsMooched, AvailabilityStartDate = @AvailabilityStartDate, AvailabilityEndDate = @AvailabilityEndDate
                                        WHERE Id = @Id;";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@UserMemberShipId", post.UserMembershipId);
                    cmd.Parameters.AddWithValue("@IsMooched", post.IsMooched);
                    cmd.Parameters.AddWithValue("@AvailabilityStartDate", post.AvailabilityStartDate);
                    cmd.Parameters.AddWithValue("@AvailabilityEndDate", post.AvailabilityEndDate);
                    cmd.ExecuteScalar();
                }
            }
        }

      


        //Delete MoochPost
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE [Mooch].[dbo].[MoochPost] WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                   
                }

            }
        }
    }
}
