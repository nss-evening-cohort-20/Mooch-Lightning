using Gifter.Repositories;
using Gifter.Utils;
using Mooch_Lightning.Model;


namespace Mooch_Lightning.Repositories
{
    public class MoochPostRepository : BaseRepository, IMoochPostRepository
    {

        public MoochPostRepository(IConfiguration configuration) : base(configuration) { }

        public MoochPost GetById(int id) { return new MoochPost(); }

        //Add New MoochPost

        public MoochPost Add(MoochPost post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Mooch].[dbo].[MoochPost] (UserMembershipId, IsMooched, AvailabiltyStartDate,AvailabiltyEndDate)
                                        OUTPUT inserted.Id
                                        VALUES (@UserMembershipId,@IsMooched,@AvailabiltyStartDate,@AvailabiltyEndDate);";
                    cmd.Parameters.AddWithValue("@UserMemberShipId", post.UserMembershipId);
                    cmd.Parameters.AddWithValue("@IsMooched", post.IsMooched);
                    cmd.Parameters.AddWithValue("@AvailabiltyStartDate", post.AvailabilityStartDate);
                    cmd.Parameters.AddWithValue("@AvailabiltyEndDate", post.AvailabilityEndDate);
                    post.Id = (int)cmd.ExecuteScalar();
                    return post;
                }
            }
        }

        //Update MoochPost

        public void Update(MoochPost post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [Mooch].[dbo].[MoochPost]
                                        SET UserMembershipId = @UserMembershipId, IsMooched = @IsMooched, AvailabiltyStartDate = @AvailabiltyStartDate, AvailabiltyEndDate = @AvailabiltyEndDate
                                        WHERE Id = @Id;";
                    cmd.Parameters.AddWithValue("@Id", post.Id);
                    cmd.Parameters.AddWithValue("@UserMemberShipId", post.UserMembershipId);
                    cmd.Parameters.AddWithValue("@IsMooched", post.IsMooched);
                    cmd.Parameters.AddWithValue("@AvailabiltyStartDate", post.AvailabilityStartDate);
                    cmd.Parameters.AddWithValue("@AvailabiltyEndDate", post.AvailabilityEndDate);
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
