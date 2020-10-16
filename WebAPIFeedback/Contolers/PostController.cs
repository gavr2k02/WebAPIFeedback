using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.SqlClient;
using WebAPIFeedback.Models;


namespace HelloAngularApp.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : Controller
    {
        [HttpPost]
        public PostFormDB Post(Post post)
        {
            var connectDB = new SqlConnection("Data Source=LAPTOP-O7MD9VQK;Initial Catalog=DBPOST;Integrated Security=True");
            var commandCheckUser = new SqlCommand($"SELECT ID_USER FROM USERS" +
                $" WHERE EMAIL_USER = '{post.Email}' AND TEL_USER = '{post.Tel}'", connectDB);
            connectDB.Open();
            SqlDataReader readerSql = commandCheckUser.ExecuteReader();

            if (readerSql.Read())
            {
                readerSql.Close();
                var commandInsertPost = new SqlCommand($"INSERT INTO POSTS (POST_CONTENT, ID_USER, ID_TOPIC)" +
                    $"VALUES ('{post.Msg}'," +
                    $"(SELECT ID_USER FROM USERS" +
                    $" WHERE EMAIL_USER = '{post.Email}' AND TEL_USER = '{post.Tel}')," +
                    $"(SELECT ID_TOPIC FROM TOPICS" +
                    $" WHERE TOPIC_NAME = '{post.Topic}'))", connectDB);
                commandInsertPost.ExecuteNonQuery();
            }
            else
            {
                readerSql.Close();
                var commandInsertUser = new SqlCommand($"INSERT INTO USERS (NAME_USER, EMAIL_USER, TEL_USER)" +
                    $"VALUES ('{post.Name}', '{post.Email}', '{post.Tel}')", connectDB);
                commandInsertUser.ExecuteNonQuery();
                var commandInsertPost = new SqlCommand($"INSERT INTO POSTs (POST_CONTENT, ID_USER, ID_TOPIC)" +
                    $"VALUES ('{post.Msg}'," +
                    $"(SELECT ID_USER FROM USERS" +
                    $" WHERE EMAIL_USER = '{post.Email}' AND TEL_USER = '{post.Tel}')," +
                    $"(SELECT ID_TOPIC FROM TOPICS" +
                    $" WHERE TOPIC_NAME = '{post.Topic}'))", connectDB);
                commandInsertPost.ExecuteNonQuery();
            }

            var comandGetDataPost = new SqlCommand($"SELECT * FROM POSTS" +
                $" WHERE POST_CONTENT = '{post.Msg}'", connectDB);
            readerSql = comandGetDataPost.ExecuteReader();
            var postFromDB = new PostFormDB();
            readerSql.Read();
            postFromDB.IdPost = Convert.ToInt32(readerSql[0].ToString());
            postFromDB.PostContent = readerSql[1].ToString();
            postFromDB.IdUser = Convert.ToInt32(readerSql[2].ToString());
            postFromDB.IdTopic = Convert.ToInt32(readerSql[3].ToString());
            readerSql.Close();

            return postFromDB;
        }
    }
}