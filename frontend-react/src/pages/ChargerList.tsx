import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { LocationOn, Bolt, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useGeolocation } from '../hooks/useGeolocation';

interface Charger {
  id: number;
  title: string;
  description?: string;
  powerRating: number;
  plugType: string;
  pricePerHour: number;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  averageRating?: number;
}

const ChargerList: React.FC = () => {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { latitude, longitude } = useGeolocation();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchChargers();
  }, [latitude, longitude]);

  const fetchChargers = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/chargers/public`;

      if (latitude && longitude) {
        url += `?latitude=${latitude}&longitude=${longitude}&radiusKm=10`;
      }

      const response = await axios.get(url);
      setChargers(response.data);
    } catch (error) {
      console.error('Error fetching chargers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChargers = chargers.filter(
    (charger) =>
      charger.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charger.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
        Available Charging Stations
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search by name or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      {filteredChargers.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="text.secondary">
          No charging stations found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredChargers.map((charger, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={charger.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(255,107,53,0.3)',
                    },
                  }}
                  onClick={() => navigate(`/chargers/${charger.id}`)}
                >
                  {charger.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={charger.imageUrl}
                      alt={charger.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {charger.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                      <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        {charger.city}, {charger.state}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {charger.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip
                        icon={<Bolt />}
                        label={`${charger.powerRating} kW`}
                        size="small"
                        color="primary"
                      />
                      <Chip label={charger.plugType} size="small" />
                      {charger.averageRating && (
                        <Chip
                          icon={<Star />}
                          label={charger.averageRating.toFixed(1)}
                          size="small"
                        />
                      )}
                    </Box>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      ₹{charger.pricePerHour}/hour
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" fullWidth>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ChargerList;

