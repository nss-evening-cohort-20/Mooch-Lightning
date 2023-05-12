using Mooch_Lightning.Repositories;
using Mooch_Lightning.Utils;
using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow;
using Mooch_Lightning.Model;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace Mooch_Lightning.Repositories
{
    public class MoochPostRepository : BaseRepository, IMoochPostRepository
    {

        public MoochPostRepository(IConfiguration configuration) : base(configuration) { }

        public DetailedMoochPostWithSuggetions GetById(int id) {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"CREATE TABLE #tempMegaTable (
                                            MoochPostId int,
                                            OrganizationName nvarchar(255),
                                            OrganizationImageUrl nvarchar(255),
                                            MembershipDescription nvarchar(255),
                                            MembershipImageUrl nvarchar(255),
                                            AvailabilityStartDate datetime,
                                            AvailabilityEndDate datetime,
                                            IsMooched bit,
                                            TypeId int,
                                            [Type] nvarchar(255),
                                            Username nvarchar(255),
                                            UserId int,
                                            UserImageURL nvarchar(255)
                                        );

                                        INSERT INTO #tempMegaTable
                                            (MoochPostId, OrganizationName, OrganizationImageUrl, MembershipDescription, MembershipImageUrl,
                                            AvailabilityStartDate, AvailabilityEndDate, IsMooched, TypeId,
                                            [Type], Username, UserId, UserImageURL)


                                        SELECT 
                                            MP.Id AS MoochPostId,
                                            O.Name AS OrganizationName,
                                            O.ImageUrl AS OrganizationImageUrl,
                                            M.Description AS MembershipDescription,
                                            M.ImageUrl AS MembershipImageUrl,
                                            MP.AvailabilityStartDate,
                                            MP.AvailabilityEndDate,
                                            MP.IsMooched,
                                            OT.Id AS TypeId,
                                            OT.Description AS [Type],
                                            U.Username,
                                            U.Id AS UserId,
                                            U.ImageUrl AS UserImageURL
                                        FROM 
                                            MoochPost MP
                                            JOIN UserMembership UM ON UM.Id = MP.UserMembershipId
                                            JOIN Membership M ON M.Id = Um.MembershipId
                                            JOIN Organization O ON M.OrganizationId = O.Id
                                            JOIN OrganizationType OT ON O.OrganizationTypeId = OT.Id
                                            JOIN [User] U ON UM.UserId = U.Id;


                                        DECLARE @userId int
                                        SELECT @userId = UserId
                                        FROM #tempMegaTable 
                                        WHERE MoochPostId = @Id;

                                        DECLARE @OrganizationTypeId int
                                        SELECT @OrganizationTypeId = TypeId
                                        FROM #tempMegaTable 
                                        WHERE MoochPostId = @Id;

                                        SELECT 
                                            MoochPostId,
                                            OrganizationName,
                                            OrganizationImageUrl,
                                            MembershipDescription,
                                            MembershipImageUrl,
                                            AvailabilityStartDate,
                                            AvailabilityEndDate,
                                            Type,
                                            Username,
                                            UserImageURL,
                                            (SELECT TOP 3
                                                MoochPostId AS Id,
                                                OrganizationName,
                                                OrganizationImageUrl,
                                                MembershipDescription,
                                                MembershipImageUrl,
                                                AvailabilityStartDate,
                                                AvailabilityEndDate,
                                                Type,
                                                Username,
                                                UserImageURL
                                            FROM 
                                                #tempMegaTable 
                                            WHERE 
                                                TypeId = @OrganizationTypeId AND isMooched = 0
		                                        ORDER BY AvailabilityStartDate
                                            FOR JSON PATH
                                            ) AS OrganizationSuggestions,
	                                        (SELECT TOP 3
                                                MoochPostId AS Id,
                                                OrganizationName,
                                                OrganizationImageUrl,
                                                MembershipDescription,
                                                MembershipImageUrl,
                                                AvailabilityStartDate,
                                                AvailabilityEndDate,
                                                Type,
                                                Username,
                                                UserImageURL
                                            FROM 
                                                #tempMegaTable 
                                            WHERE 
                                                UserId = @userId AND isMooched = 0
	                                        ORDER BY AvailabilityStartDate
                                            FOR JSON PATH) AS UserSuggestions
                                        FROM 
                                            #tempMegaTable
                                        WHERE 
                                            MoochPostId = @Id;

	                                        DROP TABLE #tempMegaTable;
                                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();


                    DetailedMoochPostWithSuggetions moochPost = null;
                    while (reader.Read())
                    {
                        moochPost =new DetailedMoochPostWithSuggetions()
                        {
                            Id = DbUtils.GetInt(reader, "MoochPostId"),
                            OrganizationName = DbUtils.GetString(reader, "OrganizationName"),
                            OrganizationImageUrl = DbUtils.GetString(reader, "OrganizationImageUrl"),
                            MembershipDescription = DbUtils.GetString(reader, "MembershipDescription"),
                            MembershipImageUrl = DbUtils.GetString(reader, "MembershipImageUrl"),
                            AvailabilityStartDate = DbUtils.GetDateTime(reader, "AvailabilityStartDate"),
                            AvailabilityEndDate = DbUtils.GetDateTime(reader, "AvailabilityEndDate"),
                            Type = DbUtils.GetString(reader, "Type"),
                            UserName = DbUtils.GetString(reader, "Username"),
                            UserImageUrl = DbUtils.GetString(reader, "UserImageURL"),
                            organizationTypeSuggestions = JsonSerializer.Deserialize<List<MoochPostSearchResult>>(DbUtils.GetString(reader, "OrganizationSuggestions")),
                            userSuggestions = JsonSerializer.Deserialize<List<MoochPostSearchResult>>(DbUtils.GetString(reader, "UserSuggestions"))
                        };
                    }

                    reader.Close();
                    return moochPost;
                }
            }
        }

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
                                        MP.AvailabilityStartDate,
                                        MP.AvailabilityEndDate,
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
                            AvailabilityStartDate = DbUtils.GetDateTime(reader, "AvailabilityStartDate"),
                            AvailabilityEndDate = DbUtils.GetDateTime(reader, "AvailabilityEndDate"),
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
                    cmd.Parameters.AddWithValue("@IsMooched", false);
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

        // GET ALL MOOCHPOSTS BY SEARCH CRITERIA
        public List<MoochPostSearchResult> GetBySearch(string search)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    DECLARE @SEARCHVALUE NVARCHAR(255)
                                    SET @SEARCHVALUE = @SEARCH

                                    SELECT 

                                    MP.Id AS PostId,
                                    O.Id as OrgId,
                                    O.Name AS OrgName,
                                    O.ImageUrl AS OrgImg,
                                    M.Description AS mDescription,
                                    M.ImageUrl AS MembershipImg,
                                    OT.Id AS TypeId,
                                    OT.Description AS Type,
                                    U.Username,
                                    U.ImageUrl AS UserImg,
                                    MP.IsMooched,
                                    MP.AvailabilityStartDate, 
                                    MP.AvailabilityEndDate

                                    FROM MoochPost MP

                                    JOIN UserMembership UM
                                    ON UM.Id = MP.UserMembershipId

                                    JOIN Membership M
                                    ON M.Id = UM.MembershipId

                                    JOIN Organization O
                                    ON O.Id = M.OrganizationId

                                    JOIN OrganizationType OT
                                    ON OT.Id = O.OrganizationTypeId

                                    JOIN [USER] U
                                    ON U.Id = UM.UserId

                                    WHERE 
                                    UPPER(O.Name) LIKE '%' + @SEARCHVALUE + '%'
                                    AND
                                    MP.IsMooched = 0
									AND
									MP.AvailabilityEndDate > GETDATE()
                                    OR
                                    UPPER(M.Description) LIKE '%' + @SEARCHVALUE + '%'
                                    AND
                                    MP.IsMooched = 0
									AND
									MP.AvailabilityEndDate > GETDATE()
                                    OR
                                    UPPER(U.Username) LIKE '%' + @SEARCHVALUE + '%'
                                    AND
                                    MP.IsMooched = 0
									AND
									MP.AvailabilityEndDate > GETDATE()

                                    ORDER BY MP.AvailabilityStartDate, O.Name ASC";

                    cmd.Parameters.AddWithValue("@SEARCH", search);

                    List<MoochPostSearchResult> searchResults = new List<MoochPostSearchResult>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MoochPostSearchResult searchResult = new MoochPostSearchResult()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            
                            OrganizationName = DbUtils.GetString(reader,"OrgName"),
                            OrganizationId = DbUtils.GetInt(reader, "OrgId"),
                            OrganizationImageUrl = DbUtils.GetString(reader,"OrgImg"),
                            MembershipDescription = DbUtils.GetString(reader, "mDescription"),
                            MembershipImageUrl = DbUtils.GetString(reader, "MembershipImg"),
                            TypeId = DbUtils.GetInt(reader,"TypeId"),
                            Type = DbUtils.GetString(reader, "Type"),
                            UserName = DbUtils.GetString(reader, "Username"),
                            UserImageUrl = DbUtils.GetString(reader, "UserImg"),
                            IsMooched = DbUtils.GetNullableBool(reader, "IsMooched"),
                            AvailabilityStartDate = DbUtils.GetNullableDateTime(reader, "AvailabilityStartDate"),
                            AvailabilityEndDate = DbUtils.GetNullableDateTime(reader, "AvailabilityEndDate")
                        };
                        searchResults.Add(searchResult);
                    };
                    reader.Close();
                    return searchResults;
                }
            }
        }
    }
}
