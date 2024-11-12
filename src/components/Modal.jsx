import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, onOPen, open }) {
  if (!open) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onOPen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOPen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
