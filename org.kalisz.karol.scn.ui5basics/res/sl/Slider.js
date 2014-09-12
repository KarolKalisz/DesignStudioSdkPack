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

sap.ui.commons.Slider.extend("org.kalisz.karol.scn.ui5basics.Slider", {
	
	initDesignStudio: function() {
		var that = this;
		
		this.attachChange(function() {
			var value = that.getValue();
			
			var updateRequired = false;
			if(that._SavedValue == undefined) {
				that._SavedValue = value;
				updateRequired = true;
			}
			
			if(!updateRequired && that._SavedValue != value) {
				updateRequired = true;
			}

			if(updateRequired) {
				that.fireDesignStudioPropertiesChanged(["value"]);
				that.fireDesignStudioEvent("onChange");
			}
		});
	},
	
	renderer: {},
		
	afterDesignStudioUpdate: function() {
		// empty for now
	}
});