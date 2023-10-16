import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

export default function Profile() {
    return (
        <>
            <section>
                <div style={{ backgroundColor: '#eee' }}>
                    <MDBContainer className="container py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol md="12" xl="4">
                                <MDBCard style={{ borderRadius: '15px' }}>
                                    <MDBCardBody className="text-center">
                                        <div className="mt-3 mb-4">
                                                <MDBCardImage src="./src/assets/images/profile-icon-men.png"
                                                className="rounded-circle" fluid style={{ width: '100px' }} />
                                        </div>
                                        <MDBTypography tag="h4" id="fullname">Julie L. Arsenault</MDBTypography>
                                        <MDBCardText className="text-muted mb-4">
                                            <span id="username">@Programmer </span>
                                            <span className="mx-2">|</span>
                                            <span id="email">mdbootstrap.com</span>
                                        </MDBCardText>
                                        <MDBBtn rounded size="lg">Message now</MDBBtn>
                                        <hr />
                                        <div className="d-flex justify-content-center text-center mt-1 mb-2">
                                            <h5>Orders</h5>
                                            <div>
                                                
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </section>
        </>
    )
}