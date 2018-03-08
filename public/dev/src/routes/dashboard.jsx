import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Notifications from 'views/Notifications/Notifications.jsx';
import Icons from 'views/Icons/Icons.jsx';
import Typography from 'views/Typography/Typography.jsx';
import TableList from 'views/TableList/TableList.jsx';
import Maps from 'views/Maps/Maps.jsx';
import Upgrade from 'views/Upgrade/Upgrade.jsx';
import UserPage from 'views/UserPage/UserPage.jsx';

// student
import Student from 'views/Student/Student.jsx'; 
import StudentAdd from 'views/Student/StudentAdd.jsx'; 
import StudentEdit from 'views/Student/StudentEdit.jsx'; 

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "design_app", component: Dashboard },
    { path: "/icons", name: "Icons", icon: "design_image", component: Icons, display:false },
    { path: "/maps", name: "Maps", icon: "location_map-big", component: Maps , display:false},
    { path: "/notifications", name: "Notifications", icon: "ui-1_bell-53", component: Notifications , display:false},
    { path: "/user-page", name: "User Profile", icon: "users_single-02", component: UserPage , display:false},
    { path: "/extended-tables", name: "Table List", icon: "files_paper", component: TableList , display:false},
    { path: "/typography", name: "Typography", icon: "design-2_ruler-pencil", component: Typography , display:false},

    { path: "/student", name: "Student", icon: "design-2_ruler-pencil", component: Student },
    { path: "/student-add", name: "StudentAdd", icon: "design-2_ruler-pencil", component: StudentAdd , display:false},
    { path: "/student-edit/:id", name: "StudentEdit", icon: "design-2_ruler-pencil", component: StudentEdit , display:false},

    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes; 
