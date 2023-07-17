import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import config from "../config/config";
import { toast } from "react-toastify";

const CreateShipment = () => {
  const [senderName, setSenderName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [shipmentDescription, setShipmentDescription] = useState('');

  const createShipment = () => {
    (async () => {
      try {
        await axios.post(
          `${config.api.url}/shipment`,
          {
            senderName,
            senderAddress,
            recipientName,
            recipientAddress,
            shipmentDescription,
          },
          { withCredentials: true },
        );

        setSenderName('');
        setSenderAddress('');
        setRecipientName('');
        setRecipientAddress('');
        setShipmentDescription('');

        toast.success('Shipement created successfully');
      } catch (err: any) {
        console.log(err?.response?.data);

        const errorData = err?.response?.data?.data;

        if (errorData) {
          for (const dataPoint of errorData) {
            toast.error(dataPoint.message);
          }
        } else {
          const message = err?.response?.data?.message || 'An unknown error occurred';
          toast.error(message);
        }
      }
    })();
  }

  return (
    <div>
      <Typography variant='h4' mb={3}>Create Shipment</Typography>

      <Grid container minWidth={'1000px'} gap={2}>
        <Grid item sm={5}>
          <TextField
            fullWidth
            id="senderName"
            label="Sender Name"
            variant="outlined"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </Grid>
        <Grid item sm={5}>
          <TextField
            fullWidth
            id="senderAddress"
            label="Sender Address"
            variant="outlined"
            required
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container minWidth={'1000px'} gap={2} mt={1}>
        <Grid item sm={5}>
          <TextField
            fullWidth
            id="recipientName"
            label="Recipient Name"
            variant="outlined"
            required
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </Grid>
        <Grid item sm={5}>
          <TextField
            fullWidth
            id="recipientAddress"
            label="Recipient Address"
            variant="outlined"
            required
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container minWidth={'1000px'} mt={1}>
        <Grid item sm={5}>
          <TextField
            fullWidth
            id="shipmentDescription"
            label="Shipment Description"
            variant="outlined"
            required
            value={shipmentDescription}
            onChange={(e) => setShipmentDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        variant='contained'
        sx={{ mt: 1 }}
        onClick={createShipment}
      >
        Create Shipment
      </Button>
    </div>
  );
}

export default CreateShipment;
