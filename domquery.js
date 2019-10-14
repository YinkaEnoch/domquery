(function(window){
  'use strict';
  // Library function constructor
  function domQuery(){
    function domElement(element){
      this.element = (element instanceof HTMLElement) ? element : document.querySelector(element);
    }
    // Get element text content
    domElement.prototype.getText = function(){
      this.text = this.element.textContent;
      return this.text;
    }
    // Remove element text content
    domElement.prototype.removeText = function(){
      this.element.textContent='';
      return this;
    }
    // Set the element text content
    domElement.prototype.setText = function(newText){
      this.element.textContent = newText;
      return this;
    }
    // Set the element innerHTML
    domElement.prototype.htmlText = function(text){
      this.element.innerHTML = text;
      return this;
    }
    // Add a single class
    domElement.prototype.addClass = function (newClass) {
      this.element.classList.add(newClass);
      return this;
    }
    // Add multiple classes
    domElement.prototype.addClasses = function (newClasses) {
      let that = this;
      newClasses.forEach(function(className){
        that.addClass(className);
      });
      return this;
    }
    // Remove a single class
    domElement.prototype.removeClass = function (className) {
      this.element.classList.remove(className);
      return this;
    }
    // Remove multiple classes
    domElement.prototype.removeClasses = function (classNames) {
      let that = this;
      classNames.forEach(function(className){
        that.removeClass(className);
      });
      return this;
    }
    // Add attributes
    domElement.prototype.addAttr = function (attrs) {
      for (let attr in attrs) {
        if(attrs.hasOwnProperty(attr)){
          this.element.setAttribute(attr,attrs[attr]);
        }
      }
      return this;
    }
    // Remove attributes
    domElement.prototype.removeAttr = function (attrs) {
      for (let attr of attrs) {
        if(this.element.hasAttribute(attr)){
          this.element.removeAttribute(attr);
        }
      }
      return this;
    }
    // Add a single child element
    domElement.prototype.addChild = function (childElement) {
      // Create child element
      if(childElement.type){
        this.newChild = (childElement.type instanceof HTMLElement) ? childElement.type : document.createElement(childElement.type);
      }
      // Add Text 
      if(childElement.text){
        this.newChild.textContent = childElement.text;   
      }
      // Append ID
      if(childElement.id){
        this.newChild.id = childElement.id;
      }
      // Append Classes
      if(childElement.classes){
        let that = this;
        childElement['classes'].forEach(classItem => that.newChild.classList.add(classItem));
      }
      // Append other attributes
      if(childElement.otherAttr){
        for(let attr in childElement.otherAttr){
          if(childElement.otherAttr.hasOwnProperty(attr)) this.newChild.setAttribute(attr,childElement['otherAttr'][attr]);
        }
      }
      // Append Inline styles
      if(childElement.inlineStyles){
        for(let style in childElement.inlineStyles){
          if(childElement.inlineStyles.hasOwnProperty(style)){
            this.newChild.style[style] = childElement.inlineStyles[style];
          }
        }
      }
      // Append HTML entities
      if(childElement.html){
        this.newChild.innerHTML = childElement.html;
      }
      // Append Child
      this.element.appendChild(this.newChild);
      return this;
    }
    // Add multiple children elements
    domElement.prototype.addChildren = function (childrenElements) {
      let that = this;
      childrenElements.forEach(function(childElement){
        that.addChild(childElement);
      });
      return this;
    }
    // Remove a single child element
    domElement.prototype.removeChild = function (childElement) {
      this.childNode = (childElement instanceof HTMLElement) ? childElement : document.querySelector(childElement);
      this.element.removeChild(this.childNode);
      return this;
    }    
    // Remove multiple children elements
    domElement.prototype.removeChildren = function (childrenNodes) {
      let that = this;
      childrenNodes.forEach(function(childNode){
        that.removeChild(childNode);
      });
      return this;
    }
    // Add inline styles to the element
    domElement.prototype.addStyle = function (styles) {
      for (let style in styles) {
        if(styles.hasOwnProperty(style)){
          this.element.style[style] = styles[style];
        }
      }
      return this;
    }
    // Remove an inline style from the element
    domElement.prototype.removeStyle = function (style) {
      this.element.style[style] = '';
      return this;
    }
    // Remove multiple inline styles from the element
    domElement.prototype.removeStyles = function (styles) {
      for (let style of styles) {
        this.removeStyle(style);
      }
      return this;
    }

    // Add Event Listener
    domElement.prototype.on = function (ev,callback,bool) {
      bool = bool || false;
      if(typeof callback === 'function') {
        callback = callback 
      } else {return this;}
      this.element.addEventListener(ev,callback,bool);
      return this;
    }
    // remove Event Listener
    domElement.prototype.off = function (ev,callback,bool) {
      bool = bool || false;
      if(typeof callback === 'function') {
        callback = callback 
      } else {return this;}
      this.element.removeEventListener(ev,callback,bool);
      return this;
    }
    return (function(selector){
      return new domElement(selector);
    });
  }
  // Make the library/function globally accessible
  if(typeof(window.domQuery) === 'undefined'){
    window.domQuery = domQuery();
    // Expose the library methods through a $ symbol
    if(typeof (window.$) === 'undefined'){
      window.$ = window.domQuery;
    } else{
      return false;
    }
  }
})(window); // The window object is passed into my function
