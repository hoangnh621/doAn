import Logo from './Logo'
import '../scss/Home.scss'
import Taskbar from './Taskbar'
import {Row, Col} from 'reactstrap'

function Home() {
    return (
            <Row className = "wrapper m-0">
                <Col className = "main-menu col-lg-2">
                    <Logo/>
                </Col>
                <Taskbar/>
                <Col className = "content col-lg-10 p-0">

                </Col>
            </Row>
    )
}

export default Home;
