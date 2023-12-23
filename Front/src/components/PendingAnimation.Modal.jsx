import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Lottie from "lottie-react";

import { Form, Col, Row } from "react-bootstrap";
import pendingAnimationData from "./pending.json";

export default function PendingAnimationModal({ handleClose, show }) {
  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <Form>
          <DialogTitle>En Cours d'ajoute ... </DialogTitle>
          <DialogContent>
            <Row>
              <Col md={12}>
                <Lottie
                  animationData={pendingAnimationData}
                  style={{
                    resizeMode: "contain",
                    alignSelf: "center",
                    margin: "auto",
                    height: 250,
                    width: 250,
                  }}
                />
              </Col>
            </Row>
          </DialogContent>
        </Form>
      </Dialog>
    </div>
  );
}
