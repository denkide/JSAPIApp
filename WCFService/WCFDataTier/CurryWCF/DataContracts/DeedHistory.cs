using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class DeedHistory
    {
        [DataMember]
        public string Maplot { get; set; }

        [DataMember]
        public string PropId { get; set; }

        [DataMember]
        public string Deeddate { get; set; }

        [DataMember]
        public string SellerName { get; set; }

        [DataMember]
        public string BuyerName { get; set; }

        [DataMember]
        public string Deedtype { get; set; }

        [DataMember]
        public string SalePrice { get; set; }

        [DataMember]
        public string SaleYn { get; set; }

        [DataMember]
        public string SalesDate { get; set; }

        [DataMember]
        public string Bookid { get; set; }

        [DataMember]
        public string InstNum { get; set; }

        [DataMember]
        public string Instrumentnum { get; set; }

        [DataMember]
        public string PropIds { get; set; }

        [DataMember]
        public string Comment { get; set; }


    }
}