const targetNode = document.body;

const config = {attributes: true, childList: true, subtree: true};

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    //Check is mutation works with DOM elements
    if (mutation.type === 'childList') {
      //Check is some nodes was added
      if (mutation.addedNodes !== undefined && mutation.addedNodes.length === 1) {
        //Take first added node
        let addedNode = mutation.addedNodes[0];
        if (addedNode.classList !== undefined && addedNode.classList.length > 0) {
          //Take classes of first added node
          let classList = addedNode.classList;
          if (classList.contains("ui-menu") && classList.contains("ui-widget") && classList.contains("ui-widget-content")) {
            //Check classes of added node's first child
            if (addedNode.firstChild !== undefined && addedNode.firstChild !== null) {
              if (addedNode.firstChild.classList.length > 0) {
                if (addedNode.firstChild.classList.contains("zen_mention-menu-item")) {
                  //Remove node if all checks were passed
                  addedNode.parentNode.removeChild(addedNode);
                }
              }
            }
          } else if (classList.contains("tribute-container")) {
            //Redmine ccnpp may have another container
            if (addedNode.firstChild !== undefined && addedNode.firstChild !== null) {
              if (addedNode.firstChild.tagName === "UL") {
                //Remove node if all checks were passed
                addedNode.parentNode.removeChild(addedNode);
              }
            }
          }
        }
      }
    }
  }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);
