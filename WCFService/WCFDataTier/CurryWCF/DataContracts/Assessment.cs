using System;
using System.Runtime.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class Assessment
    {
        [DataMember]
        public string PropertyId { get; set; }

        [DataMember]
        public string Maplot { get; set; }

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
        public string AddNames { get; set; }

        [DataMember]
        public string AddOwnerType { get; set; }

        [DataMember]
        public string Pclass { get; set; }

        [DataMember]
        public string CoPropCls { get; set; }

        [DataMember]
        public string Situsaddr { get; set; }

        [DataMember]
        public string Situscsz { get; set; }

        [DataMember]
        public string TotTax { get; set; }

        [DataMember]
        public string RollLandMkt { get; set; }

        [DataMember]
        public string RollTotalImp { get; set; }

        [DataMember]
        public string RollRmvValue { get; set; }

        [DataMember]
        public string RollUseValue { get; set; }

        [DataMember]
        public string RollAssdVal { get; set; }

        [DataMember]
        public string Yrblt { get; set; }

        [DataMember]
        public string LivingArea { get; set; }

        [DataMember]
        public string Acreage { get; set; }

        [DataMember]
        public string NbhCode { get; set; }

        [DataMember]
        public string PropCode { get; set; }

        [DataMember]
        public string CurrentLevy { get; set; }

        [DataMember]
        public string TaxDue { get; set; }

        [DataMember]
        public string OtcBillIds { get; set; }

        [DataMember]
        public string Carate { get; set; }

    }
}