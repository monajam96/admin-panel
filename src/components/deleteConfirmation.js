import { useState } from "react"
import { Button, Modal } from 'react-bootstrap';
import { Trash } from "react-bootstrap-icons";
import http from "./utils/interceptor";
export default function DeleteConfirmation ({itemId, endpoint, refreshData}) {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const deleteItem = (itemId) => {
    setLoading(true)
    http
    .delete(`${endpoint}/${itemId}`)
    .then(() => {
      setModal(false)
      refreshData(itemId)
    })
    .catch((error) => {
      console.error("There was an error!", error);
    }).finally(() => {
      setLoading(false)
    })
  }
  return <>
    <Button
      variant="danger"
      size="sm"
      onClick={() => setModal(true)}
      style={{ margin: 10 }}
    >
      <Trash/>
    </Button>


    <Modal show={modal} onHide={() => setModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to remove this item?</Modal.Body>
      <Modal.Footer className="d-flex">
        <Button variant="secondary" className="flex-grow-1" onClick={() => setModal(false)}>
          Never mind
        </Button>
        <Button variant="danger" className="flex-grow-1" disabled={loading} onClick={() => deleteItem(itemId)}>
          Delete Now!!
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}