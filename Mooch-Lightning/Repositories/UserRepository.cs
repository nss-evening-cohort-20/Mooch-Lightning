using Mooch_Lightning.Repositories;
using Mooch_Lightning.Utils;
using Mooch_Lightning.Model;
using System.Security.Cryptography;

namespace Mooch_Lightning.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }

    public User AddUser(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [user] 
                                    (
                                      [FirebaseUid]
                                      ,[Username]
                                      ,[FirstName]
                                      ,[LastName]
                                      ,[Email]
                                      ,[SubscriptionLevelId]
                                      ,[ImageUrl]
                                      )
                                        OUTPUT INSERTED.id
                                        VALUES (
                                      @FirebaseUid
                                      ,@Username
                                      ,@FirstName
                                      ,@LastName
                                      ,@Email
                                      ,@SubscriptionLevelId
                                      ,@ImageUrl
                                        );";
                DbUtils.AddParameter(cmd, "@FirebaseUid", user.FirebaseUid);
                DbUtils.AddParameter(cmd, "@Username", user.Username);
                DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                DbUtils.AddParameter(cmd, "@Email", user.Email);
                DbUtils.AddParameter(cmd, "@SubscriptionLevelId", user.SubscriptionLevelId);
                DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);

                user.Id = (int)cmd.ExecuteScalar();
                return user;
            }
        }
    }

    public void DeleteUser(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"Delete from [dbo].[User] where id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }

    public User GetById(int id) 
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    SELECT [Id]
                          ,[FirebaseUid]
                          ,[Username]
                          ,[FirstName]
                          ,[LastName]
                          ,[Email]
                          ,[SubscriptionLevelId]
                          ,[ImageUrl]
                      FROM [Mooch].[dbo].[User]
                    WHERE Id = @id;";
                cmd.Parameters.AddWithValue("@id", id);
                var reader = cmd.ExecuteReader();
                User user = null;

                if (reader.Read())
                {
                    user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseUid = DbUtils.GetString(reader, "FirebaseUid"),
                        Username = DbUtils.GetString(reader, "Username"),
                        FirstName = DbUtils.GetString(reader, "FirstName"),
                        LastName = DbUtils.GetString(reader, "LastName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        SubscriptionLevelId = DbUtils.GetInt(reader, "SubscriptionLevelId"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                    };

                }
                reader.Close();
                return user;
            }
        }
    }

    public UserMembershipList GetUserMemberships(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using(var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                    SELECT UM.Id AS userMembershipId, O.Name AS ORG, M.Description
                                    FROM Membership M
                                    JOIN Organization O
                                    ON O.Id = M.OrganizationId
                                    JOIN UserMembership UM
                                    ON UM.MembershipId = M.Id
                                    WHERE UM.UserId = @id";
                cmd.Parameters.AddWithValue("@id",userId);
                UserMembershipList uml = new UserMembershipList()
                {
                    Memberships = new List<MembershipAndOrg>()
                };
               
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    MembershipAndOrg membership = new MembershipAndOrg()
                    {
                        Id = DbUtils.GetInt(reader, "userMembershipId"),
                        Organization = DbUtils.GetString(reader, "ORG"),
                        Description = DbUtils.GetString(reader, "Description"),
                    };

                    uml.Memberships.Add(membership);

                };
                reader.Close();
                return uml;
            }
           
        }
    }

    public UserMembershipsAndMoochRequests GetUserMembershipsAndRequestsById(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT M.Description, M.ImageUrl, 
                                    MR.Id,MR.DateCreated,MR.MoochPostId,MR.StartDate,MR.EndDate,
                                    MR.IsApproved

                                    FROM [User] U

                                    JOIN UserMembership UM
                                    ON UM.UserId = U.Id

                                    JOIN Membership M
                                    ON M.Id = UM.MembershipId

                                    JOIN MoochRequest MR
                                    ON MR.UserId = U.Id

                                    WHERE U.Id = @id; ";
                cmd.Parameters.AddWithValue("@id", userId);
                var reader = cmd.ExecuteReader();
                UserMembershipsAndMoochRequests umamr = null;
                if (reader.Read())
                {
                    umamr = new UserMembershipsAndMoochRequests()
                    {
                        MembershipDescription = DbUtils.GetString(reader, "Description"),
                        MembershipImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        MoochRequestId = DbUtils.GetInt(reader, "Id"),
                        MoochRequestDateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        MoochRequestMoochPostId = DbUtils.GetInt(reader, "MoochPostId"),
                        MoochRequestStartDate = DbUtils.GetDateTime(reader, "StartDate"),
                        MoochRequestEndDate = DbUtils.GetDateTime(reader, "EndDate"),
                        MoochRequestIsApproved = DbUtils.GetNullableBool(reader, "IsApproved")
                    };
                }
                reader.Close();
                return umamr;
                                
                }
            }
        }
    

    public void UpdateUser(User user)
    {
        using(var conn = Connection)
            {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                    UPDATE [dbo].[User]
                                       SET [FirebaseUid] = @FirebaseUid
                                          ,[Username] = @Username
                                          ,[FirstName] = @FirstName
                                          ,[LastName] = @LastName
                                          ,[Email] = @Email
                                          ,[SubscriptionLevelId] = @SubscriptionLevelId
                                          ,[ImageUrl] = @ImageUrl
                                     WHERE Id = @Id;
                                    ";

                DbUtils.AddParameter(cmd, "@FirebaseUid", user.FirebaseUid);
                DbUtils.AddParameter(cmd, "@Username", user.Username);
                DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                DbUtils.AddParameter(cmd, "@Email", user.Email);
                DbUtils.AddParameter(cmd, "@SubscriptionLevelId", user.SubscriptionLevelId);
                DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);
                DbUtils.AddParameter(cmd, "@Id", user.Id);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public User GetByFirebaseUId(string FbId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    SELECT [Id]
                          ,[FirebaseUid]
                          ,[Username]
                          ,[FirstName]
                          ,[LastName]
                          ,[Email]
                          ,[SubscriptionLevelId]
                          ,[ImageUrl]
                      FROM [Mooch].[dbo].[User]
                    WHERE FirebaseUid = @id;";
                cmd.Parameters.AddWithValue("@id", FbId);
                var reader = cmd.ExecuteReader();
                User user = null;

                if (reader.Read())
                {
                    user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseUid = DbUtils.GetString(reader, "FirebaseUid"),
                        Username = DbUtils.GetString(reader, "Username"),
                        FirstName = DbUtils.GetString(reader, "FirstName"),
                        LastName = DbUtils.GetString(reader, "LastName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        SubscriptionLevelId = DbUtils.GetInt(reader, "SubscriptionLevelId"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                    };

                }
                reader.Close();
                return user;
            }
        }
    }
}
