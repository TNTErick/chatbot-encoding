const g$ = go.GraphObject.make;

const init = () => {
  //const canvas = document.getElementById('canvas');

  myDiagram = g$(go.Diagram, "my-diagram");
  nodes = [{ key: "ㄅ" }, { key: "ㄆ" }];
  links = [{ from: "ㄅ", to: "ㄆ" }];
  
  myDiagram.nodeTemplate = 
    g$( go.Node, "Auto", {},
        g$(go.Shape, "RoundedRectangle", { fill: "white" }),
        g$(go.Panel, "Vertical", {}, 
           
           g$(go.Panel, 'Horizontal', {}, 
              g$(go.TextBlock,{margin:5, editable: true}, new go.Binding("text", "key")),
              g$('Button', {click:()=>{}}, g$(go.TextBlock, 'X'))
             ),
             
           g$('Button', g$(go.TextBlock, '+'))
          )
      );
  
  myDiagram.model = new go.GraphLinksModel(nodes, links);
};

//替代 jQuery 的 $(document).ready(init)
document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
    init();
  },
  false
);
