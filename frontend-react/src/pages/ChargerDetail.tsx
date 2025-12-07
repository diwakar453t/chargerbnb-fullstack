import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { LocationOn, Bolt, Star } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ChargerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [charger, setCharger] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  const fetchCharger = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/chargers/${id}`);
      setCharger(response.data.charger || response.data);
    } catch (error) {
      toast.error('Failed to load charger details');
      navigate('/chargers');
    } finally {
      setLoading(false);
    }
  }, [id, API_URL, navigate]);

  useEffect(() => {
    fetchCharger();
  }, [fetchCharger]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!startTime || !endTime) {
      toast.error('Please select start and end time');
      return;
    }



    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      toast.error('End time must be after start time');
      return;
    }

    if (start < new Date()) {
      toast.error('Cannot book in the past');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/bookings`,
        {
          chargerId: id,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Booking created successfully! Host will review your request.');
      setStartTime('');
      setEndTime('');
      navigate('/my-bookings');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Booking failed');
    }
  };

  if (loading || !charger) {
    return <Container sx={{ py: 8 }}>Loading...</Container>;
  }

  const mapCenter = {
    lat: parseFloat(charger.latitude),
    lng: parseFloat(charger.longitude),
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          {charger.imageUrl && (
            <CardMedia
              component="img"
              height="400"
              image={charger.imageUrl}
              alt={charger.title}
              sx={{ borderRadius: 3, mb: 3 }}
            />
          )}

          <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {charger.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography>
                {charger.address}, {charger.city}, {charger.state} - {charger.pincode}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {charger.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip icon={<Bolt />} label={`${charger.powerRating} kW`} color="primary" />
              <Chip label={charger.plugType} />
              {charger.averageRating && (
                <Chip icon={<Star />} label={`${charger.averageRating.toFixed(1)} rating`} />
              )}
            </Box>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Location
            </Typography>
            {GOOGLE_MAPS_API_KEY ? (
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '8px' }}
                  center={mapCenter}
                  zoom={15}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </LoadScript>
            ) : (
              <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.100', borderRadius: 2 }}>
                <Typography color="text.secondary">
                  Google Maps API key not configured
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              ₹{charger.pricePerHour}/hour
            </Typography>

            {user && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Book This Charger
                </Typography>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="End Time"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleBooking}
                  disabled={!startTime || !endTime}
                  sx={{ py: 1.5 }}
                >
                  Book Now
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChargerDetail;

