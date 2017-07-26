import React from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {getGroups} from '../../actions/groupsActions'
import {postGroups} from '../../actions/groupsActions'
import {deleteGroups} from '../../actions/groupsActions'
import {bindActionCreators} from 'redux'
import {Modal, FormControl, FormGroup, ControlLabel, ProgressBar, Thumbnail, Well, Grid, Col, Row, Button, Accordion, Panel} from 'react-bootstrap'

class GroupsList extends React.Component {
  constructor() {
    super()

    this.state = {
      showCreateGroupModal: false,
      showDeleteGroupModal: false
    }
  }

  componentDidMount(){
    //Dispatching actions
    this.props.getGroups()
  }

  closeCreateGroupModal() {
    this.setState({ showCreateGroupModal: false })
  }
  closeDeleteGroupModal() {
    this.setState({ showDeleteGroupModal: false })
  }

  openCreateGroupModal() {
    this.setState({ showCreateGroupModal: true })
  }
  openDeleteGroupModal() {
    this.setState({ showDeleteGroupModal: true })
  }

  handleSubmit() {
    const group = [{
      groupName: findDOMNode(this.refs.groupName).value,
      funds: []
    }]
    this.props.postGroups(group)
    this.setState({ showCreateGroupModal: false })
  }

  onDelete() {
    let groupId = findDOMNode(this.refs.deleteGroup).value
    this.props.deleteGroups(groupId)
    this.setState({ showDeleteGroupModal: false })
  }

  render() {
    const groupsList = this.props.groups.map(group => {
      return (
        <option key={group._id} value={group._id}>{group.groupName}</option>
      )
    })
    const groupPanels = this.props.groups.map(group => {
      const fundThumbnails = group.funds.map(fund => {
        return (
          <Thumbnail className ="col-md-3 col-sm-4 col-xs-9" key={fund._id} src="http://u55.mpmserv.co.uk/users/55/7877/blankImage.png" alt="242x200">
            <h3 className="fyundName">{fund.fundName}</h3>
            <h4 style={{textAlign: "center"}}>{fund.balance}/{fund.goal}</h4>
            <ProgressBar striped bsStyle={colorLogic(fund.balance, fund.goal)} active now={percentage(fund.balance, fund.goal)} />
            <p style={{textAlign: "center"}}>
              <Button bsStyle="danger">Delete</Button>
            </p>
          </Thumbnail>
        )
      })
      return (
        <Panel header={group.groupName} eventKey={group._id} key={group._id}>
          {fundThumbnails}
        </Panel>
      )
    })
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={9}>
            <Accordion>
              {groupPanels}
            </Accordion>

            <Button id="createGroup" onClick={this.openCreateGroupModal.bind(this)}>
              Create Group
            </Button><br/>
            <Modal show={this.state.showCreateGroupModal} onHide={this.closeCreateGroupModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Create Group</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="groupCreate">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Group Name"
                    ref="groupName" />
                </FormGroup>
                <Button onClick={this.handleSubmit.bind(this)} bsStyle="success">Create</Button>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeCreateGroupModal.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal>

            <Button id="deleteGroup" onClick={this.openDeleteGroupModal.bind(this)}>
              Delete Group
            </Button><br/>
            <Modal show={this.state.showDeleteGroupModal} onHide={this.closeDeleteGroupModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Group</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="groupDelete">
                  <ControlLabel>Select Group</ControlLabel>
                  <FormControl componentClass="select" ref="deleteGroup">
                    <option>Select</option>
                    {groupsList}
                  </FormControl>
                </FormGroup>
                <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete</Button>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeDeleteGroupModal.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal>

            <Button id="createFund">Create Fund</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function percentage(balance, goal) {
  return (balance / goal) * 100
}

function colorLogic(balance, goal) {
  if ((balance / goal) * 100 >= 66.66) {
    return "success"
  } else if ((balance / goal) * 100 >= 33.33) {
    return "warning"
  } else {
    return "danger"
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGroups: getGroups,
    postGroups: postGroups,
    deleteGroups: deleteGroups
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
