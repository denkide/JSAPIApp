using System;
using System.Collections.Generic;
using System.Data;
using System.ServiceModel;
using System.ServiceModel.Activation;
using CurryWCF.DataContracts;

namespace CurryWCF
{

    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple, InstanceContextMode = InstanceContextMode.PerCall)]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class CurryAssessment : ICurryServices
    {
        private string ReturnConnString()
        {
            CurryConnectionProps connProps = new CurryConnectionProps();
            connProps.Database = System.Web.Configuration.WebConfigurationManager.AppSettings["Database"];
            connProps.Instance = System.Web.Configuration.WebConfigurationManager.AppSettings["DBInstance"];
            connProps.UserName = System.Web.Configuration.WebConfigurationManager.AppSettings["DBUser"];
            connProps.Password = System.Web.Configuration.WebConfigurationManager.AppSettings["DBPass"];

            return connProps.ReturnConnectionString();
        }

        public string SayHello()
        {
            return "Hello from the WCF service";
        }

        public List<Assessment> ReturnOwnerByName(string ownerName) {
            
            List<Assessment> retVal = new List<Assessment>();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByOwner("ReturnAssessmentByOwner ", ownerName);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        Assessment assmt = new Assessment();

                        assmt.PropertyId = String.IsNullOrEmpty(dr["Property"].ToString())
                            ? string.Empty
                            : dr["Property"].ToString();

                        assmt.Maplot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty
                            : dr["MapTaxLot"].ToString();
                        
                        assmt.OwnerName = ownerName;

                        assmt.Address1 = String.IsNullOrEmpty(dr["Address1"].ToString())
                            ? string.Empty
                            : dr["Address1"].ToString();
                        assmt.Address2 = String.IsNullOrEmpty(dr["Address2"].ToString())
                            ? string.Empty
                            : dr["Address2"].ToString();
                        assmt.Address3 = String.IsNullOrEmpty(dr["Address3"].ToString())
                            ? string.Empty
                            : dr["Address3"].ToString();
                        assmt.CityStateZip = String.IsNullOrEmpty(dr["CityStateZip"].ToString())
                            ? string.Empty
                            : dr["CityStateZip"].ToString();
                        assmt.AddNames = String.IsNullOrEmpty(dr["AddNames"].ToString())
                            ? string.Empty
                            : dr["AddNames"].ToString();
                        assmt.Pclass = String.IsNullOrEmpty(dr["Pclass"].ToString())
                            ? string.Empty
                            : dr["Pclass"].ToString();
                        assmt.CoPropCls = String.IsNullOrEmpty(dr["CoPropCls"].ToString())
                            ? string.Empty
                            : dr["CoPropCls"].ToString();
                        assmt.Situsaddr = String.IsNullOrEmpty(dr["Situsaddr"].ToString())
                            ? string.Empty
                            : dr["Situsaddr"].ToString();
                        assmt.Situscsz = String.IsNullOrEmpty(dr["Situscsz"].ToString())
                            ? string.Empty
                            : dr["Situscsz"].ToString();
                        assmt.RollLandMkt = String.IsNullOrEmpty(dr["RollLandMkt"].ToString())
                            ? string.Empty
                            : dr["RollLandMkt"].ToString();
                        assmt.RollTotalImp = String.IsNullOrEmpty(dr["RollTotalImp"].ToString())
                            ? string.Empty
                            : dr["RollTotalImp"].ToString();
                        assmt.RollRmvValue = String.IsNullOrEmpty(dr["RollRmvValue"].ToString())
                            ? string.Empty
                            : dr["RollRmvValue"].ToString();
                        assmt.RollUseValue = String.IsNullOrEmpty(dr["RollUseValue"].ToString())
                            ? string.Empty
                            : dr["RollUseValue"].ToString();
                        assmt.RollAssdVal = String.IsNullOrEmpty(dr["RollAssdVal"].ToString())
                            ? string.Empty
                            : dr["RollAssdVal"].ToString();
                        assmt.Yrblt = String.IsNullOrEmpty(dr["Yrblt"].ToString())
                            ? string.Empty
                            : dr["Yrblt"].ToString();
                        assmt.LivingArea = String.IsNullOrEmpty(dr["LivingArea"].ToString())
                            ? string.Empty
                            : dr["LivingArea"].ToString();
                        assmt.Acreage = String.IsNullOrEmpty(dr["Acreage"].ToString())
                            ? string.Empty
                            : dr["Acreage"].ToString();
                        assmt.PropCode = String.IsNullOrEmpty(dr["PropCode"].ToString())
                            ? string.Empty
                            : dr["PropCode"].ToString();
                        assmt.CurrentLevy = String.IsNullOrEmpty(dr["CurrentLevy"].ToString())
                            ? string.Empty
                            : dr["CurrentLevy"].ToString();

                        retVal.Add(assmt);
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;

        }


        public List<Assessment> ReturnAssessmentInfoByMapTaxlot(string mapTaxLot)
        {
            List<Assessment> retVal = new List<Assessment>();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByMapTaxLot("ReturnAssessmentInfoByMapTaxlot", mapTaxLot);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        Assessment assmt = new Assessment();

                        assmt.PropertyId = String.IsNullOrEmpty(dr["Property"].ToString())
                            ? string.Empty
                            : dr["Property"].ToString();
                        assmt.Maplot = mapTaxLot;
                        assmt.OwnerName = String.IsNullOrEmpty(dr["OwnerName"].ToString())
                            ? string.Empty
                            : dr["OwnerName"].ToString();
                        assmt.Address1 = String.IsNullOrEmpty(dr["Address1"].ToString())
                            ? string.Empty
                            : dr["Address1"].ToString();
                        assmt.Address2 = String.IsNullOrEmpty(dr["Address2"].ToString())
                            ? string.Empty
                            : dr["Address2"].ToString();
                        assmt.Address3 = String.IsNullOrEmpty(dr["Address3"].ToString())
                            ? string.Empty
                            : dr["Address3"].ToString();
                        assmt.CityStateZip = String.IsNullOrEmpty(dr["CityStateZip"].ToString())
                            ? string.Empty
                            : dr["CityStateZip"].ToString();
                        assmt.AddNames = String.IsNullOrEmpty(dr["AddNames"].ToString())
                            ? string.Empty
                            : dr["AddNames"].ToString();
                        assmt.Pclass = String.IsNullOrEmpty(dr["Pclass"].ToString())
                            ? string.Empty
                            : dr["Pclass"].ToString();
                        assmt.CoPropCls = String.IsNullOrEmpty(dr["CoPropCls"].ToString())
                            ? string.Empty
                            : dr["CoPropCls"].ToString();
                        assmt.Situsaddr = String.IsNullOrEmpty(dr["Situsaddr"].ToString())
                            ? string.Empty
                            : dr["Situsaddr"].ToString();
                        assmt.Situscsz = String.IsNullOrEmpty(dr["Situscsz"].ToString())
                            ? string.Empty
                            : dr["Situscsz"].ToString();
                        assmt.RollLandMkt = String.IsNullOrEmpty(dr["RollLandMkt"].ToString())
                            ? string.Empty
                            : dr["RollLandMkt"].ToString();
                        assmt.RollTotalImp = String.IsNullOrEmpty(dr["RollTotalImp"].ToString())
                            ? string.Empty
                            : dr["RollTotalImp"].ToString();
                        assmt.RollRmvValue = String.IsNullOrEmpty(dr["RollRmvValue"].ToString())
                            ? string.Empty
                            : dr["RollRmvValue"].ToString();
                        assmt.RollUseValue = String.IsNullOrEmpty(dr["RollUseValue"].ToString())
                            ? string.Empty
                            : dr["RollUseValue"].ToString();
                        assmt.RollAssdVal = String.IsNullOrEmpty(dr["RollAssdVal"].ToString())
                            ? string.Empty
                            : dr["RollAssdVal"].ToString();
                        assmt.Yrblt = String.IsNullOrEmpty(dr["Yrblt"].ToString())
                            ? string.Empty
                            : dr["Yrblt"].ToString();
                        assmt.LivingArea = String.IsNullOrEmpty(dr["LivingArea"].ToString())
                            ? string.Empty
                            : dr["LivingArea"].ToString();
                        assmt.Acreage = String.IsNullOrEmpty(dr["Acreage"].ToString())
                            ? string.Empty
                            : dr["Acreage"].ToString();
                        assmt.PropCode = String.IsNullOrEmpty(dr["PropCode"].ToString())
                            ? string.Empty
                            : dr["PropCode"].ToString();
                        assmt.CurrentLevy = String.IsNullOrEmpty(dr["CurrentLevy"].ToString())
                            ? string.Empty
                            : dr["CurrentLevy"].ToString();

                        retVal.Add(assmt);
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public Assessment ReturnAssessmentInfoByPropertyID(string propertyId)
        {
            Assessment retVal = new Assessment();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnAssessmentInfoByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        retVal.PropertyId = propertyId;
                        retVal.Maplot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty
                            : dr["MapTaxLot"].ToString();
                        retVal.OwnerName = String.IsNullOrEmpty(dr["OwnerName"].ToString())
                            ? string.Empty
                            : dr["OwnerName"].ToString();
                        retVal.Address1 = String.IsNullOrEmpty(dr["Address1"].ToString())
                            ? string.Empty
                            : dr["Address1"].ToString();
                        retVal.Address2 = String.IsNullOrEmpty(dr["Address2"].ToString())
                            ? string.Empty
                            : dr["Address2"].ToString();
                        retVal.Address3 = String.IsNullOrEmpty(dr["Address3"].ToString())
                            ? string.Empty
                            : dr["Address3"].ToString();
                        retVal.CityStateZip = String.IsNullOrEmpty(dr["CityStateZip"].ToString())
                            ? string.Empty
                            : dr["CityStateZip"].ToString();
                        retVal.AddNames = String.IsNullOrEmpty(dr["AddNames"].ToString())
                            ? string.Empty
                            : dr["AddNames"].ToString();
                        retVal.Pclass = String.IsNullOrEmpty(dr["Pclass"].ToString())
                            ? string.Empty
                            : dr["Pclass"].ToString();
                        retVal.CoPropCls= String.IsNullOrEmpty(dr["CoPropCls"].ToString())
                            ? string.Empty
                            : dr["CoPropCls"].ToString();
                        retVal.Situsaddr = String.IsNullOrEmpty(dr["Situsaddr"].ToString())
                            ? string.Empty
                            : dr["Situsaddr"].ToString(); 
                        retVal.Situscsz = String.IsNullOrEmpty(dr["Situscsz"].ToString())
                            ? string.Empty
                            : dr["Situscsz"].ToString(); 
                        retVal.RollLandMkt = String.IsNullOrEmpty(dr["RollLandMkt"].ToString())
                            ? string.Empty
                            : dr["RollLandMkt"].ToString();
                        retVal.RollTotalImp = String.IsNullOrEmpty(dr["RollTotalImp"].ToString())
                            ? string.Empty
                            : dr["RollTotalImp"].ToString();
                        retVal.RollRmvValue = String.IsNullOrEmpty(dr["RollRmvValue"].ToString())
                            ? string.Empty
                            : dr["RollRmvValue"].ToString();
                        retVal.RollUseValue = String.IsNullOrEmpty(dr["RollUseValue"].ToString())
                            ? string.Empty
                            : dr["RollUseValue"].ToString();
                        retVal.RollAssdVal = String.IsNullOrEmpty(dr["RollAssdVal"].ToString())
                            ? string.Empty
                            : dr["RollAssdVal"].ToString();
                        retVal.Yrblt = String.IsNullOrEmpty(dr["Yrblt"].ToString())
                            ? string.Empty
                            : dr["Yrblt"].ToString();
                        retVal.LivingArea = String.IsNullOrEmpty(dr["LivingArea"].ToString())
                            ? string.Empty
                            : dr["LivingArea"].ToString();
                        retVal.Acreage = String.IsNullOrEmpty(dr["Acreage"].ToString())
                            ? string.Empty
                            : dr["Acreage"].ToString();
                        retVal.PropCode = String.IsNullOrEmpty(dr["PropCode"].ToString())
                            ? string.Empty
                            : dr["PropCode"].ToString();
                        retVal.CurrentLevy = String.IsNullOrEmpty(dr["CurrentLevy"].ToString())
                            ? string.Empty
                            : dr["CurrentLevy"].ToString();
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public PropertyCode ReturnCodeInfo(string propertyId)
        {
            PropertyCode retVal = new PropertyCode();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnCodeByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        retVal.PropertyId = propertyId;
                        retVal.Maplot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty : dr["MapTaxLot"].ToString();

                        retVal.CodeArea = String.IsNullOrEmpty(dr["CodeArea"].ToString())
                            ? string.Empty : dr["CodeArea"].ToString();

                        retVal.MaintenanceArea = String.IsNullOrEmpty(dr["Maint"].ToString())
                            ? string.Empty : dr["Maint"].ToString();
                        
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public List<DeedHistory> ReturnDeedHistory(string propertyId)
        {
            List<DeedHistory> retVal = new List<DeedHistory>();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnDeedHistoryByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        DeedHistory dh = new DeedHistory();

                        dh.PropId = propertyId;
                        dh.Maplot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty : dr["MapTaxLot"].ToString();

                        dh.Deeddate = String.IsNullOrEmpty(dr["Deeddate"].ToString())
                            ? string.Empty : dr["deeddate"].ToString();

                        dh.SellerName = String.IsNullOrEmpty(dr["SellerName"].ToString())
                            ? string.Empty : dr["SellerName"].ToString();
                      
                        dh.BuyerName = String.IsNullOrEmpty(dr["BuyerName"].ToString())
                            ? string.Empty : dr["BuyerName"].ToString();

                        dh.Deedtype = String.IsNullOrEmpty(dr["Deedtype"].ToString())
                            ? string.Empty : dr["Deedtype"].ToString();

                        dh.SalePrice = String.IsNullOrEmpty(dr["SalePrice"].ToString())
                            ? string.Empty : dr["SalePrice"].ToString();
                        
                        dh.SaleYn = String.IsNullOrEmpty(dr["SaleYn"].ToString())
                            ? string.Empty : dr["SaleYn"].ToString();
                        
                        dh.SalesDate = String.IsNullOrEmpty(dr["SalesDate"].ToString())
                            ? string.Empty : dr["SalesDate"].ToString();
                        
                        dh.Bookid = String.IsNullOrEmpty(dr["Bookid"].ToString())
                            ? string.Empty : dr["Bookid"].ToString();
                        
                        dh.InstNum = String.IsNullOrEmpty(dr["InstNum"].ToString())
                            ? string.Empty : dr["InstNum"].ToString();

                        dh.Instrumentnum = String.IsNullOrEmpty(dr["Instrumentnum"].ToString())
                            ? string.Empty : dr["Instrumentnum"].ToString();
                        
                        dh.PropIds = String.IsNullOrEmpty(dr["PropIds"].ToString())
                            ? string.Empty : dr["PropIds"].ToString();
                        
                        dh.Comment = String.IsNullOrEmpty(dr["Comment"].ToString())
                            ? string.Empty : dr["Comment"].ToString();

                        retVal.Add(dh);
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public List<OwnerHistory> ReturnOwnerHistory(string propertyId)
        {
            List<OwnerHistory> retVal = new List<OwnerHistory>();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnOwnerHistoryByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        OwnerHistory oh = new OwnerHistory();

                        oh.PropertyId = propertyId;
                        oh.Maplot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty : dr["MapTaxLot"].ToString();

                        oh.PropertyIds = String.IsNullOrEmpty(dr["Propertyids"].ToString())
                            ? string.Empty : dr["Propertyids"].ToString();

                        oh.SaleID = String.IsNullOrEmpty(dr["SaleId"].ToString())
                            ? string.Empty : dr["SaleId"].ToString();

                        oh.Year = String.IsNullOrEmpty(dr["Year"].ToString())
                            ? string.Empty : dr["Year"].ToString();

                        oh.DeedDate = String.IsNullOrEmpty(dr["DeedDt"].ToString())
                            ? string.Empty : dr["DeedDt"].ToString();

                        oh.InstNo = String.IsNullOrEmpty(dr["InstNo"].ToString())
                            ? string.Empty : dr["InstNo"].ToString();

                        oh.SellerName = String.IsNullOrEmpty(dr["SellerName"].ToString())
                            ? string.Empty : dr["SellerName"].ToString();

                        oh.BuyerName = String.IsNullOrEmpty(dr["BuyerName"].ToString())
                            ? string.Empty : dr["BuyerName"].ToString();

                        oh.AcctStatus = String.IsNullOrEmpty(dr["AcctStatus"].ToString())
                            ? string.Empty : dr["AcctStatus"].ToString();

                        oh.DeedType = String.IsNullOrEmpty(dr["DeedType"].ToString())
                            ? string.Empty : dr["DeedType"].ToString();

                        oh.Saleprice = String.IsNullOrEmpty(dr["Saleprice"].ToString())
                            ? string.Empty : dr["Saleprice"].ToString();

                        oh.Infocomment = String.IsNullOrEmpty(dr["Infocomment"].ToString())
                            ? string.Empty : dr["Infocomment"].ToString();

                        retVal.Add(oh);
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public List<Owner> ReturnOwnerInfo(string propertyId)
        {
            List<Owner> retVal = new List<Owner>();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnOwnerByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        Owner o = new Owner();

                        o.PropertyId = propertyId;
                        
                        o.Maplot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty : dr["MapTaxLot"].ToString();

                        o.OwnerName = String.IsNullOrEmpty(dr["OwnerName"].ToString())
                            ? string.Empty : dr["OwnerName"].ToString();

                        o.Address1 = String.IsNullOrEmpty(dr["Address1"].ToString())
                            ? string.Empty : dr["Address1"].ToString();

                        o.Address2 = String.IsNullOrEmpty(dr["Address2"].ToString())
                            ? string.Empty : dr["Address2"].ToString();

                        o.Address3 = String.IsNullOrEmpty(dr["Address3"].ToString())
                            ? string.Empty : dr["Address3"].ToString();

                        o.CityStateZip = String.IsNullOrEmpty(dr["CityStateZip"].ToString())
                            ? string.Empty : dr["CityStateZip"].ToString();

                        o.AddNames = String.IsNullOrEmpty(dr["AddNames"].ToString())
                            ? string.Empty : dr["AddNames"].ToString();

                        o.AddOwnerType = String.IsNullOrEmpty(dr["AddOwnerType"].ToString())
                            ? string.Empty : dr["AddOwnerType"].ToString();

                        o.Acreage = String.IsNullOrEmpty(dr["Acreage"].ToString())
                            ? string.Empty : dr["Acreage"].ToString();

                        retVal.Add(o);
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public List<Sales> ReturnSalesInfo(string propertyId)
        {
            List<Sales> retVal = new List<Sales>();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnSalesByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        Sales s = new Sales();

                        s.PropertyId = propertyId;
                        s.Maptaxlot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty
                            : dr["MapTaxLot"].ToString();

                        s.SaleId = String.IsNullOrEmpty(dr["SaleId"].ToString())
                            ? string.Empty
                            : dr["SaleId"].ToString();

                        s.DeedType = String.IsNullOrEmpty(dr["DeedType"].ToString())
                            ? string.Empty
                            : dr["DeedType"].ToString();

                        s.Year = String.IsNullOrEmpty(dr["Year"].ToString())
                            ? string.Empty
                            : dr["Year"].ToString();

                        s.Saleprice = String.IsNullOrEmpty(dr["Saleprice"].ToString())
                            ? string.Empty
                            : dr["Saleprice"].ToString();

                        s.InstNo = String.IsNullOrEmpty(dr["InstNo"].ToString())
                            ? string.Empty
                            : dr["InstNo"].ToString();

                        s.Saletype = String.IsNullOrEmpty(dr["Saletype"].ToString())
                            ? string.Empty
                            : dr["Saletype"].ToString();

                        s.SaleDate= String.IsNullOrEmpty(dr["SlDate"].ToString())
                            ? string.Empty
                            : dr["SlDate"].ToString();

                        retVal.Add(s);
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public Situs ReturnSitusInfo(string propertyId)
        {
            Situs retVal = new Situs();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnSitusByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {

                        retVal.Property = propertyId;
                        retVal.MapTaxLot = String.IsNullOrEmpty(dr["MapTaxLot"].ToString())
                            ? string.Empty: dr["MapTaxLot"].ToString();

                        retVal.Stat = String.IsNullOrEmpty(dr["Stat"].ToString())
                            ? string.Empty : dr["Stat"].ToString();

                        retVal.SitusNum = String.IsNullOrEmpty(dr["SitusNum"].ToString())
                            ? string.Empty : dr["SitusNum"].ToString();

                        retVal.SitusStreet = String.IsNullOrEmpty(dr["SitusStreet"].ToString())
                            ? string.Empty : dr["SitusStreet"].ToString();

                        retVal.SitSufx1 = String.IsNullOrEmpty(dr["SitSufx1"].ToString())
                            ? string.Empty : dr["SitSufx1"].ToString();

                        retVal.SitSufx2 = String.IsNullOrEmpty(dr["SitSufx2"].ToString())
                            ? string.Empty : dr["SitSufx2"].ToString();

                        retVal.SitusPrefix = String.IsNullOrEmpty(dr["SitusPrefix"].ToString())
                            ? string.Empty : dr["SitusPrefix"].ToString();

                        retVal.SitusCity = String.IsNullOrEmpty(dr["SitusCity"].ToString())
                            ? string.Empty : dr["SitusCity"].ToString();

                        retVal.SitusState = String.IsNullOrEmpty(dr["SitusState"].ToString())
                            ? string.Empty : dr["SitusState"].ToString();

                        retVal.SitusZip = String.IsNullOrEmpty(dr["SitusZip"].ToString())
                            ? string.Empty : dr["SitusZip"].ToString();

                        retVal.CodeArea = String.IsNullOrEmpty(dr["CodeArea"].ToString())
                            ? string.Empty : dr["CodeArea"].ToString();

                        retVal.Pclass = String.IsNullOrEmpty(dr["Pclass"].ToString())
                            ? string.Empty : dr["Pclass"].ToString();

                        retVal.OwnerName = String.IsNullOrEmpty(dr["OwnerName"].ToString())
                            ? string.Empty : dr["OwnerName"].ToString();

                        retVal.NameAddress = String.IsNullOrEmpty(dr["NameAddress"].ToString())
                            ? string.Empty : dr["NameAddress"].ToString();

                        retVal.NameAddress15 = String.IsNullOrEmpty(dr["NameAddress15"].ToString())
                            ? string.Empty : dr["NameAddress15"].ToString();

                        retVal.City = String.IsNullOrEmpty(dr["City"].ToString())
                            ? string.Empty : dr["City"].ToString();

                        retVal.St = String.IsNullOrEmpty(dr["St"].ToString())
                            ? string.Empty : dr["St"].ToString();

                        retVal.Zip = String.IsNullOrEmpty(dr["Zip"].ToString())
                            ? string.Empty : dr["Zip"].ToString();

                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }

        public TaxDue ReturnTaxInfo(string propertyId)
        {
            TaxDue retVal = new TaxDue();
            Dal dal = new Dal();

            try
            {
                dal.ConnectionString = ReturnConnString();
                dal.Connect();
                DataSet ds = dal.ReturnDatasetFromStoredProcByPropID("ReturnTaxesDueByPropID", propertyId);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {

                        retVal.Property = propertyId;
                        retVal.Date = String.IsNullOrEmpty(dr["Date"].ToString())
                            ? string.Empty : dr["Date"].ToString();

                        retVal.AmtDue = String.IsNullOrEmpty(dr["AmtDue"].ToString())
                            ? string.Empty : dr["AmtDue"].ToString();

                        retVal.Stat = String.IsNullOrEmpty(dr["Stat"].ToString())
                            ? string.Empty : dr["Stat"].ToString();

                        retVal.AcctStatus = String.IsNullOrEmpty(dr["AcctStatus"].ToString())
                            ? string.Empty : dr["AcctStatus"].ToString();

                        retVal.OtcName = String.IsNullOrEmpty(dr["OtcName"].ToString())
                            ? string.Empty : dr["OtcName"].ToString();

                        retVal.OtcAddr1 = String.IsNullOrEmpty(dr["OtcAddr1"].ToString())
                            ? string.Empty : dr["OtcAddr1"].ToString();

                        retVal.OtcAddr2 = String.IsNullOrEmpty(dr["OtcAddr2"].ToString())
                            ? string.Empty : dr["OtcAddr2"].ToString();

                        retVal.OtcAddr3 = String.IsNullOrEmpty(dr["OtcAddr3"].ToString())
                            ? string.Empty : dr["OtcAddr3"].ToString();

                        retVal.CityStateZip = String.IsNullOrEmpty(dr["CityStateZip"].ToString())
                            ? string.Empty : dr["CityStateZip"].ToString();

                        retVal.Zip = String.IsNullOrEmpty(dr["Zip"].ToString())
                            ? string.Empty : dr["Zip"].ToString();

                        retVal.EffectiveDate = String.IsNullOrEmpty(dr["EffectiveDate"].ToString())
                            ? string.Empty : dr["EffectiveDate"].ToString();
                    }
                    dal.Disconnect();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return retVal;
        }
    }
}
