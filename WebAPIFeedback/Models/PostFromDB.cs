namespace WebAPIFeedback.Models
{
    public class PostFormDB
    {
        public int IdPost { get; set; }
        public string PostContent { get; set; }
        public int IdUser { get; set; }
        public int IdTopic { get; set; }
    }
}