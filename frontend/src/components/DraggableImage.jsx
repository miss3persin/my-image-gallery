import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const DraggableImage = ({ image }) => {
    const [, ref] = useDrag({
      type: 'IMAGE',
      item: { image },
    });
  
    return (
      <div ref={ref} draggable={true} onDragStart={() => setDraggedItem(image)}>
        {/* ... rest of your component */}
      </div>
    );
  };


  export default DraggableImage