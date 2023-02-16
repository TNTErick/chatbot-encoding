const g$ = go.GraphObject.make;

const init = () => {
  //const canvas = document.getElementById('canvas');

  myDiagram = g$(go.Diagram, "my-diagram");
  nodes = [
    { items: [{type:'wait', content:'3s'}] },
    { items: [] }
  ];
  links = [
    { from: "-2", to: "-1" }
  ];

  myDiagram.nodeTemplate = g$(go.Node, "Spot", {},
    //border shape
    g$(go.Shape, "RoundedRectangle", { fill: "white" }),

    //Title
    g$(go.TextBlock,
      {
        alignment: go.Spot.Top,
        alignmentFocus: go.Spot.Top,
        editable: true,
        background: 'lightgray'
      },
      new go.Binding("text", "key")
    ),

    //contents
    g$(go.Panel, "Vertical", { background: 'lightgray' },
      new go.Binding("itemArray", 'items'),
      {
        itemTemplate:
          g$(go.Panel,'Auto',
            {
              toolTip:
                g$('ToolTip'),
              
            },
            g$(go.Panel,'Horizontal',
              g$(go.TextBlock, '', {margin:5}, new go.Binding('text','type')),
              g$(go.TextBlock, '', {editable:true}, new go.Binding('text','content'))
            )
          )
      }
    ),


    //bottomright node that can be linked from.
    g$(
      go.Panel,
      {
        portId: 'from',
        fromLinkable: true,
        fromMaxLinks: 1,
        alignment: go.Spot.BottomRight,
        alignmentFocus: go.Spot.BottomRight,
        fromSpot: go.Spot.BottomRight,
        fromLinkableDuplicates: false
      },
      g$(go.Shape, 'Ellipse', {
        desiredSize: new go.Size(10, 10),
        fill: 'transparent'
      })
    ),


    //top left node that can be linked to.
    g$(
      go.Panel,
      {
        portId: 'to',
        alignment: go.Spot.TopLeft,
        alignmentFocus: go.Spot.TopLeft,
        toSpot: go.Spot.TopLeft,
        toMaxLinks: Infinity,
        toLinkable: true,
        toSpot: go.Spot.TopLeft,
        toLinkableDuplicates: true
      },
      g$(
        go.Shape,
        'Ellipse',
        {
          desiredSize: new go.Size(10, 10),
          fill: 'transparent',
        }
      )
    )
  );

  myDiagram.linkTemplate = g$(
    go.Link, {relinkableTo: true, relinkableFrom: true, routing: go.Link.Orthogonal, curve: go.Link.Bezier},
    g$(go.Shape, {strokeWidth:1}),
    g$(go.Shape, {toArrow: 'Standard'})
    );

  myDiagram.model = new go.GraphLinksModel(nodes, links);
};


const save = () => {
  myDiagram;
}