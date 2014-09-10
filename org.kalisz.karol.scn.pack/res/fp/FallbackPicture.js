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

jQuery.sap.require("sap.ui.commons.Image");

// 1.0.0, implemented as in http://scn.sap.com/message/15268917#15268917
// 1.0.1, avoid collisions on global variables - later needs to implement the other way as in thread http://scn.sap.com/community/businessobjects-design-studio/blog/2014/08/15/sdk-tips-and-tricks-resources-and-images

var org_kalisz_karol_scn_pack_FallbackPicture_lastScriptCalled = $("script:last");
var org_kalisz_karol_scn_pack_FallbackPicture_fullUrlOfLastScriptCalled = org_kalisz_karol_scn_pack_FallbackPicture_lastScriptCalled.attr("src");
var org_kalisz_karol_scn_pack_FallbackPicture_cutIndexOnMainEntryPoint = org_kalisz_karol_scn_pack_FallbackPicture_fullUrlOfLastScriptCalled.indexOf("res/nb/");
var org_kalisz_karol_scn_pack_FallbackPicture_accessUrlForRes = org_kalisz_karol_scn_pack_FallbackPicture_fullUrlOfLastScriptCalled.substring(0, org_kalisz_karol_scn_pack_FallbackPicture_cutIndexOnMainEntryPoint) + "res/nb/";

sap.ui.commons.Image.extend("org.kalisz.karol.scn.pack.FallbackPicture", {

	setPicture : function(value) {
		if(this._Picture == value) {
			return;
		} else {
			this._Picture = value;
		}
	},

	getPicture : function() {
		return this._Picture;
	},
	
	setFallbackPicture : function(value) {
		if(this._FallbackPicture == value) {
			return;
		} else {
			this._FallbackPicture = value;
		}
	},

	getFallbackPicture : function() {
		return this._FallbackPicture;
	},
	
	renderer: {},
	
	afterDesignStudioUpdate : function() {
		// need to check if the requested picture exists
		
		var that = this;
		
		var requestForPicture = new XMLHttpRequest();
	    
		requestForPicture.onreadystatechange = function() {
			// check status and react
			if (requestForPicture.readyState == 4){
				var imageToLoad = undefined;
				
				// sometimes it gets 200 without content
				if(requestForPicture.status == 404 || requestForPicture.responseUrl == "" || requestForPicture.response == "") {
					imageToLoad = that.getFallbackPicture();
				} else {
					imageToLoad = that.getPicture();
				};
				
				that.setSrc(imageToLoad);
			};
		};
		
		// trigger ajax request
		var pictureUrl = this.getPicture();
		
		// just a check if there is some picture at all
		if(pictureUrl != undefined && pictureUrl != "") {
			requestForPicture.open("GET", this.getPicture(), true);
			requestForPicture.send();
		}
	}

});