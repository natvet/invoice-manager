import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const ModalComponent = (props) => (
  <Modal open={props.open} basic size='small' onClose={props.onCancel}>
    <Modal.Content>
      <p>Are you sure you want to delete selected invoices?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={props.onCancel}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted onClick={props.onConfirm}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalComponent