using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class Sales
    {
        [DataMember]
        public string PropertyId { get; set; }

        [DataMember]
        public string Maptaxlot { get; set; }

        [DataMember]
        public string SaleId { get; set; }

        [DataMember]
        public string DeedType { get; set; }

        [DataMember]
        public string Year { get; set; }

        [DataMember]
        public string Saleprice { get; set; }

        [DataMember]
        public string InstNo { get; set; }

        [DataMember]
        public string Saletype { get; set; }

        [DataMember]
        public string SaleDate { get; set; }


    }
}