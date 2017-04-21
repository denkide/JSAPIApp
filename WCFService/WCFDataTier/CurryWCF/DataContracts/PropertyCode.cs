using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class PropertyCode
    {
        [DataMember]
        public string PropertyId { get; set; }

        [DataMember]
        public string Maplot { get; set; }

        [DataMember]
        public string CodeArea { get; set; }

        [DataMember]
        public string MaintenanceArea { get; set; }

    }
}