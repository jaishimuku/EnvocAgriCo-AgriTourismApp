using System.Collections.Generic;

namespace SP20.P05.Tests.Helpers
{
    public class Schema
    {
        public string Type { get; set; }
    }

    public class Components
    {
        public Dictionary<string, Schema> Schemas { get; set; } = new Dictionary<string, Schema>();
    }

    public class OpenApiSpec
    {
        public Components Components { get; set; } = new Components();
    }
}
