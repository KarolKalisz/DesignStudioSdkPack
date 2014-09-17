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

jQuery.sap.require("sap.ui.commons.RangeSlider");

var org_kalisz_karol_scn_pack_DateRangeSlider_resourcePrefix = "res/drs/";
var org_kalisz_karol_scn_pack_DateRangeSlider_lastScriptCalled = $("script:last");
var org_kalisz_karol_scn_pack_DateRangeSlider_fullUrlOfLastScriptCalled = org_kalisz_karol_scn_pack_DateRangeSlider_lastScriptCalled.attr("src");
var org_kalisz_karol_scn_pack_DateRangeSlider_cutIndexOnMainEntryPoint = org_kalisz_karol_scn_pack_DateRangeSlider_fullUrlOfLastScriptCalled.indexOf(org_kalisz_karol_scn_pack_DateRangeSlider_resourcePrefix);
var org_kalisz_karol_scn_pack_DateRangeSlider_accessUrlForRes = org_kalisz_karol_scn_pack_DateRangeSlider_fullUrlOfLastScriptCalled.substring(0, org_kalisz_karol_scn_pack_DateRangeSlider_cutIndexOnMainEntryPoint) + org_kalisz_karol_scn_pack_DateRangeSlider_resourcePrefix;

sap.ui.commons.RangeSlider.extend("org.kalisz.karol.scn.selectors.DateRangeSlider", {

	/**
	 * minimum Date of the Slider
	 */
	setMinimumDate : function (
			/** minimum date */
			minimumDate) {
		this._MinimumDate = minimumDate;
	},

	/**
	 * Returns minimum Date of the Slider
	 */
	getMinimumDate : function () {
		return this._MinimumDate;
	},

	/**
	 * maximum Date of the Slider
	 */
	setMaximumDate : function (
			/** maximum date */
			maximumDate) {
		this._MaximumDate = maximumDate;
	},

	/**
	 * Returns maximum Date of the Slider
	 */
	getMaximumDate : function () {
		return this._MaximumDate;
	},

	/**
	 * low selection date of the Slider
	 */
	setLowSelectedDate : function (
			/** low selection date */
			lowSelectedDate) {
		this._LowSelectedDate = lowSelectedDate;
	},

	/**
	 * Returns low selection date of the Slider
	 */
	getLowSelectedDate : function () {
		return this._LowSelectedDate;
	},

	/**
	 * high selection date of the Slider
	 */
	setHighSelectedDate : function (
			/** high selection date */
			highSelectedDate) {
		this._HighSelectedDate = highSelectedDate;
	},

	/**
	 * Returns high selection date of the Slider
	 */
	getHighSelectedDate : function() {
		return this._HighSelectedDate;
	},
	
	initDesignStudio: function() {
		var that = this;
		
	},
	
	renderer: {},
	
	afterDesignStudioUpdate : function() {
		var that = this;
		
		var min = this.getMinimumDate();
		var max = this.getMaximumDate();
		var value1 = this.getLowSelectedDate();
		var value2 = this.getHighSelectedDate();
		
		var t = 1;
	}

});