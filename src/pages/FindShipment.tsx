import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import config from "../config/config";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { toast } from "react-toastify";

const FindShipment = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [shipment, setShipment] = useState<any>({});

  const findShipment = () => {
    (async () => {
      try {
        const response = await axios.get(
          `${config.api.url}/shipment/${shipmentId}`,
          { withCredentials: true },
        );

        setShipment(response?.data?.shipment);
      } catch (err) {
        console.log(err);
        toast.error('Invalid Shipment ID');
      }
    })();
  }

  return (
    <div>
      <Typography variant='h4' mb={3}>Find Shipment</Typography>

      <Grid container minWidth={'1000px'} gap={2}>
        <Grid item sm={5}>
          <TextField
            fullWidth
            id="shipmentId"
            label="Shipment ID"
            variant="outlined"
            required
            size="small"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
          />
        </Grid>
        <Grid item sm={5}>
          <Button variant="contained" onClick={() => findShipment()}>Find Shipment</Button>
        </Grid>
      </Grid>

      {shipment && Object.keys(shipment).length > 0 && (
        <Card sx={{ width: 500, mt: 5 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Status
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {shipment.status}
            </Typography>

            <Typography variant="h6" component="div">
              Sender name
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {shipment.senderName}
            </Typography>

            <Typography variant="h6" component="div">
              Sender address
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {shipment.senderAddress}
            </Typography>

            <Typography variant="h6" component="div">
              Recipient name
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {shipment.recipientName}
            </Typography>

            <Typography variant="h6" component="div">
              Recipient address
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {shipment.recipientAddress}
            </Typography>

            <Typography variant="h6" component="div">
              Shipment description
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {shipment.shipmentDescription}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default FindShipment;
