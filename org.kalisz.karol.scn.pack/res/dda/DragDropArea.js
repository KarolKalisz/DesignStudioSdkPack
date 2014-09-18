/**
 * Copyright 2014 Karol Kalisz
 * 
 * Original Source Code Location:
 *  https://github.com/KarolKalisz/DesignStudioSdkPack
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License. 
 */

(function() {
/** code for recognition of script path */
var myScript = $("script:last")[0].src;
_readScriptPath = function () {
	if(myScript) {
		var myScriptSuffix = "res/dda/";
		var mainScriptPathIndex = myScript.indexOf(myScriptSuffix);
 		var ownScriptPath = myScript.substring(0, mainScriptPathIndex) + myScriptSuffix;
 		return ownScriptPath;
	}
		
	return "";
},
/** end of path recognition */

sap.ui.commons.layout.AbsoluteLayout.extend("org.kalisz.karol.scn.pack.DragDropArea", {

	metadata: {
        properties: {
              "dragKey": {type: "string"},
              "dragContext": {type: "string"},
              "dropId": {type: "string"},
              "dropKey": {type: "string"},
              "dropContext": {type: "string"}
        }
	},
	
	setDefaultImage : function(value) {
		this._DefaultImage = value;
		
		if(value != undefined && value != "")  {
			this._pImagePrefix = value.substring(0, value.lastIndexOf("/") + 1);	
		}
	},

	getDefaultImage : function() {
		return this._DefaultImage;
	},

	setSelectedKey : function(value) {		
		if (value !== undefined || value !== "") {
			this._SelectedKey = value;
		}
	},

	getSelectedKey : function() {
		return this._SelectedKey;
	},

	setElements : function(value) {
		if(this._Elements == value) {
			return;
		} else {
			this._Elements = value;
		}
	},

	getElements : function() {
		return this._Elements;
	},
	
	initDesignStudio: function() {
		var that = this;
		this._ownScript = _readScriptPath();

		this._lLayout = new sap.ui.layout.HorizontalLayout({
			width : "100%",
			height : "100%"
		});

		this.addContent(
			this._lLayout,
			{left: "0px", top: "0px"}
		);
	},
	
	renderer: {},
	
	afterDesignStudioUpdate : function() {
		var that = this;
		
		var lElementsToRender = this.getElements();
		if(lElementsToRender != null && lElementsToRender != undefined && lElementsToRender != ""){
			var lElementsToRenderArray = JSON.parse(lElementsToRender);

			// Destroy old content
			this._lLayout.destroyContent();

			this.addDropArea();
			
			for (var i = 0; i < lElementsToRenderArray.length; i++) {
				var lImageElement = this.createImageElement(lElementsToRenderArray[i].key, lElementsToRenderArray[i].text, lElementsToRenderArray[i].url);
				this._lLayout.addContent(lImageElement);
				
				this.addDropArea();
			}
			
		}
	},
	
	addDropArea : function () {
		var that = this;
		
		var oDrop = new sap.ui.commons.layout.AbsoluteLayout ({
			width : "18px",
			height : "20px"
		});

		oDrop.addStyleClass("scn-pack-DragDropArea-Drop");
		
		oDrop.onAfterRendering = function () {
			var jqThis = this.$();
			
			jqThis.bind('dragover', function(evt) {
			      evt.preventDefault();
			   })
			   .bind('dragleave',function(evt) {
			      evt.preventDefault();
			   })
			   .bind('dragenter',function(evt) {
			      evt.preventDefault();
			   })
				
			   /** process drop event **/
			   .bind('drop',function(evt) {
				  var id = evt.dataTransfer.getData('id'); 
			      var key = evt.dataTransfer.getData('key'); 
			      var context = evt.dataTransfer.getData('context');

			      that.setDropId(id);
			      that.setDropKey(key);
			      that.setDropContext(context);
			      
			      that.fireDesignStudioPropertiesChanged(["dropId"]);
			      that.fireDesignStudioPropertiesChanged(["dropKey"]);
			      that.fireDesignStudioPropertiesChanged(["dropContext"]);
			      
				  that.fireDesignStudioEvent("onDrop");
			      
			      evt.stopPropagation();
			      
			      return false;
	       });
		};
		
		this._lLayout.addContent(oDrop);
	},
	
	createImageElement: function (iImageKey, iImageText, iImageUrl) {
		var that = this;
		
		// in case starts with http, keep as is 
		if(iImageUrl.indexOf("http") == 0) {
			// no nothing
		} else {
			// in case of repository, add the prefix from repository
			if(this._pImagePrefix != undefined && this._pImagePrefix != ""){
				iImageUrl = this._pImagePrefix + iImageUrl;
			} else {
				iImageUrl = this._ownScript + "DragDropArea.png";
			}
		}

		var oImage = new sap.ui.commons.TextView ({
			width : "120px",
			height : "30px",
			text : iImageText,
			tooltip : iImageText,
		});

		oImage.addStyleClass("scn-pack-DragDropArea-Image");
		
		oImage.internalKey = iImageKey;
		
		if(this.getSelectedKey() == iImageKey) {
			oImage.addStyleClass("scn-pack-DragDropArea-SelectedImage");
		}
		
		oImage.attachBrowserEvent('click', function() {
			that.setSelectedKey(oImage.internalKey);
			
			that.updateSelection(oImage.internalKey);
			
			that.fireDesignStudioPropertiesChanged(["selectedKey"]);
			that.fireDesignStudioEvent("onSelectionChanged");
			}
		);

		oImage.onAfterRendering = function () {
			var jqThis = this.$();
			jqThis.attr("draggable", "true");

			jqThis.bind('dragstart', function(evt) {
				evt.dataTransfer.setData('id', oImage.internalKey);
				evt.dataTransfer.setData('key', that.getDragKey());
				evt.dataTransfer.setData('context', that.getDragContext());
			});
		};
		
		return oImage;
	},
	
	updateSelection: function (iSelectedKey) {
		var lContent = this.getContent();
		
		for (var i = 0; i < lContent.length; i++) {
			var lImage = lContent [i];
			
			if(iSelectedKey == lImage.internalKey){
				lImage.addStyleClass("scn-pack-DragDropArea-SelectedImage");
			} else {
				lImage.removeStyleClass("scn-pack-DragDropArea-SelectedImage");
			};
		};
	}

});
})();