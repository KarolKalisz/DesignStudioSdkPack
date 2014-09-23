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

sap.ui.commons.layout.AbsoluteLayout.extend ("org.kalisz.karol.scn.constants.OpenWindowPost", {

	metadata: {
        properties: {
              "url": {type: "string"},
              "trigger": {type: "string"},
              "parameters": {type: "string"}
        }
	},

	initDesignStudio: function() {
		var that = this;
	},
	
	renderer: {},
	
	afterDesignStudioUpdate : function() {
		
		var lParameters = this.getParameters();
		
		if(this.getUrl() != "" && this.getTrigger() == "GO") {
			
			var newWindow = window.open(this.getUrl(), "Post Call");
			
			if (!newWindow) return false;
			
			var html = "";
			html += "<html><head></head><body><form id='formid' method='post' action='" + this.getUrl() +"'>";
			
			
			// read local created new Notifications
			if((lParameters != undefined || lParameters != undefined) && lParameters != "" && lParameters != "<delete>"){
				var lParametersArray = JSON.parse(lParameters);

				for (var i = 0; i < lParametersArray.length; i++) {
					html += "<input type='hidden' name='" + lParametersArray[i].name + "' value='" + lParametersArray[i].value + "'/>";
				}
			}
			
			html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</sc"+"ript></body></html>";

			newWindow.document.write(html);
		}

		
		// clean up the trigger
		this.setTrigger("");
		
		// fire event to rerender
		this.fireDesignStudioPropertiesChanged(["trigger"]);

	}

});
