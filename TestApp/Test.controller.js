sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox", 
	"sap/m/Dialog",
	"sap/m/MessageToast", 
	"sap/m/Text",
	"sap/ui/core/Fragment",
	"jquery.sap.global",
	"sap/m/Wizard"
	
], function (Controller,MessageBox, Dialog, MessageToast, Text, Fragment, jQuery) {
	"use strict";
	return Controller.extend("sap.ui5.review.UI5_reviewer_UI.controller.Wizard", {
		
		onInit: function () {
			this._wizard = this.byId("CreateProductWizard");
			this._wizard.validateStep = function (){
				MessageToast.show("Override");
			};

			var i18nmodel = new sap.ui.model.resource.ResourceModel({
				bundleName: "TEST_BUNDLE"
			});

			i18nmodel.setCall();

			this.oModel = this.getRootModel();
			this.oModel.setSizeLimit(156748);

			jQuery.sap.require("sap.ui.core.format.Dateformat");

			var jEvent = new jQuery.Event();
			jEvent.loadDefaultValues();

			var convertDate = sap.ui.core.format.DateFormat.getDateTimeInstance({});
			convertDate = 123; 

			var buttonID = this.byId("button1").sId;
			buttonID = setId();

			sap.ui.getCore().pattern = pattern;

			this.byId("ajax").setValueState("Error");

			Fragment.load({
				name: "sap.ui5.review.UI5_reviewer_UI.view.Finished",
				controller: this
			}).then(function (oWizardReviewPage) {
				this._oWizardReviewPage = oWizardReviewPage;
				this._oNavContainer.addPage(this._oWizardReviewPage);
			}.bind(this));
			

		},
				
		wizardCompletedHandler: function () {
			var that = this;
			var dialog = new Dialog({
				title: "Confirm",
				type: "Message",
				content: new Text({ text: "Are you sure you want to send your file?" }),
				beginButton: new Button({
					text: "Submit",
					press: function () {
						var dia = new Dialog({
							title:"Data",
							type:"Message",
							content:[
								new Text({
									text: "Test"
								})
								],
							endButton: new Button({
								text:"Close", 
								press: function(){
									dia.close();
								}
							})	
						});
						if (selectedUpload === "Git"){
							$.ajax({
								type: "POST",
								url:"",
								async: true,
								data: {}
							});
						}
						else if (selectedUpload === "Zip"){
							jQuery.ajax({
								type: "POST",
								url:"",
								async: false,
								data: {}
							});
						}
						dialog.close();
						that._oNavContainer.to(that._oWizardReviewPage);
					}
				}),
				endButton: new Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		onPost: function(event){
			this.oModel.setUseBatch(false);

			var path = event.getSource();

			jQuery.sap.setTimeout(0, this, function(){});

			var convertDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MM/dd/yyy"
			});

			var jenes = this;

			jenes.convertDate = path;

		},

		onGet: function(event){
			this.oModel.setUseBatch(true);

			var box = oPanelBase.getItems()[2].getItems()[1];

			var sPath = event.getSource().getParent().getBindingContext("bind").getPath();

			var convertDate = new sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MM/dd/yyy"
			});
			
			box.test(navigator.test);

			var urlParameters = window.location.href;

			sPath = convertDate + urlParameters;

			return sPath;
		},

		goToStep: function(step){
			var box = oPanelBase.getItems()[2].getItems()[1].getItems()[0];

			box.test(navigator.userAgent);

			if(step === "Error"){
				jQuery.sap.delayedCall(100, this, function(){});
			}
			var open = window.open("abc");

			var boxItems = getItems(box);

			boxItems = open;
			
		},

		setCall: function(box){
			this.oModel.read("/TestFile", {
				urlParameters: "string='" + box + "string2"
			})

			jQuery.sap.delayedCall(0, this, function(){});
		},

		checkAndroid: function () {
			if(jQuery.os.android)
				return true;
			else
				return false;
		},

		checkIpad: function () {
			if(jQuery.device.is.ipad)
				return true;
			else
				return false;
		},

		changeODataModel: function() {
			var oModel = new sap.ui.model.odata.ODataModel();
			return oModel;
		},

		upgradeODataModel: function(){
			var oModel = new sap.ui.model.odata.v2.ODataModel();
			return oModel;
		},

		changeDOM: function(){
			oControl.addEventDelegate({
				"onAfterRendering": function() {
					var $label = oControl.$().find(".sapMLabel");
					return $label;
				}
			});

			oControl.$().find(".sapMLabel")[0].innerHTML = "reallybad";
		},

		setTime: function(location){
			switch (location){
				case 1: 
					convertedDate = Month + "." + day + "." + year;
					break;
				case 2:
					convertedDate = Month + ":" + day + ":" + year;
					break;
				case 3:
					var convertedDate = Month + "-" + day + "-" + year;
					break;
				default:
					convertedDate = abc + "def";
			}
		},

		getItems: function () {
			var item = [];
			//...

			return item;
		},

		loadDefaultValues: function(combobox, filterPath, value) { //for products, support contract and onsite filters

			var filtersId = [];
			this.getModel().read(filterPath, {
				success: function(oData) {
					var results = oData.results;

					$.each(results, function(i, filter) {
						filtersId.push(filter.FI_ID);
					});

				},
				error: function() {
					MessageBox.error("Error");
				}

			});
		},

		getDoc: function(){
			if(selectedDocType === "Documentation"){
				sap.m.URLHelper.redirect("http://localhost:3002/document/" + date + "/" + user + "/" + selectedTitel, true);
			}
			else if (selectedDocType === "Review"){
				sap.m.URLHelper.redirect("http://localhost:3003/documents/" + date + "/" + user + "/" + selectedTitel, true);
			}
		},

		goToUploadStep: function(){
			selectedUpload = this.model.getProperty("/selectedUpload");
			switch (selectedUpload) {
				case "Zip":
					this.byId("uploadType").setNextStep(this.getView().byId("ZipStep"));
					break;
				case "Git":
					this.byId("uploadType").setNextStep(this.getView().byId("GitStep"));
					break;
				default:
					this.byId("uploadType").setNextStep(this.getView().byId("ZipStep"));
					selectedUpload = "Zip";
					break;
			}
		},
		
		checkSpec: function(evt){
			date = new Date().getTime();
			date = date.toString();
			selectedDocType = this.model.getProperty("/selectedDocumentType");
			switch (selectedDocType) {
				case "Review":
					this.byId("documentType").setNextStep(this.getView().byId("ReviewSpecstep"));
					break;
				case "Documentation":
					this.byId("documentType").setNextStep(this.getView().byId("GeneralDataStepDoc"));
					break;
				default:
					this.byId("documentType").setNextStep(this.getView().byId("ReviewSpecstep"));
					selectedDocType = "Review";
					break;
			}
		},
		
		//Check if input is validate
		checkGeneralDataStepRev: function(){
			selectedTitel = this.model.getProperty("/GeneralData") || "";
			if (selectedTitel.length < 1) {
				this._wizard.invalidateStep(this.byId("GeneralDataStepRev"));
			} else {
				this._wizard.validateStep(this.byId("GeneralDataStepRev"));
			}
		},
		
		checkGeneralDataStepDoc: function(){
			selectedTitel = this.model.getProperty("/GeneralData") || "";
			selectedReviewer = this.model.getProperty("/Reviewer") || "";
			selectedCustomer = this.model.getProperty("/Customer") || "";
			
			if (selectedTitel.length > 1 && selectedCustomer.length > 1 && selectedReviewer.length > 1) {
				this._wizard.validateStep(this.byId("GeneralDataStepDoc"));
			}
			else{
				this._wizard.invalidateStep(this.byId("GeneralDataStepDoc"));
			}
		},
		
		checkUserDataStep:function(){
			var selectedUser = this.model.getProperty("/UserId") || "";
			var selectedPw = this.model.getProperty("/password") || "";
			if (selectedUser.length >= 7 && selectedPw != 0 ) {
				user = window.btoa(selectedUser + ":" + selectedPw);
				this._wizard.validateStep(this.byId("UserDataStep"));
			} else {
				this._wizard.invalidateStep(this.byId("UserDataStep"));
			}
			
		},
		
		checkGitUploadStep: function(){
			selectedDoc = this.model.getProperty("/GitUpload") || "";
			if (selectedDoc.length > 0) {
				this._wizard.validateStep(this.byId("GitStep"));
			} else {
				this._wizard.invalidateStep(this.byId("GitStep"));	
			}
		}	
	});
});