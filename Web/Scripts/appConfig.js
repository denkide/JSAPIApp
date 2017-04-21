/* 
    
    These values are used by the application. 
    You can modify the value, but not the key.
     
*/

define(["dojo/_base/declare"], function(declare) {
    return declare("Scripts.Config", null, {

        //-- ## Map Services
        //-------------------------------------------------------------
        DynamicServices: [
            { id: "Streets", path: "http://xxxx/arcgis/rest/services/Streets/MapServer" },
            { id: "Roads", path: "http://xxxx/arcgis/rest/services/Roads/MapServer" },
            { id: "Public Safety", path: "http://xxxx/arcgis/rest/services/Public_Safety/MapServer" },
            { id: "Public Services", path: "http://xxxx/arcgis/rest/services/Public_Services/MapServer" },
            { id: "PLSS", path: "http://xxxx/arcgis/rest/services/Public_Land_Survey_System/MapServer" },
            { id: "Hydrology", path: "http://xxxx/arcgis/rest/services/Hydrology/MapServer" },
            { id: "Port Orford", path: "http://xxxx/arcgis/rest/services/City_of_Port_Orford/MapServer" },
            { id: "Port Orford", path: "http://xxxx/arcgis/rest/services/City_of_Port_Orford/MapServer" },
            { id: "Gold Beach", path: "http://xxxx/arcgis/rest/services/City_of_Gold_Beach/MapServer" },
            { id: "Brookings", path: "http://xxxx/arcgis/rest/services/City_of_Brookings/MapServer" },
            { id: "Address Info", path: "http://xxxx/arcgis/rest/services/Address_Information/MapServer" },
            { id: "Boundaries", path: "http://xxxx/arcgis/rest/services/Boundaries_and_Districts/MapServer" }
        ],

        CachedServices: [
            { id: "BasemapService", path: "http://xxxx/arcgis/rest/services/Basemaps/Street_Basemap/MapServer" }
        ],

        //-- ##  set the initial visibility for the cached services
        //-------------------------------------------------------------
        DataService: "http://xxxx/CurryWCF/CurryAssessment.svc/",

        //-- ##  set the print task endpoint
        //-------------------------------------------------------------
        PrintService: "http://xxxx/arcgis/rest/services/PrintTemplates/ExportWebMap/GPServer/Export%20Web%20Map",

        //-- ##  the geometry service to use for spatial queries
        //-------------------------------------------------------------
        GeometryService: "http://xxxx/arcgis/rest/services/Utilities/Geometry/GeometryServer/",

        //-- ##  the geometry service to use for spatial queries
        //-------------------------------------------------------------
        TaxlotFeatureLayer: "http://xxxx/arcgis/rest/services/Address_Information/MapServer/1/",

        //-- ##  service to use for basemap in the aerial / basemap toggle and legend
        //-------------------------------------------------------------
        BasemapService: "BasemapService",

        //-- ##  service to use for aerial in the aerial / basemap toggle and legend
        //-------------------------------------------------------------
        AerialService: "AerialService",

        //-- ##  set the initial visibility for the dynamic services
        //-------------------------------------------------------------
        DynamicServiceInitialVisibility: ["Streets", "Hydrology", "Taxlots", "Boundaries"],

        //-- ##  set the initial visibility for the cached services
        //-------------------------------------------------------------
        CachedServiceInitialVisibility: ["BasemapService"],

        //-- ##  which layers can be used in the legend
        //-------------------------------------------------------------
        LegendLayers: ["Streets", "Infrastructure", "Hydrology", "Public Safety", "Public Services", "Roads", "PLSS", "Taxlots", "Boundaries"],

        //IdentifyLayers: [
        //    { id: "Boundaries", layers: "1,2,3,4,5,6,7,8,10,11,14,17,19,20,21,22" }
        //],
        IdentifyLayers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

        IdentifyService: "http://xxxx/arcgis/rest/services/Identify/MapServer",

        VisibleDynLayers: [
            { id: "Boundaries", layers: "12,22" },
            { id: "Reference", layers: "1,2,3,4,5,6,7,8,9,10" }
        ],
        //--## Initial Extent Values
        //-------------------------------------------------------------
        StartXMin: "11111.9606246976",
        StartYMin: "11111.38951138273",
        StartXMax: "22222.6837322684",
        StartYMax: "22222.62878715683",
        WKIDSpatialRef: "2270",

        //-- ## Application name
        //-------------------------------------------------------------
        AppTitle1: "Curry Map",
        AppTitle2: "Land Information System",

        TechSupportEmail: "test@123456789.com",

        //-- ##  Toolbar Tools
        //-------------------------------------------------------------
        ToolbarImagePath: "Images/toolbar/",

        FullExtentImage: "fullextent_1.png",
        FullExtentImageHover: "fullextent_2.png",
        FullExtentObj: "imgFullExtent",

        PanImage: "pan_1.png",
        PanImageHover: "pan_2.png",
        PanImageActive: "pan_2.png",
        PanObj: "imgPan",

        ZoominImage: "zoominbounds_1.png",
        ZoominImageHover: "zoominbounds_2.png",
        ZoominImageActive: "zoominbounds_3.png",
        ZoominObj: "imgZoomIn",

        ZoomoutImage: "zoomout_1.png",
        ZoomoutImageHover: "zoomout_2.png",
        ZoomoutImageActive: "zoomout_2.png",
        ZoomoutObj: "imgZoomOut",

        PreviousExtentImage: "zoomLast.png",
        PreviousExtentImageHover: "zoomLast_2.png",
        PreviousExtentObj: "imgBack",

        IdentifyImage: "identify_1.png",
        IdentifyImageHover: "identify_2.png",
        IdentifyImageActive: "identify_2.png",
        IdentifyObj: "imgIdentify",

        MeasureLineImage: "measure_1.png",
        MeasureLineImageHover: "measure_2.png",
        MeasureLineImageActive: "measure_2.png",
        MeasureLineObj: "imgMeasureLine",

        MeasureAreaImage: "AreaMeasure_1.png",
        MeasureAreaImageHover: "AreaMeasure_2.png",
        MeasureAreaImageActive: "AreaMeasure_2.png",
        MeasureAreaObj: "imgMeasureArea",

        SingleTaxlotSelectImage: "selectFeature_1.png",
        SingleTaxlotSelectImageHover: "selectFeature_2.png",
        SingleTaxlotSelectImageActive: "selectFeature_2.png",
        SingleTaxlotSelectObj: "imgSelectTaxlot",

        MultiTaxlotSelectImage: "select_rect_1.png",
        MultiTaxlotSelectImageHover: "select_rect_2.png",
        MultiTaxlotSelectImageActive: "select_rect_2.png",
        MultiTaxlotSelectObj: "imgSelectTaxlots",

        ResultsToggleButton: "imgToggleResults",
        ResultsToggleButtonOpen: "arrow_open.png",
        ResultsToggleButtonClose: "arrow_close.png",

        ClearGraphicsImage: "clearhighlight_1.png",
        ClearGraphicsImageHover: "clearhighlight_2.png",
        ClearGraphicsImageActive: "clearhighlight_2.png",
        ClearGraphicsObj: "imgClearGraphics",

        PrintObj: "imgPrint",

        TechSupportLink: "TechSupportEmail",


        //-- ## Toolbar Buttons
        // ---------------------------------------------------------
        ToolbarFunctionHover: "#E6EADF",
        ToolbarSearchContainer: "ToolbarSearchContainer",
        ToolbarLayersContainer: "ToolbarLayersContainer",

        //--## Containers
        // --------------------------------------------------------- 
        PanContainer: "PanContainer",
        ZoominContainer: "ZoominContainer",
        ZoomoutContainer: "ZoomoutContainer",
        ToolsContainer: "tdTools",
        SelectPointContainer: "SingleSelectionContainer",
        SelectRectContainer: "MultipleSelectionContainer",
        BufferContainer: "tdBuffer",
        BufferPanel: "BufferContainer",
        TOCContainer: "TOCContainer",
        ResultsContainer: "ResultsContainer",
        ResultPanel: "ResultPanel",
        OuterContainer: "OuterContainer",
        CenterMapPanel: "CenterPanel",
        MeasureContainer: "MeasureContainer",
        DetailsContainer: "DetailsContainer",

        constructor: function() {

        }

    });
});