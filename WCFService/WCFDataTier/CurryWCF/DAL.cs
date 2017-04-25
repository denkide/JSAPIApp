using System;
using System.Data;
using System.Data.SqlClient;


namespace CurryWCF
{
    public class CurryConnectionProps
    {
        public string Database { get; set; }
        public string Instance { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public string ReturnConnectionString()
        {
            try
            {
                if (Database.Length < 1) throw new Exception("ConnectionProps.ReturnODBCConnectionString :: Database is empty");
                if (Instance.Length < 1) throw new Exception("ConnectionProps.ReturnODBCConnectionString :: Instance is empty");
                if (UserName.Length < 1) throw new Exception("ConnectionProps.ReturnODBCConnectionString :: UserName is empty");
                if (Password.Length < 1) throw new Exception("ConnectionProps.ReturnODBCConnectionString :: Password is empty");

                return String.Format("Server={0};Database={1};User Id={2};Password={3};", Instance, Database, UserName, Password);
            }
            catch (Exception ex)
            {
                throw new Exception("Error connecting to GIS database --> " + ex.Message);
            }
        }

    }
    
    public class Dal
    {
        private SqlConnection  _conn;

        public string ConnectionString { get; set; }

        public void Connect()
        {
            try
            {
                _conn = new SqlConnection(ConnectionString);
                _conn.Open();
            }
            catch (Exception ex)
            {
                if (_conn != null)
                {
                    _conn.Close();
                    _conn.Dispose();
                    _conn = null;
                }
                throw new Exception("Errors occurred while opening connection ::: " + ex.Message);
            }
        }

        public void Disconnect()
        {
            if (_conn.State.ToString().Equals("Open"))
            {
                _conn.Close();
                _conn.Dispose();
                _conn = null;
            }
        }


        public DataSet ReturnDatasetFromStoredProcByPropID(string proc, string inParam)
        {
            
            DataSet ds = new DataSet();
            if (_conn.State.ToString().Equals("Open"))
            {
                try
                {
                    SqlDataAdapter da = new SqlDataAdapter(proc, _conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.Add(new SqlParameter("@PropertyID", SqlDbType.VarChar, 20)).Value = inParam;
                    da.Fill(ds, "Results");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return ds;
        }

        public DataSet ReturnDatasetFromStoredProcByMapTaxLot(string proc, string inParam)
        {

            DataSet ds = new DataSet();
            if (_conn.State.ToString().Equals("Open"))
            {
                try
                {
                    SqlDataAdapter da = new SqlDataAdapter(proc, _conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.Add(new SqlParameter("@MapTaxlot", SqlDbType.VarChar, 20)).Value = inParam;
                    da.Fill(ds, "Results");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return ds;
        }


        public DataSet ReturnDatasetFromStoredProcByOwner(string proc, string inParam)
        {

            DataSet ds = new DataSet();
            if (_conn.State.ToString().Equals("Open"))
            {
                try
                {
                    SqlDataAdapter da = new SqlDataAdapter(proc, _conn);
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.Add(new SqlParameter("@OwnerName", SqlDbType.VarChar, 200)).Value = inParam;
                    da.Fill(ds, "Results");
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return ds;
        }
        //public DataSet ReturnDatasetFromStoredProcByMaplot(string proc, string inParam)
        //{

        //    DataSet ds = new DataSet();
        //    if (_conn.State.ToString().Equals("Open"))
        //    {
        //        try
        //        {
        //            SqlDataAdapter da = new SqlDataAdapter(proc, _conn);
        //            da.SelectCommand.CommandType = CommandType.StoredProcedure;
        //            da.SelectCommand.Parameters.Add(new SqlParameter("@PropertyID", SqlDbType.VarChar, 20));
        //            da.Fill(ds, "Results");
        //        }
        //        catch (Exception ex)
        //        {
        //            throw new Exception(ex.Message);
        //        }
        //    }
        //    return ds;
        //}

        //public PropertyCode ReturnCodeInfo(string propertyId)
        //{

        //    return null;
        //}

        //public List<DeedHistory> ReturnDeedHistory(string propertyId)
        //{

        //    return null;
        //}

        //public List<OwnerHistory> ReturnOwnerHistory(string propertyId)
        //{

        //    return null;
        //}

        //public List<Owner> ReturnOwnerInfo(string propertyId)
        //{

        //    return null;
        //}

        //public List<Sales> ReturnSalesInfo(string maplot)
        //{

        //    return null;
        //}

        //public Situs ReturnSitusInfo(string propertyId)
        //{

        //    return null;
        //}

        //public TaxDue ReturnTaxInfo(string propertyId)
        //{

        //    return null;
        //}
    }
}





