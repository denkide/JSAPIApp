using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class OwnerHistory
    {

        [DataMember]
        public string PropertyId { get; set; }

        [DataMember]
        public string Maplot { get; set; }

        [DataMember]
        public string PropertyIds { get; set; }

        [DataMember]
        public string SaleID { get; set; }

        [DataMember]
        public string Year { get; set; }

        [DataMember]
        public string DeedDate { get; set; }

        [DataMember]
        public string InstNo { get; set; }

        [DataMember]
        public string SellerName { get; set; }

        [DataMember]
        public string BuyerName { get; set; }

        [DataMember]
        public string AcctStatus { get; set; }

        [DataMember]
        public string DeedType { get; set; }

        [DataMember]
        public string Saleprice { get; set; }

        [DataMember]
        public string Infocomment { get; set; }

    }
}