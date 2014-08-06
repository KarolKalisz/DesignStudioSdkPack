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

jQuery.sap.require("sap.ui.ux3.NotificationBar");

sap.ui.ux3.NotificationBar.extend("org.kalisz.karol.scn.pack.NotificationBar", {

	setCategories : function(value) {
		if(this._Categories == value) {
			return;
		} else {
			this._Categories = value;
		}
	},

	getCategories : function() {
		return this._Categories;
	},
	
	setNotifications : function(value) {
		if(this._Notifications == value) {
			return;
		} else {
			this._Notifications = value;
		}
	},

	getNotifications : function() {
		return this._Notifications;
	},
	
	setDefaultImage : function(value) {
		if(this._DefaultImage == value) {
			return;
		} else {
			this._DefaultImage = value;
		}
	},

	getDefaultImage : function() {
		return this._DefaultImage;
	},
	
	setConnectToCommonMessages : function(value) {
		if(this._ConnectToCommonMessages == value) {
			return;
		} else {
			this._ConnectToCommonMessages = value;
		}
	},

	getConnectToCommonMessages : function() {
		return this._ConnectToCommonMessages;
	},
	
	setSplitNotificationsByPriority : function(value) {
		if(this._SplitNotificationsByPriority == value) {
			return;
		} else {
			this._SplitNotificationsByPriority = value;
		}
	},

	getSplitNotificationsByPriority : function() {
		return this._SplitNotificationsByPriority;
	},
	
	setShowOnNewNotifications : function(value) {
		if(this._ShowOnNewNotifications == value) {
			return;
		} else {
			this._ShowOnNewNotifications = value;
		}
	},

	getShowOnNewNotifications : function() {
		return this._ShowOnNewNotifications;
	},
	
	setDeleteNotificationOnClick : function(value) {
		if(this._DeleteNotificationOnClick == value) {
			return;
		} else {
			this._DeleteNotificationOnClick = value;
		}
	},

	getDeleteNotificationOnClick : function() {
		return this._DeleteNotificationOnClick;
	},
	
	setRemoveAllOnMinimize : function(value) {
		if(this._RemoveAllOnMinimize == value) {
			return;
		} else {
			this._RemoveAllOnMinimize = value;
		}
	},

	getRemoveAllOnMinimize : function() {
		return this._RemoveAllOnMinimize;
	},
	
	/* END OF SETTERS / GETTERS */
	
	renderer: {},

	initDesignStudio : function() {
		var that = this;
		
		this._pAccessPath = sapbi_page.staticMimeUrlPrefix + "zen/mimes/sdk_include/org.kalisz.karol.scn.pack/res/nb/";
		
		this._oCommonNotifier = new sap.ui.ux3.Notifier({
			title : "Common Notifications",
			icon: this._pAccessPath + "scat_public.png"
		});
		
		this._oPrivateNotifier = new sap.ui.ux3.Notifier({
			title : "Private Notifications",
			icon : this._pAccessPath + "scat_private.png"
		});
		
		this._oErrorNotifier = new sap.ui.ux3.Notifier({
			title : "Eror Notifications",
			icon : this._pAccessPath + "s_error.png"
		});

		this._oWarningNotifier = new sap.ui.ux3.Notifier({
			title : "Warning Notifications",
			icon : this._pAccessPath + "s_warning.png"
		});

		this._oInfoNotifier = new sap.ui.ux3.Notifier({
			title : "Information Notifications",
			icon : this._pAccessPath + "s_info.png"
		});

		this.__notifiersInitialized = false;
		
		this._oClickListener = function (oEvent) {
			var oNotification = oEvent.getParameter("Notification");
			var oNotifier = oEvent.getParameter("notifier");
			
			if(that.DeleteNotificationOnClick) {
				oNotifier.removeNotification(oNotification);			
			}
			// alert("Notification selected: " + oNotification.getText());
		};
		
		this._oResizeListener = function (oEvent) {
			var bShow = oEvent.getParameter("status");
			
			if (bShow == "Min" && that.RemoveAllOnMinimize) {
				this._oErrorNotifier.destroyMessages();
				this._oErrorNotifier.removeAllMessages();
				this._oWarningNotifier.destroyMessages();
				this._oWarningNotifier.removeAllMessages();
				this._oInfoNotifier.destroyMessages();
				this._oInfoNotifier.removeAllMessages();
				this._oPrivateNotifier.destroyMessages();
				this._oPrivateNotifier.removeAllMessages();
				this._oCommonNotifier.destroyMessages();
				this._oCommonNotifier.removeAllMessages();
			}
		};
		
		this._oCommonNotifier.attachMessageSelected(this._oClickListener);
		this._oPrivateNotifier.attachMessageSelected(this._oClickListener);
		this._oErrorNotifier.attachMessageSelected(this._oClickListener);
		this._oWarningNotifier.attachMessageSelected(this._oClickListener);
		this._oInfoNotifier.attachMessageSelected(this._oClickListener);
	},
	
	afterDesignStudioUpdate : function() {
		// reset new Notifications flag
		this._pNewNotificationsAvailable = false;
		
		// 
		if(!this.__notifiersInitialized) {
			if(this._SplitNotificationsByPriority) {
				this.addNotifier(this._oErrorNotifier);
				this.addNotifier(this._oWarningNotifier);
				this.addNotifier(this._oInfoNotifier);
			} else {
				this.addNotifier(this._oPrivateNotifier);
				this.addNotifier(this._oCommonNotifier);
			}

			this.attachResize(this._oResizeListener);
			
			this.__notifiersInitialized = true;
		}
		
		// read local created new Notifications
		var newNotifications = this._Notifications;
		if((newNotifications != null || newNotifications != undefined) && newNotifications != ""){
			var NotificationsArray = JSON.parse(newNotifications);

			if(NotificationsArray.length > 0) {
				this._pNewNotificationsAvailable = true;
			}
			
			for (var i = 0; i < NotificationsArray.length; i++) {
				
				var time = new Date();
				var now = time.toLocaleDateString() + ", " + time.toLocaleTimeString();

				var text = NotificationsArray[i].text;
				
				if(NotificationsArray[i].key != null && NotificationsArray[i].key != "") {
					text = text + " [" + NotificationsArray[i].key + "]";
				}
				
				if(NotificationsArray[i].category != null && NotificationsArray[i].category != "") {
					text = NotificationsArray[i].category + ": " + text;
				}

				var oNotification = new sap.ui.core.Message({
					text : text,
					timestamp : now
				});

				var potentialPriorityNotifier = null;
				
				switch (NotificationsArray[i].level) {
				case "SUCCESS":
					oNotification.setLevel(sap.ui.core.MessageType.Success);
					oNotification.setIcon(this._pAccessPath + "s_success.png");
					potentialPriorityNotifier = this._oInfoNotifier;
					break;
				case "INFO":
					oNotification.setLevel(sap.ui.core.MessageType.Information);
					oNotification.setIcon(this._pAccessPath + "s_info.png");
					potentialPriorityNotifier = this._oInfoNotifier;
					break;
				case "WARNING":
					oNotification.setLevel(sap.ui.core.MessageType.Warning);
					oNotification.setIcon(this._pAccessPath + "s_warning.png");
					potentialPriorityNotifier = this._oWarningNotifier;
					break;
				case "ERROR":
				default:
					oNotification.setLevel(sap.ui.core.MessageType.Error);
					oNotification.setIcon(this._pAccessPath + "s_error.png");
					potentialPriorityNotifier = this._oErrorNotifier;
					break;
				}
				
				if(!this._SplitNotificationsByPriority) {
					this._oPrivateNotifier.addMessage(oNotification);
				} else {
					potentialPriorityNotifier.addMessage(oNotification);
				}
			}
		}
		
		// clean up
		this._Notifications = "";
		
		// fire event to rerender
		this.fireDesignStudioPropertiesChanged(["Notifications"]);

		if(!this._pInitilized) {
			if(this._ConnectToCommonMessages) {
				// register to normal handler
				this.registerToMessageHandler();
			}
			
			this._pInitilized = true;
		}
		
		if(this._ShowOnNewNotifications && this._pNewNotificationsAvailable && !this._ConnectToCommonMessages) {
			this.setVisibleStatus(sap.ui.ux3.NotificationBarStatus.Default);
		}
	},
	
	/* ACCESS TO MESSAGE HANDLER (not an official API) */
	
	registerToMessageHandler : function () {
		var that = this;
		
		this._oMessageBarHandler = sap.zen.Dispatcher.instance.getHandlers("messageview")[0];
		if (this._oMessageBarHandler) {
			this._oMessageBarHandler.setMessagePosition = function () {
				that.fillInAllCommonMessages();
			};
		}
	},
	
	fillInAllCommonMessages : function (){
		// pass the official Messages from MessageHandler Model
		var MessagesModel= sap.zen.MessageViewHandler.JSMessageHandler.oDataModel;
		
		if(MessagesModel) {
			var dataObject = MessagesModel.oDataObject;
			if(dataObject) {
				
				var MessageData = dataObject.data;
				if(MessageData) {

					if(MessageData.length > 0) {
						this._pNewNotificationsAvailable = true;
					}
					
					for (var i = 0; i < MessageData.length; i++) {
						// var id = NotificationData[i].Notification.id;
						var short = MessageData[i].message.short_text;
						var long = MessageData[i].message.long_text;
						var level = MessageData[i].message.level;
						
						var time = new Date();
						var now = time.toLocaleDateString() + ", " + time.toLocaleTimeString();
						
						var text = short;
						
						if(long != undefined && long != "") {
							text = text + " - " + long;
						}
						
						var oNotification = new sap.ui.core.Message({
							text : text,
							timestamp : now
						});
						
						var potentialPriorityNotifier = null;
						
						if(level == "SUCCESS") {
							oNotification.setLevel(sap.ui.core.MessageType.Success);
							oNotification.setIcon(this._pAccessPath + "s_success.png");
							potentialPriorityNotifier = this._oInfoNotifier;
						} else if(level == "INFO") {
							oNotification.setLevel(sap.ui.core.MessageType.Information);
							oNotification.setIcon(this._pAccessPath + "s_info.png");
							potentialPriorityNotifier = this._oInfoNotifier;
						} else if(level == "WARNING") {
							oNotification.setLevel(sap.ui.core.MessageType.Warning);
							oNotification.setIcon(this._pAccessPath + "s_warning.png");
							potentialPriorityNotifier = this._oWarningNotifier;
						} else if(level == "ERROR") {
							oNotification.setLevel(sap.ui.core.MessageType.Error);
							oNotification.setIcon(this._pAccessPath + "s_error.png");
							potentialPriorityNotifier = this._oErrorNotifier;
						} else {
							oNotification.setLevel(sap.ui.core.MessageType.Error);
							oNotification.setIcon(this._pAccessPath + "s_error.png");
						}
						
						if(!this._SplitNotificationsByPriority) {
							this._oCommonNotifier.addMessage(oNotification);
						} else {
							potentialPriorityNotifier.addMessage(oNotification);
						}
					}
				}
			}
			
			MessagesModel.removeAll();
		}
		
		if(this._ShowOnNewNotifications && this._pNewNotificationsAvailable && this._ConnectToCommonMessages) {
			this.setVisibleStatus(sap.ui.ux3.NotificationBarStatus.Default);
		}
	}
});