import { Dispatch, FC, useRef } from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/input/Input";
import { RootState } from "../../../redux/app/store";
import { Element } from "../../../utils/types";
import styles from "../generateFormPage.module.scss";
import { FiEdit2 } from "react-icons/fi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlineDrag } from "react-icons/ai";
import { SetStateAction } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../../utils/constants";
import type { Identifier, XYCoord } from "dnd-core";

export interface dragInputProps {
  id: any;
  element: Element;
  index: number;
  setElementEdit: Dispatch<SetStateAction<Element>>;
  setFormElements: Dispatch<SetStateAction<Element[]>>;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DragInput: FC<dragInputProps> = ({
  setElementEdit,
  element,
  index,
  id,
  moveCard,
  setFormElements,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);

  const handleEdit = (element: Element): void => {
    setElementEdit(element);
  };

  const handleDelete = (): void => {
    setFormElements((old: Element[]) => {
      const index = old.findIndex((ele: Element) => ele.id === element.id);

      if (index !== -1) {
        const newElements = [...old];
        newElements.splice(index, 1);
        return newElements; // Return the updated array
      } else return old; // Return the updated array
    });
  };
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div className={styles[theme]}>
      <div
        className={styles.elementCard}
        data-handler-id={handlerId}
        ref={ref}
        style={{ opacity }}
      >
        <button>
          <AiOutlineDrag />
        </button>
        {element.type === "select" ? (
          <select
            style={{
              backgroundColor: element.style.backgroud,
              color: element.style.color,
              border: `2px solid ${element.style.borderColor}`,
              fontSize: +element.style.fontSize,
              borderRadius: +element.style.borderRadius,
              padding: 10,
            }}
            id={element.id}
          >
            <option key={index} value={element.name}>
              {element.name}
            </option>
            {element.options?.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <Input element={element} />
        )}
        <button onClick={() => handleEdit(element)}>
          <FiEdit2 />
        </button>
        <button onClick={handleDelete}>
          <IoMdRemoveCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default DragInput;
