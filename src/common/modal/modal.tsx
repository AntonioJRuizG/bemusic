import { usePagination } from "../hooks/pagination.hook/use.pagination.hook";
import style from "./modal.style.module.scss";

type ModalProps = {
  showModal: boolean;
  customFunction: () => void;
  handleModal: (arg: boolean) => void;
};

export default function Modal({
  showModal,
  customFunction,
  handleModal,
}: ModalProps) {
  const { loadCurrentPage } = usePagination();

  const handleCancelClick = () => {
    handleModal(false);
  };

  const handleDelete = () => {
    handleModal(false);
    customFunction();
    loadCurrentPage();
  };

  return (
    <>
      {showModal ? (
        <div className={style.modalContainer}>
          <div className={style.modalBox}>
            <p className={style.modalText}>Do you really want to delete?</p>

            <div className={style.modalButtons}>
              <button
                className={style.button + " " + style.modalProceedButton}
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className={style.button + " " + style.modalCancelButton}
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
