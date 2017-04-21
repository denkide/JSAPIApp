using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class Events
    {

        [DataMember]
        public string PropertyId { get; set; }

        [DataMember]
        public string Desc { get; set; }

        [DataMember]
        public string Date { get; set; }

        [DataMember]
        public string Code { get; set; }

        [DataMember]
        public string Comment { get; set; }


    }
}