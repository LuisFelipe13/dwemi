import React from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {getGroups} from '../../actions/groupsActions'
import {postGroups} from '../../actions/groupsActions'
import {deleteGroups} from '../../actions/groupsActions'
import {deleteFunds} from '../../actions/groupsActions'
import {postFunds} from '../../actions/groupsActions'
import {bindActionCreators} from 'redux'
import {Modal, FormControl, FormGroup, ControlLabel, ProgressBar, Thumbnail, Well, Grid, Col, Row, Button, Accordion, Panel, InputGroup} from 'react-bootstrap'

class GroupsList extends React.Component {
  constructor() {
    super()

    this.state = {
      showCreateGroupModal: false,
      showDeleteGroupModal: false,
      showCreateFundModal: false
    }
  }

  componentDidMount(){
    //Dispatching actions
    this.props.getGroups()
  }


  //MODAL BUTTON OPEN/CLOSE METHODS
  openCreateGroupModal() {
    this.setState({ showCreateGroupModal: true })
  }
  openDeleteGroupModal() {
    this.setState({ showDeleteGroupModal: true })
  }
  openCreateFundModal() {
    this.setState({ showCreateFundModal: true })
  }
  closeCreateGroupModal() {
    this.setState({ showCreateGroupModal: false })
  }
  closeDeleteGroupModal() {
    this.setState({ showDeleteGroupModal: false })
  }
  closeCreateFundModal() {
    this.setState({ showCreateFundModal: false })
  }



  handleSubmit() {
    const group = [{
      groupName: findDOMNode(this.refs.groupName).value,
      funds: []
    }]
    this.props.postGroups(group)
    this.setState({ showCreateGroupModal: false })
  }

  onGroupDelete() {
    let groupId = findDOMNode(this.refs.deleteGroup).value
    this.props.deleteGroups(groupId)
    this.setState({ showDeleteGroupModal: false })
  }

  onFundDelete(groupId, fundId) {
    this.props.deleteFunds(groupId, fundId)
  }
  onFundCreate() {
    let groupId = findDOMNode(this.refs.selectGroup).value
    let fundName = findDOMNode(this.refs.fundName).value
    let imageUrl = findDOMNode(this.refs.imageUrl).value
    let goal = findDOMNode(this.refs.goal).value
    let description = findDOMNode(this.refs.description).value
    this.props.postFunds([groupId, fundName, imageUrl, goal, description])
    this.setState({ showCreateFundModal: false })
  }

  render() {
    //List of all groups & List of all funds
    const groupsList = this.props.groups.map(group => {
      return (
        <option key={group._id} value={group._id}>{group.groupName}</option>
      )
    })
    const fundsList = this.props.groups.map(group => {
      let funds = group.funds.map(fund => {
        return (
          <option key={fund._id} value={fund._id}>{fund.fundName}</option>
        )
      })
      return funds
    })
    //Creating Group Panels and Thumbnail's for Funds below said panels
    const groupPanels = this.props.groups.map(group => {
      const fundThumbnails = group.funds.map(fund => {
        return (
          <Thumbnail className ="col-md-3 col-sm-4 col-xs-9" key={fund._id} src={fund.image} alt="242x200">
            <h3 className="fyundName">{fund.fundName}</h3>
            <h4 style={{textAlign: "center"}}>{fund.balance}/{fund.goal}</h4>
            <ProgressBar striped bsStyle={colorLogic(fund.balance, fund.goal)} active now={percentage(fund.balance, fund.goal)} />
            <p style={{textAlign: "center"}}>
              <Button onClick={this.onFundDelete.bind(this, group._id, fund._id)} bsStyle="danger">Delete</Button>
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
                <Button onClick={this.onGroupDelete.bind(this)} bsStyle="danger">Delete</Button>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeDeleteGroupModal.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal>

            <Button id="createFund" onClick={this.openCreateFundModal.bind(this)}>
              Create Fund
            </Button>
            <Modal show={this.state.showCreateFundModal} onHide={this.closeCreateFundModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Create Fund</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="fundDelete">
                  <ControlLabel>Select Group</ControlLabel>
                  <FormControl componentClass="select" ref="selectGroup">
                    <option>Select</option>
                    {groupsList}
                  </FormControl>
                  <ControlLabel>Fund Name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Couch, TV, Spring Break, etc"
                    ref="fundName" />
                  <ControlLabel>Image URL</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="www.example.com/image/1.png"
                    ref="imageUrl" />
                  <ControlLabel>Monetary Goal</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl
                      type="text"
                      placeholder="000.00"
                      ref="goal"/>
                  </InputGroup>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Describe the fund here"
                    ref="description" />
                </FormGroup>
                <Button onClick={this.onFundCreate.bind(this)} bsStyle="success">Create</Button>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeCreateFundModal.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal>
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
    deleteGroups: deleteGroups,
    deleteFunds: deleteFunds,
    postFunds: postFunds
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
