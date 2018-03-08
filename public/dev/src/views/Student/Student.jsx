import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
    Alert, Card, CardTitle, CardBody, CardHeader, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
// react plugin for creating notifications over the dashboard
import NotificationAlert from 'react-notification-alert';

import { PanelHeader, Button } from 'components';

const base_url = "http://localhost/now-cms3/public/api/";

class Student extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            students:[],

            modal:false,
            
            delete_id:'',

            is_loading:false,

            current_page:'',
            last_page:'',
            active_page:1
        };

        this.get_data = this.get_data.bind(this);
        this.toggle_modal = this.toggle_modal.bind(this);
        this.delete = this.delete.bind(this);
        this.paginate = this.paginate.bind(this);
    }
    componentDidMount(){
        this.get_data();
    }

    toggle_modal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    get_data(page=null){
        var instance = this;
        instance.setState({is_loading:true});
        axios.get(base_url + 'student?page=' + page)
        .then(function (response) {
            console.log(response);
            if (response.data.success == true) {
                instance.setState({
                    students:response.data.data.data,
                    current_page:response.data.data.current_page,
                    last_page:response.data.data.last_page,
                });
            }

            instance.setState({is_loading:false});
        })
        .catch(function (error) {
            console.log(error);
            instance.setState({is_loading:true});
        }); 
    }

    delete(){
        var instance = this;
        axios.get(base_url + 'student/delete/' + this.state.delete_id)
          .then(function (response) {
            console.log(response);
            instance.get_data();
            instance.setState({modal:false});
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    paginate(){
        var last_page = this.state.last_page;
        var html = '';
        if (this.state.current_page != '' && last_page != '') {
            var cont = [];
            for(let i = 1;i <= last_page;i++){
               cont.push(i);
            }   
            return cont.map((number)=>{
                 return (<Button color={(this.state.active_page==number?'success':'primary')} onClick={()=>{this.get_data(number);this.setState({active_page:number})}}>
                                { number }
                            </Button> ) 
            })         
        }
    }

    render(){
        return ( 
            <div>
                <PanelHeader
                    content={
                        <div className="header text-center">
                            <h2 className="title">Student</h2>
                            <p className="category">Ini adalah data murid-murid</p>
                        </div> 
                    }
                />
                <div className="content"> 
                    <Row>
                        <Col md={12} xs={12}> 
                            <Card>
                                <CardBody>
                                    <NavLink to={'student-add'} >
                                        <Button color="primary">
                                            <i className="now-ui-icons ui-1_simple-add"></i> Submit data student
                                        </Button> 
                                    </NavLink>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>No</th>
                                                <th>Name</th>
                                                <th>Class</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            (this.state.is_loading==true?
                                                <tr>
                                                    <td colspan="4" style={{textAlign:'center'}}>
                                                        <p style={{fontSize:'15px'}}><i style={{fontSize:'13px'}} className="now-ui-icons loader_refresh fa-spin"></i> Loading ....</p>
                                                    </td>
                                                </tr>:<span></span>
                                            )
                                        }
                                        
                                            {
                                                this.state.students.map((prop,key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td> {key+1} </td>
                                                            <td> {prop.name}</td>
                                                            <td> {prop.class}</td>
                                                            <td>
                                                                <NavLink to={'student-edit/'+prop.id}  >
                                                                    <Button color="info"  size="sm" style={{marginRight:'10px'}}>
                                                                        Edit
                                                                    </Button>
                                                                </NavLink>
                                                                
                                                                <Button color="danger" onClick={()=>{this.toggle_modal();console.log(prop.id);this.setState({delete_id:prop.id});}} size="sm" >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>  
                                    { this.paginate() }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal isOpen={this.state.modal} fade={false}  toggle={this.toggle_modal} className={this.props.className}>
                  <ModalHeader toggle={this.toggle_modal}>Confirmation delete</ModalHeader>
                  <ModalBody>
                    Are you sure to delete this data?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={()=>{this.toggle_modal;this.delete();}}>Yes</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_modal}>No</Button>
                  </ModalFooter>
                </Modal>
            </div> 
        );
    }
}

export default Student; 
