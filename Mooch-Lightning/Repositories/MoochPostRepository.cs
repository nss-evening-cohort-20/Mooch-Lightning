﻿using Gifter.Repositories;
using Gifter.Utils;
using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow;
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
                                    O.Name AS OrgName,
                                    M.Description AS mDescription,
                                    M.ImageUrl AS MembershipImg,
                                    OT.Description AS Type,
                                    U.Username,
                                    U.ImageUrl AS UserImg,
                                    MP.IsMooched,
                                    MP.AvailabiltyStartDate, 
                                    MP.AvailabiltyEndDate

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
                                    OR
                                    UPPER(M.Description) LIKE '%' + @SEARCHVALUE + '%'
                                    AND
                                    MP.IsMooched = 0
                                    OR
                                    UPPER(OT.Description) LIKE '%' + @SEARCHVALUE + '%'
                                    AND
                                    MP.IsMooched = 0
                                    OR
                                    UPPER(U.Username) LIKE '%' + @SEARCHVALUE + '%'
                                    AND
                                    MP.IsMooched = 0

                                    ORDER BY MP.AvailabiltyStartDate, O.Name ASC";

                    cmd.Parameters.AddWithValue("@SEARCH", search);

                    List<MoochPostSearchResult> searchResults = new List<MoochPostSearchResult>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MoochPostSearchResult searchResult = new MoochPostSearchResult()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            OrganizationName = DbUtils.GetString(reader,"OrgName"),
                            MembershipDescription = DbUtils.GetString(reader, "mDescription"),
                            MembershipImageUrl = DbUtils.GetString(reader, "MembershipImg"),
                            Type = DbUtils.GetString(reader, "Type"),
                            UserName = DbUtils.GetString(reader, "Username"),
                            UserImageUrl = DbUtils.GetString(reader, "UserImg"),
                            IsMooched = DbUtils.GetNullableBool(reader, "IsMooched"),
                            AvailabilityStartDate = DbUtils.GetNullableDateTime(reader, "AvailabiltyStartDate"),
                            AvailabilityEndDate = DbUtils.GetNullableDateTime(reader, "AvailabiltyEndDate")
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