using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class TaxDue
    {
        [DataMember]
        public string Property { get; set; }

        [DataMember]
        public string Date { get; set; }

        [DataMember]
        public string AmtDue { get; set; }

        [DataMember]
        public string Stat { get; set; }

        [DataMember]
        public string AcctStatus { get; set; }

        [DataMember]
        public string OtcName { get; set; }

        [DataMember]
        public string OtcAddr1 { get; set; }

        [DataMember]
        public string OtcAddr2 { get; set; }

        [DataMember]
        public string OtcAddr3 { get; set; }

        [DataMember]
        public string CityStateZip { get; set; }

        [DataMember]
        public string Zip { get; set; }

        [DataMember]
        public string EffectiveDate { get; set; }
    }
}