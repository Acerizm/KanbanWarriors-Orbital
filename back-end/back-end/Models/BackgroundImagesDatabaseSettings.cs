namespace back_end.Models
{
    public class BackgroundImagesDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public List<string> CollectionNames { get; set; } = null!;
    }
}
