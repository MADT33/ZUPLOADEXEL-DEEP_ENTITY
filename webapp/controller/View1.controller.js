sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"minisap2023/minisapdeep/model/AppJsonModel",
	"minisap2023/minisapdeep/utils/jszip",
	"minisap2023/minisapdeep/utils/xlsx",
	"sap/m/MessageBox",
	"minisap2023/minisapdeep/services/Services",
	"sap/ui/unified/DateTypeRange",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, AppJsonModel, jszip, xlsx, MessageBox, Services, DateTypeRange, MessageToast) {
        "use strict";

        return Controller.extend("minisap2023.minisapdeep.controller.View1", {
            onInit: function () {

                AppJsonModel.initializeModel()

                let that = this;
            },
    
            onBack: function() {
                history.go(-1);
            },
    
            onGuardar: function() {		
    
                        
    
                    //this._oDialog.open();
    
                    const epiList = AppJsonModel.getProperty("/epiList")
                    var array =[];
    
                    epiList.forEach(function(lista , i) {  
                    
                    var obj ={    
                       Material  : lista.Material,
                       Centro    : lista.Centro,
                       PrecioContable2 : lista.Precio_Contable_2,
                       PrecioFiscal2 : lista.Precio_Fiscal_2,
                       PrecioFiscal2bis : lista.Precio_Fis_2,
                       PrecioValFiscal3 : lista.Precio_Val_Fiscal_3,
                       PrecioPlan1 : lista.Precio_Plan_1,
                       FechaPrecioPlan1 : lista.Fecha_PrecioPlan_1,
                       PrecioPlan2 : lista.Precio_Plan_2,
                       FechaPrecioPlan2 : lista.Fecha_PrecioPlan_2
                    };
                       array.push(obj);
                    });	

                    //var oModel = new sap.ui.model.json.JSONModel(array);
                       
    
                    Services.postData({	
                    Key : "33",    
                    inputTableSet : array

                }).then(aData => {
                    console.log("enviando")
    
                }).catch(oErr => {
                    console.log(oErr)
                })
            },
                    
                       
                
    
    
            fnReplaceAjusteBS: function(oTable) {
    
                for (var i in oTable) {
    
                    var columns = {};
                    // columns['Periodo'] = oTable[i]['Periodo Calendario'].toString();
                    columns['Material'] = oTable[i]['Material'];
                    columns['Centro'] = oTable[i]["Centro"];
                    columns['Precio_Contable_2'] =  oTable[i]['Precio Contable 2'];
                    columns['Precio_Fiscal_2'] =  oTable[i]['Precio Fiscal 2'];
                    columns['Precio_Fis_2'] =  oTable[i]['Precio Fiscal 2'];
                    columns['Precio_Val_Fiscal_3'] =  oTable[i]['Precio Val fiscal 3'];
                    columns['Precio_Plan_1'] =  oTable[i]['Precio plan 1'];
                    columns['Fecha_PrecioPlan_1'] =  oTable[i]['Fecha precio plan 1 '];
                    columns['Precio_Plan_2'] =  oTable[i]['Precio plan 2'];
                    columns['Fecha_PrecioPlan_2'] =  oTable[i]['Fecha precio plan 2'];
                    oTable[i] = columns;
                }
                return oTable;
            },
    
            fileReader1: function(oFile) {
                var that = this;
                var excelajusteBS = {};
    
                var reader = new FileReader();
    
                reader.onload = function(oEvent) {
                    var data = oEvent.target.result;
    
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
    
                    workbook.SheetNames.forEach(function(sheetName) {
    
                        switch (sheetName) {
                            case workbook.SheetNames[0]:
                                excelajusteBS = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                break;
                            default:
                                // code block
                        }
                    });
    
                    if (excelajusteBS) {
    
                        var excelajusteBSRe = that.fnReplaceAjusteBS(excelajusteBS);
    
                        let epiList = AppJsonModel.getProperty("/epiList")
                        epiList = epiList.concat(excelajusteBSRe)
                        AppJsonModel.setProperty("/epiList", epiList)
                        //oLabel.setText(that.geti18nText("registros", [epiList.length]));
                    }
    
                    reader.onerror = function(ex) {
                        console.log(ex);
                    };
                };
    
                reader.readAsBinaryString(oFile);
            },
    
            onUploadFile: function(oEvent) {
                this.fileReader1(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
            },
    
            geti18nText: function(sText, aVariables = []) {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText, aVariables);
            },
    
        });
    
    });
