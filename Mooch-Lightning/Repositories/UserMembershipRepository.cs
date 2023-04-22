using Gifter.Repositories;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories;

public class UserMembershipRepository : BaseRepository, IUserMembershipRepository
{
    public UserMembershipRepository(IConfiguration configuration) : base(configuration) { }
    public UserMembership GetById(int id) { return new UserMembership(); }

    //Add New UserMembership

    public UserMembership Add(UserMembership userMembership)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @" INSERT INTO [UserMembership] (UserId,MembershipId)
                                      OUTPUT INSERTED.Id
                                      VALUES (@UserId,@MembershipId);";
                cmd.Parameters.AddWithValue("@UserId", userMembership.UserId);
                cmd.Parameters.AddWithValue("@MembershipId", userMembership.MembershipId);
                userMembership.Id = (int)cmd.ExecuteScalar();
                return userMembership;
            }
        }
    }

    //Update UserMembership

    public UserMembership Update(UserMembership userMembership)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @" UPDATE [UserMembership]
                                     SET UserId = @UserId, 
                                         MembershipId = @MembershipId
                                     WHERE id = @id;";
                cmd.Parameters.AddWithValue("@id", userMembership.Id);
                cmd.Parameters.AddWithValue("@UserId", userMembership.UserId);
                cmd.Parameters.AddWithValue("@MemberShipId", userMembership.MembershipId);
                userMembership.Id = (int)cmd.ExecuteScalar();
                return userMembership;
            }
        }
    }

    //Delete UserMembership

    public void Delete(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"DELETE FROM [UserMembership] WHERE Id = @id";
                cmd.Parameters.AddWithValue("id", id);

            }
        }
    }
}
