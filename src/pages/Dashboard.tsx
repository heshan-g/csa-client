import { Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        axios.defaults.withCredentials = true;

        const response = await axios.get(
          `${config.api.url}/shipment`,
          { withCredentials: true }
        );

        setShipments(response?.data?.shipments.map((shipment: any) => {
          return { ...shipment, id: shipment._id };
        }));
      } catch (err) {
        console.log('ERROR', err);
      }
    })();
  }, []);

  return (
    <div>
      <Typography variant='h4'>Dashbaord</Typography>
      <DataTable data={shipments} />
    </div>
  );
}

export default Dashboard;

