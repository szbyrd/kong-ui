/*
 @license
 Copyright (c) 2015 Mike Saraf. All rights reserved.
 This code may only be used under the BSD style license found in the included file LICENSE.md
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  var app = document.querySelector('#app');

  /*-- Models --*/

  app.APIModel = function() {
    this.id = null;
    this.name = "";
    this.public_dns = "";
    this.path = "";
    this.strip_path = false;
    this.target_url = "";
    this.preserve_host = false;
    this.created_at = "";
  };

  /*-- Common Data & State vars --*/
  app.drawerSelected = 0;
  app.apis;
  app.selectedAPI;

  app.consumers;
  app.plugins;

  app.addAPI = function(e) { page('/apis/new'); };
  app.addConsumer = function(e) { page('/addConsumer'); };

  /*-- on-tap methods --*/

  app.routeChange = function(e) {
    var route = e.currentTarget.href.replace(/.*#!/, "");
    console.log("Drawer Menu Selected: " + route);
    page(route);
  };

  app.apiListClick = function(e) {
    console.log("api clicked: " + e.currentTarget.id);
    // Get Item Object
    // Clear Editor Container
    // Insert new editor container
    // Load Item Object
    // Display Page
    this.selectedAPI = this.apis.data[e.currentTarget.id];
    page("/apis/" + this.apis.data[e.currentTarget.id].name);
  };

  app.consumerListClick = function(e) {
    console.log("consumer clicked: " + e.currentTarget.id);
    //page("/consumers/" + e.currentTarget.id);
  };

  app.pluginListClick = function(e) {
    console.log("plugin clicked: " + e.currentTarget.id);
    //page("/plugins/" + e.currentTarget.id);
  };

  /*-- Event Listeners --*/
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    app.$.ajaxAPI.url = app.settings.servers[0].address + "/apis";
    app.$.ajaxConsumers.url = app.settings.servers[0].address + "/consumers";
    app.$.ajaxPlugins.url = app.settings.servers[0].address + "/plugins";
  });

  /*-- Internals Below --*/

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');



  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('.app-name');
    var middleContainer = document.querySelector('.middle-container');
    var bottomContainer = document.querySelector('.bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = this.$.paperDrawerPanel; //document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

})(document);
