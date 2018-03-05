import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Alert, Card, CardTitle, CardBody, CardHeader, Row, Col
} from 'reactstrap';
// react plugin for creating notifications over the dashboard
import NotificationAlert from 'react-notification-alert';

import { PanelHeader, Button } from 'components';

class Student extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
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
                                            <Button color="primary"  >
                                                <i className={"now-ui-icons ui-1_simple-add" }></i> Submit data student
                                            </Button> 
                                        </NavLink>
                                        
                                    
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div> 
        );
    }
}

export default Student; 
