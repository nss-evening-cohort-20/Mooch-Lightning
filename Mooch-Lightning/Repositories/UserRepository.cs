using Gifter.Repositories;
using Gifter.Utils;
using Mooch_Lightning.Model;

namespace Mooch_Lightning.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }
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
                          ,[Password]
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
                        Password = DbUtils.GetString(reader, "Password"),
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
