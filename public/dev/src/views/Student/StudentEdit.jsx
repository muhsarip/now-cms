import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
    Alert, Card, CardTitle, CardBody, CardHeader, Row, Col, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
// react plugin for creating notifications over the dashboard


import { PanelHeader, Button } from 'components';

const base_url  = "http://localhost/now-cms3/public/";

class StudentEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            class:'',
            textButton:'Update',
            disableButton:false,
            err_message:[],
            success:false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }

    componentWillMount(){
        console.log(this.props);
        var instance = this;
        axios.get(base_url + 'api/student/' + this.props.match.params.id)
        .then(function (response) {
            console.log(response);
            if (response.data.success == true) {
                var dt = response.data.data;
                instance.setState({
                    id:dt.id,
                    name:dt.name,
                    class:dt.class,
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    showLoading(stat){
        if (stat == true) {
            this.setState({
                textButton:'Processing request',
                disableButton:true
            });
        }else{
            this.setState({
                textButton:'Update',
                disableButton:false
            });
        }
    }

    submitForm(e){
        e.preventDefault();

        var instance= this;

        instance.showLoading(true);

        instance.setState({
            err_message : [],
            success:false,
        });

        axios.post(base_url + 'api/student/update', {
            id:this.state.id,
            name: this.state.name,
            class: this.state.class
        })
        .then(function (response) {
            instance.showLoading(false);
            if (response.data.success === true) {
                instance.setState({
                    success:true,
                });
            }else{
                alert("tesss")
                instance.setState({
                    err_message : [response.data.message],
                    success:false
                });
            }
        })
        .catch(function (error) {
            instance.showLoading(false);
            console.log(error.response);

            var err_data = error.response.data;
            var msg = [];
          
            var errs = Object.keys(err_data).map(function(key) {
                msg.push( err_data[key][0] );
            });
            instance.setState({
                err_message : msg
            });
        });
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
                                <CardHeader>
                                    <CardTitle>New Data Student </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    
                                    <Form onSubmit={(e)=> this.submitForm(e)}>
                                        <FormGroup>
                                          <Label for="name">Full Name</Label>
                                          <Input 
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                            type="text" name="name" id="name" placeholder="student name" />
                                        </FormGroup>
                                        <FormGroup>
                                          <Label for="name">Class</Label>
                                          <Input 
                                            value={this.state.class}
                                            onChange={this.handleInputChange}
                                            type="text" name="class" id="class" placeholder="student class" />
                                        </FormGroup>
                                        {
                                            (this.state.err_message!=''?
                                                <Alert color="danger"  isOpen={this.state.visible} toggle={this.onDismiss}>
                                                    <span><b> Caution  </b> {this.state.err_message.map((msg)=><p>{msg}</p>)}</span>
                                                </Alert>
                                                :<span></span>)
                                        }  
                                        {
                                            (this.state.success==true?
                                                <Alert color="success"  isOpen={this.state.visible} toggle={this.onDismiss}>
                                                    <span>Success to update student data</span>
                                                </Alert>
                                                :<span></span>)
                                        }
                                        <NavLink to={'/student'} >
                                                    <Button color="info"   ><i className="now-ui-icons arrows-1_minimal-left"></i> Back to list</Button>
                                                </NavLink>
                                        <Button color="primary"  disabled={this.state.disableButton} >{ this.state.textButton }</Button>
                                      
                                      </Form>
                                
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div> 
        );
    }
}

export default StudentEdit;  
