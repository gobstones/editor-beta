"use strict";

Polymer({
  is: 'save-and-load',
  properties: {
    language: { value: "es" }
  },

  save: function save() {
    this.fire("save");
  },

  load: function load() {
    this.fire("load");
  }
});