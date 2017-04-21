using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class Owner
    {
        [DataMember]
        public string PropertyId { get; set; }

        [DataMember]
        public string OwnerName { get; set; }

        [DataMember]
        public string Address1 { get; set; }

        [DataMember]
        public string Address2 { get; set; }

        [DataMember]
        public string Address3 { get; set; }

        [DataMember]
        public string CityStateZip { get; set; }

        [DataMember]
        public string Maplot { get; set; }

        [DataMember]
        public string AddNames { get; set; }

        [DataMember]
        public string AddOwnerType { get; set; }

        [DataMember]
        public string Acreage { get; set; }

    }
}