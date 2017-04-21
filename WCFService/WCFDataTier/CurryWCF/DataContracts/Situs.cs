using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class Situs
    {
        [DataMember]
        public string MapTaxLot { get; set; }

        [DataMember]
        public string Property { get; set; }

        [DataMember]
        public string Stat { get; set; }

        [DataMember]
        public string SitusNum { get; set; }

        [DataMember]
        public string SitusStreet { get; set; }

        [DataMember]
        public string SitSufx1 { get; set; }

        [DataMember]
        public string SitusPrefix { get; set; }

        [DataMember]
        public string SitSufx2 { get; set; }

        [DataMember]
        public string SitusCity { get; set; }

        [DataMember]
        public string SitusState { get; set; }

        [DataMember]
        public string SitusZip { get; set; }

        [DataMember]
        public string CodeArea { get; set; }

        [DataMember]
        public string Pclass { get; set; }

        [DataMember]
        public string OwnerName { get; set; }

        [DataMember]
        public string NameAddress { get; set; }

        [DataMember]
        public string NameAddress15 { get; set; }

        [DataMember]
        public string NameAddress16 { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string St { get; set; }

        [DataMember]
        public string Zip { get; set; }


    }
}