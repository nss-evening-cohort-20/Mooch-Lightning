using Gifter.Repositories;
using Gifter.Utils;
using Mooch_Lightning.Model;
using System.Security.Cryptography;

namespace Mooch_Lightning.Repositories;

public class UserMembershipRepository : BaseRepository, IUserMembershipRepository
{
    public UserMembershipRepository(IConfiguration configuration) : base(configuration) { }
    public UserMembership GetById(int id) 
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                    SELECT Id, UserId, MembershipId 
                                    FROM UserMembership 
                                    WHERE ID = @id;";

                cmd.Parameters.AddWithValue("@id", id);
                var reader = cmd.ExecuteReader();
                UserMembership um = null;
                if(reader.Read())
                {
                    um = new UserMembership() 
                    { 
                        Id = DbUtils.GetInt(reader, "Id"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        MembershipId = DbUtils.GetInt(reader, "MembershipId")
                    };

                }
                reader.Close();
                return um;
            }
        }
        
        return new UserMembership(); }

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

    public void Update(UserMembership userMembership)
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
                cmd.ExecuteNonQuery();
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
                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }
            
        }
    }
}
