using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Web;
using System.Xml.Serialization;

namespace CurryWCF.DataContracts
{
    [DataContract]
    [Serializable]
    public class OwnerParcel
    {
        [DataMember]
        public string MapNumber { get; set; }

        [DataMember]
        public int Taxlot { get; set; }

        [DataMember]
        public string OwnerFirstName { get; set; }

        [DataMember]
        public string OwnerLastName { get; set; }

        [DataMember]
        public string Address { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember]
        public string BillingAddress { get; set; }

        [DataMember]
        public string BillingCity { get; set; }

        [DataMember]
        public string BillingState { get; set; }

    }

    [CollectionDataContract(Name = "OwnerParcelList")]
    [KnownType(typeof(List<OwnerParcel>))]
    public class OwnerParcelList : List<OwnerParcel>
    {

    }
}