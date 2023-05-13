using Mooch_Lightning.Repositories;
using Mooch_Lightning.Utils;
using Mooch_Lightning.Model;
using System.Security.Cryptography;
using NuGet.Protocol.Plugins;

namespace Mooch_Lightning.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }

    public UserDetails AddUser(UserDetails userDetails)
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
                DbUtils.AddParameter(cmd, "@FirebaseUid", userDetails.FirebaseUid);
                DbUtils.AddParameter(cmd, "@Username", userDetails.Username);
                DbUtils.AddParameter(cmd, "@FirstName", userDetails.FirstName);
                DbUtils.AddParameter(cmd, "@LastName", userDetails.LastName);
                DbUtils.AddParameter(cmd, "@Email", userDetails.Email);
                DbUtils.AddParameter(cmd, "@SubscriptionLevelId", userDetails.SubscriptionLevelId);
                DbUtils.AddParameter(cmd, "@ImageUrl", userDetails.ImageUrl);

                userDetails.Id = (int)cmd.ExecuteScalar();
                return userDetails;
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
                user.UserMembershipsDetails = GetUserMembershipDetailsList(id);
                user.UserMoochPostDetails = GetUserMoochPostDetailsList(id);
                user.UserMoochRequestDetails = GetUserMoochRequestDetailsList(id);
                return user;
            }
        }
    }

    public List<MembershipAndOrg> GetUserMemberships(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                    SELECT UM.Id AS userMembershipId, O.Name AS ORG, M.Description
                                    FROM Membership M
                                    JOIN Organization O
                                    ON O.Id = M.OrganizationId
                                    JOIN UserMembership UM
                                    ON UM.MembershipId = M.Id
                                    WHERE UM.UserId = @id";
                cmd.Parameters.AddWithValue("@id", userId);
                List<MembershipAndOrg> membershipOrg = new List<MembershipAndOrg>();


                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    MembershipAndOrg membership = new MembershipAndOrg()
                    {
                        Id = DbUtils.GetInt(reader, "userMembershipId"),
                        Organization = DbUtils.GetString(reader, "ORG"),
                        Description = DbUtils.GetString(reader, "Description"),
                    };

                    membershipOrg.Add(membership);

                };
                reader.Close();
                return membershipOrg;
            }

        }
    }

    public List<UserMembershipsAndMoochRequests> GetUserMembershipsAndRequestsById(int userId)
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
                List<UserMembershipsAndMoochRequests> membershipAndMooch = new List<UserMembershipsAndMoochRequests>();

                var reader = cmd.ExecuteReader();
              
                while (reader.Read())
                {
                   UserMembershipsAndMoochRequests currentMembership = new UserMembershipsAndMoochRequests()
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
                    membershipAndMooch.Add(currentMembership);
                }
                reader.Close();
                return membershipAndMooch;

            }
        }
    }


    public void UpdateUser(UserDetails userDetails)
    {
        using (var conn = Connection)
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

                DbUtils.AddParameter(cmd, "@FirebaseUid", userDetails.FirebaseUid);
                DbUtils.AddParameter(cmd, "@Username", userDetails.Username);
                DbUtils.AddParameter(cmd, "@FirstName", userDetails.FirstName);
                DbUtils.AddParameter(cmd, "@LastName", userDetails.LastName);
                DbUtils.AddParameter(cmd, "@Email", userDetails.Email);
                DbUtils.AddParameter(cmd, "@SubscriptionLevelId", userDetails.SubscriptionLevelId);
                DbUtils.AddParameter(cmd, "@ImageUrl", userDetails.ImageUrl);
                DbUtils.AddParameter(cmd, "@Id", userDetails.Id);

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

    private List<UserMembershipDetails> GetUserMembershipDetailsList(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                    select um.UserId as UserId
                                    ,m.id as MembershipId 
                                    ,m.Description as MembershipDescription
                                    ,m.ImageUrl as MembershipImageUrl
                                    ,o.Id as OrganizationId
                                    ,o.Name as OrganizationName
                                    ,o.ImageUrl as OrignizationImageUrl
                                    ,ot.Description as OrganizationType

                                    from [dbo].[UserMembership] um
                                    inner join [dbo].[User] u on u.id = um.UserId
                                    inner join [dbo].[Membership] m on m.id = um.MembershipId
                                    inner join [dbo].[Organization] o on o.id = m.OrganizationId
                                    inner join [dbo].[OrganizationType] ot on ot.id = o.OrganizationTypeId

                                    where um.UserId = @userId
                                    order by um.UserId ,m.Description ,o.Name ,ot.Description
                                    ";

                cmd.Parameters.AddWithValue("@userId", userId);
                var reader = cmd.ExecuteReader();
                var userMembershipDetailsList = new List<UserMembershipDetails>();

                while (reader.Read())
                {
                    userMembershipDetailsList.Add(new UserMembershipDetails()
                    {
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        MembershipId = DbUtils.GetInt(reader, "MembershipId"),
                        MembershipDescription = DbUtils.GetString(reader, "MembershipDescription"),
                        MembershipImageUrl = DbUtils.GetString(reader, "MembershipImageUrl"),
                        OrganizationId = DbUtils.GetInt(reader, "OrganizationId"),
                        OrganizationName = DbUtils.GetString(reader, "OrganizationName"),
                        OrignizationImageUrl = DbUtils.GetString(reader, "OrignizationImageUrl"),
                        OrganizationType = DbUtils.GetString(reader, "OrganizationType"),
                    });
                }
                reader.Close();

                return userMembershipDetailsList;
            }
        }
    }

    private List<UserMoochPostDetails> GetUserMoochPostDetailsList(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                     select
                                     um.UserId as UserId
									,u.Username
									,m.[Description]
                                    ,mp.Id as MoochPostId
                                    ,mp.IsMooched as IsMooched
                                    ,mp.AvailabilityStartDate as AvailabilityStartDate
                                    ,mp.AvailabilityEndDate as AvailabilityEndDate
                                    ,um.MembershipId as MembershipId
                                    ,o.[Name]
                                    from [dbo].[MoochPost] mp
                                    inner join [dbo].[UserMembership] um on um.id = mp.UserMembershipId
                                    inner join [dbo].[User] u on u.id = um.UserId
									inner join Membership m on m.id = um.MembershipId
                                    inner join Organization o on o.id = m.OrganizationId
                                    where u.id = @userId
                                    ";

                cmd.Parameters.AddWithValue("@userId", userId);
                var reader = cmd.ExecuteReader();
                var userMoochPostDetailsList = new List<UserMoochPostDetails>();

                while (reader.Read())
                {
                    userMoochPostDetailsList.Add(new UserMoochPostDetails()
                    {
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        Username = DbUtils.GetString(reader, "Username"),
                        MembershipId = DbUtils.GetInt(reader, "MembershipId"),
                        MembershipDescription = DbUtils.GetString(reader, "Description"),
                        OrgName = DbUtils.GetString(reader,"Name"),
                        MoochPostId = DbUtils.GetInt(reader, "MoochPostId"),
                        IsMooched = DbUtils.GetNullableBool(reader, "IsMooched"),
                        AvailabilityStartDate = DbUtils.GetDateTime(reader, "AvailabilityStartDate"),
                        AvailabilityEndDate = DbUtils.GetDateTime(reader, "AvailabilityEndDate"),
                    });
                }
                reader.Close();

                return userMoochPostDetailsList;
            }
        }
    }

    private List<UserMoochRequestDetails> GetUserMoochRequestDetailsList(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                                    select mr.UserId as UserId
                                    ,mr.Id as MoochRequestId
                                    ,mr.MoochPostId as MoochPostId
                                    ,mr.StartDate as StartDate
                                    ,mr.EndDate as EndDate
                                    ,mr.IsApproved as IsApproved
                                    ,mr.DateCreated as DateCreated
                                    from [dbo].[MoochRequest] mr
                                    inner join [dbo].[User] u on u.id = mr.UserId
                                    where u.id = @userId
                                    ";

                cmd.Parameters.AddWithValue("@userId", userId);
                var reader = cmd.ExecuteReader();
                var userMoochRequestDetailsList = new List<UserMoochRequestDetails>();

                while (reader.Read())
                {
                    userMoochRequestDetailsList.Add(new UserMoochRequestDetails()
                    {
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        MoochRequestId = DbUtils.GetInt(reader, "MoochRequestId"),
                        MoochPostId = DbUtils.GetInt(reader, "MoochPostId"),
                        StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                        EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                        IsApproved = DbUtils.GetNullableBool(reader, "IsApproved"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),

                    });
                }
                reader.Close();

                return userMoochRequestDetailsList;
            }
        }
    }

}


