import React from 'react';
import {
    Alert, Card, CardTitle, CardBody, CardHeader, Row, Col, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
// react plugin for creating notifications over the dashboard


import { PanelHeader, Button } from 'components';

class StudentAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
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
                                    <CardTitle>New Data Student {this.state.name}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={(e)=> { e.preventDefault(); alert("yes");}}>
                                        <FormGroup>
                                          <Label for="name">Full Name</Label>
                                          <Input 
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                            type="text" name="name" id="name" placeholder="student name" />
                                        </FormGroup>
                                        
                                        <Button>Submit</Button>
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

export default StudentAdd;  
